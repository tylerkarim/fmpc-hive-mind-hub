
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Pen, Play, Pause, RotateCcw, Settings, Clock, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { usePomodoro } from "@/contexts/PomodoroContext";

const Pomodoro = () => {
  const { signOut } = useAuth();
  const {
    workTime,
    breakTime,
    longBreakTime,
    currentTime,
    isRunning,
    currentSession,
    completedPomodoros,
    totalSessions,
    startTimer,
    pauseTimer,
    resetTimer,
    updateSettings
  } = usePomodoro();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getSessionDuration = () => {
    switch (currentSession) {
      case 'work': return workTime * 60;
      case 'break': return breakTime * 60;
      case 'longBreak': return longBreakTime * 60;
      default: return workTime * 60;
    }
  };

  const getProgress = () => {
    const totalDuration = getSessionDuration();
    return ((totalDuration - currentTime) / totalDuration) * 100;
  };

  const getSessionColor = () => {
    switch (currentSession) {
      case 'work': return 'text-blue-600';
      case 'break': return 'text-green-600';
      case 'longBreak': return 'text-purple-600';
      default: return 'text-blue-600';
    }
  };

  const getSessionTitle = () => {
    switch (currentSession) {
      case 'work': return 'Focus Time';
      case 'break': return 'Short Break';
      case 'longBreak': return 'Long Break';
      default: return 'Focus Time';
    }
  };

  const handleSettingsUpdate = (field: string, value: number) => {
    const newSettings = {
      workTime: field === 'workTime' ? value : workTime,
      breakTime: field === 'breakTime' ? value : breakTime,
      longBreakTime: field === 'longBreakTime' ? value : longBreakTime
    };
    updateSettings(newSettings);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Pen className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-foreground">Aji Nqraw</span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
              <Link to="/tasks" className="text-muted-foreground hover:text-foreground transition-colors">
                Tasks
              </Link>
              <Link to="/documents" className="text-muted-foreground hover:text-foreground transition-colors">
                Documents
              </Link>
              <Link to="/assistant" className="text-muted-foreground hover:text-foreground transition-colors">
                AI Assistant
              </Link>
              <Button variant="outline" size="sm" onClick={signOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Pomodoro Timer</h1>
            <p className="text-muted-foreground">Stay focused and productive with the Pomodoro Technique</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Timer Section */}
            <div className="lg:col-span-2">
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className={`text-2xl ${getSessionColor()}`}>
                    {getSessionTitle()}
                  </CardTitle>
                  <CardDescription>
                    {currentSession === 'work' ? 'Time to focus on your studies' : 'Time for a well-deserved break'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Timer Display */}
                  <div className="text-8xl font-bold text-center">
                    {formatTime(currentTime)}
                  </div>
                  
                  {/* Progress Bar */}
                  <Progress value={getProgress()} className="h-4" />
                  
                  {/* Control Buttons */}
                  <div className="flex justify-center space-x-4">
                    {!isRunning ? (
                      <Button size="lg" onClick={startTimer}>
                        <Play className="h-5 w-5 mr-2" />
                        Start
                      </Button>
                    ) : (
                      <Button size="lg" variant="secondary" onClick={pauseTimer}>
                        <Pause className="h-5 w-5 mr-2" />
                        Pause
                      </Button>
                    )}
                    <Button size="lg" variant="outline" onClick={resetTimer}>
                      <RotateCcw className="h-5 w-5 mr-2" />
                      Reset
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Stats and Settings */}
            <div className="space-y-6">
              {/* Stats Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    Today's Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Completed Pomodoros</span>
                    <Badge variant="secondary">{completedPomodoros}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Total Sessions</span>
                    <Badge variant="secondary">{totalSessions}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Focus Time</span>
                    <Badge variant="secondary">{Math.floor((completedPomodoros * workTime) / 60)}h {(completedPomodoros * workTime) % 60}m</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Settings Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    Timer Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="workTime">Work Time (minutes)</Label>
                    <Input 
                      id="workTime"
                      type="number"
                      value={workTime}
                      onChange={(e) => handleSettingsUpdate('workTime', Number(e.target.value))}
                      disabled={isRunning}
                    />
                  </div>
                  <div>
                    <Label htmlFor="breakTime">Short Break (minutes)</Label>
                    <Input 
                      id="breakTime"
                      type="number"
                      value={breakTime}
                      onChange={(e) => handleSettingsUpdate('breakTime', Number(e.target.value))}
                      disabled={isRunning}
                    />
                  </div>
                  <div>
                    <Label htmlFor="longBreakTime">Long Break (minutes)</Label>
                    <Input 
                      id="longBreakTime"
                      type="number"
                      value={longBreakTime}
                      onChange={(e) => handleSettingsUpdate('longBreakTime', Number(e.target.value))}
                      disabled={isRunning}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Session Info */}
              <Card>
                <CardHeader>
                  <CardTitle>How it Works</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <ul className="space-y-2">
                    <li>• Work for {workTime} minutes</li>
                    <li>• Take a {breakTime}-minute break</li>
                    <li>• After 4 pomodoros, take a {longBreakTime}-minute long break</li>
                    <li>• Repeat the cycle</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;
