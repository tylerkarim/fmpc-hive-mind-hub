
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Pen, CheckSquare, Clock, FileText, MessageCircle, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Empty state - user starts fresh
  const todayTasks = 0;
  const completedTasks = 0;
  const pomodoroToday = 0;
  const documentsCount = 0;
  const weeklyProgress = 0;

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
              <Link to="/tasks" className="text-muted-foreground hover:text-foreground transition-colors">
                Tasks
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
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome to Aji Nqraw!</h1>
          <p className="text-muted-foreground">Start organizing your academic life - create your first task or begin a study session</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Tasks</CardTitle>
              <CheckSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayTasks}</div>
              <p className="text-xs text-muted-foreground">
                {completedTasks} completed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pomodoro Sessions</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pomodoroToday}</div>
              <p className="text-xs text-muted-foreground">Today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Documents</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{documentsCount}</div>
              <p className="text-xs text-muted-foreground">In library</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Weekly Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{weeklyProgress}%</div>
              <Progress value={weeklyProgress} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Getting Started */}
          <Card>
            <CardHeader>
              <CardTitle>Get Started</CardTitle>
              <CardDescription>Begin your academic journey with Aji Nqraw</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">Welcome! You haven't created any tasks yet. Start by creating your first task to organize your studies.</p>
                <Button asChild className="w-full">
                  <Link to="/tasks">Create Your First Task</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Jump into your study tools</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button asChild variant="outline" className="h-20 flex-col">
                  <Link to="/tasks">
                    <CheckSquare className="h-6 w-6 mb-2" />
                    Manage Tasks
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-20 flex-col">
                  <Link to="/pomodoro">
                    <Clock className="h-6 w-6 mb-2" />
                    Start Pomodoro
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-20 flex-col">
                  <Link to="/documents">
                    <FileText className="h-6 w-6 mb-2" />
                    Upload Documents
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-20 flex-col">
                  <Link to="/assistant">
                    <MessageCircle className="h-6 w-6 mb-2" />
                    Ask AI
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
