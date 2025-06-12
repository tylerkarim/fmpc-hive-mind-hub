
import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface PomodoroState {
  workTime: number;
  breakTime: number;
  longBreakTime: number;
  currentTime: number;
  isRunning: boolean;
  currentSession: 'work' | 'break' | 'longBreak';
  completedPomodoros: number;
  totalSessions: number;
}

interface PomodoroContextType extends PomodoroState {
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  updateSettings: (settings: { workTime: number; breakTime: number; longBreakTime: number }) => void;
}

const PomodoroContext = createContext<PomodoroContextType | undefined>(undefined);

export const usePomodoro = () => {
  const context = useContext(PomodoroContext);
  if (context === undefined) {
    throw new Error('usePomodoro must be used within a PomodoroProvider');
  }
  return context;
};

export const PomodoroProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [state, setState] = useState<PomodoroState>({
    workTime: 25,
    breakTime: 5,
    longBreakTime: 15,
    currentTime: 25 * 60,
    isRunning: false,
    currentSession: 'work',
    completedPomodoros: 0,
    totalSessions: 0,
  });

  // Load user's pomodoro data
  useEffect(() => {
    if (user) {
      loadPomodoroData();
    }
  }, [user]);

  // Save state to database when it changes
  useEffect(() => {
    if (user && state.completedPomodoros > 0) {
      savePomodoroData();
    }
  }, [state.completedPomodoros, state.totalSessions, user]);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (state.isRunning && state.currentTime > 0) {
      interval = setInterval(() => {
        setState(prev => ({ ...prev, currentTime: prev.currentTime - 1 }));
      }, 1000);
    } else if (state.currentTime === 0 && state.isRunning) {
      // Session completed
      handleSessionComplete();
    }

    return () => clearInterval(interval);
  }, [state.isRunning, state.currentTime]);

  const loadPomodoroData = async () => {
    if (!user) return;

    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('pomodoro_sessions')
      .select('*')
      .eq('user_id', user.id)
      .eq('session_date', today)
      .maybeSingle();

    if (!error && data) {
      setState(prev => ({
        ...prev,
        workTime: data.work_time,
        breakTime: data.break_time,
        longBreakTime: data.long_break_time,
        completedPomodoros: data.completed_pomodoros,
        totalSessions: data.total_sessions,
        currentTime: prev.currentSession === 'work' ? data.work_time * 60 : 
                    prev.currentSession === 'break' ? data.break_time * 60 : 
                    data.long_break_time * 60
      }));
    }
  };

  const savePomodoroData = async () => {
    if (!user) return;

    const today = new Date().toISOString().split('T')[0];
    await supabase
      .from('pomodoro_sessions')
      .upsert({
        user_id: user.id,
        session_date: today,
        work_time: state.workTime,
        break_time: state.breakTime,
        long_break_time: state.longBreakTime,
        completed_pomodoros: state.completedPomodoros,
        total_sessions: state.totalSessions,
        current_session: state.currentSession
      });
  };

  const handleSessionComplete = () => {
    setState(prev => {
      let newState = { ...prev, isRunning: false };
      
      if (prev.currentSession === 'work') {
        newState.completedPomodoros = prev.completedPomodoros + 1;
        newState.totalSessions = prev.totalSessions + 1;
        
        // Determine next session type
        if ((prev.completedPomodoros + 1) % 4 === 0) {
          newState.currentSession = 'longBreak';
          newState.currentTime = prev.longBreakTime * 60;
        } else {
          newState.currentSession = 'break';
          newState.currentTime = prev.breakTime * 60;
        }
      } else {
        newState.currentSession = 'work';
        newState.currentTime = prev.workTime * 60;
      }
      
      return newState;
    });
  };

  const startTimer = () => setState(prev => ({ ...prev, isRunning: true }));
  const pauseTimer = () => setState(prev => ({ ...prev, isRunning: false }));
  
  const resetTimer = () => {
    setState(prev => ({
      ...prev,
      isRunning: false,
      currentSession: 'work',
      currentTime: prev.workTime * 60
    }));
  };

  const updateSettings = (settings: { workTime: number; breakTime: number; longBreakTime: number }) => {
    setState(prev => ({
      ...prev,
      ...settings,
      currentTime: settings.workTime * 60
    }));
  };

  const value = {
    ...state,
    startTimer,
    pauseTimer,
    resetTimer,
    updateSettings
  };

  return <PomodoroContext.Provider value={value}>{children}</PomodoroContext.Provider>;
};
