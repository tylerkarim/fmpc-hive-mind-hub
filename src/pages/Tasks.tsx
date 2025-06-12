
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Pen, Plus, Edit, Trash2, Calendar, Clock, CheckSquare } from "lucide-react";
import { Link } from "react-router-dom";

interface Task {
  id: number;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  category: 'daily' | 'weekly' | 'monthly';
  completed: boolean;
  dueDate: string;
  subtasks: Array<{ id: number; title: string; completed: boolean }>;
}

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    category: 'daily' as 'daily' | 'weekly' | 'monthly',
    dueDate: ''
  });

  const addTask = () => {
    if (newTask.title.trim()) {
      const task: Task = {
        id: Date.now(),
        ...newTask,
        completed: false,
        subtasks: []
      };
      setTasks([...tasks, task]);
      setNewTask({ title: '', description: '', priority: 'medium', category: 'daily', dueDate: '' });
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const filterTasksByCategory = (category: string) => {
    return tasks.filter(task => task.category === category);
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
              <Link to="/pomodoro" className="text-muted-foreground hover:text-foreground transition-colors">
                Pomodoro
              </Link>
              <Link to="/documents" className="text-muted-foreground hover:text-foreground transition-colors">
                Documents
              </Link>
              <Link to="/assistant" className="text-muted-foreground hover:text-foreground transition-colors">
                AI Assistant
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Task Manager</h1>
            <p className="text-muted-foreground">Organize and prioritize your academic goals</p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Task</DialogTitle>
                <DialogDescription>Add a new task to your schedule</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input 
                    id="title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    placeholder="Enter task title"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                    placeholder="Enter task description"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <Select value={newTask.priority} onValueChange={(value: 'low' | 'medium' | 'high') => setNewTask({...newTask, priority: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={newTask.category} onValueChange={(value: 'daily' | 'weekly' | 'monthly') => setNewTask({...newTask, category: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input 
                    id="dueDate"
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                  />
                </div>
                <Button onClick={addTask} className="w-full">Create Task</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="daily" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="daily">Daily Tasks</TabsTrigger>
            <TabsTrigger value="weekly">Weekly Tasks</TabsTrigger>
            <TabsTrigger value="monthly">Monthly Tasks</TabsTrigger>
          </TabsList>

          {['daily', 'weekly', 'monthly'].map((category) => (
            <TabsContent key={category} value={category}>
              <div className="space-y-4">
                {filterTasksByCategory(category).map((task) => (
                  <Card key={task.id} className={`${task.completed ? 'opacity-60' : ''}`}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <button 
                            onClick={() => toggleTask(task.id)}
                            className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                              task.completed ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
                            }`}
                          >
                            {task.completed && <CheckSquare className="h-3 w-3 text-white" />}
                          </button>
                          <div>
                            <CardTitle className={task.completed ? 'line-through' : ''}>{task.title}</CardTitle>
                            <CardDescription>{task.description}</CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`} />
                          <Badge variant="outline">
                            <Calendar className="h-3 w-3 mr-1" />
                            {task.dueDate}
                          </Badge>
                          <Button size="sm" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => deleteTask(task.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    {task.subtasks.length > 0 && (
                      <CardContent>
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">Subtasks:</h4>
                          {task.subtasks.map((subtask) => (
                            <div key={subtask.id} className="flex items-center space-x-2 text-sm">
                              <div className={`w-3 h-3 rounded border ${subtask.completed ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`} />
                              <span className={subtask.completed ? 'line-through text-muted-foreground' : ''}>{subtask.title}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
                {filterTasksByCategory(category).length === 0 && (
                  <Card>
                    <CardContent className="text-center py-8">
                      <p className="text-muted-foreground">No {category} tasks yet. Create your first task!</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Tasks;
