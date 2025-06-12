import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pen, CheckSquare, Clock, FileText, MessageCircle, Target, Calendar, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Pen className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-foreground">Aji Nqraw</span>
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <Link to="/tasks" className="text-muted-foreground hover:text-foreground transition-colors">
              Tasks
            </Link>
            <Link to="/pomodoro" className="text-muted-foreground hover:text-foreground transition-colors">
              Pomodoro
            </Link>
            <Link to="/documents" className="text-muted-foreground hover:text-foreground transition-colors">
              Documents
            </Link>
            <Button asChild>
              <Link to="/dashboard">Get Started</Link>
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-700">
            For FMPC Students
          </Badge>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Master Your Academic Journey
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Transform your study habits with our comprehensive suite of academic tools. 
            From task management to focused study sessions, we've got everything you need to excel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link to="/auth">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8" asChild>
              <Link to="/auth">Sign In</Link>
            </Button>
          </div>
        </div>

        {/* Hero Image Placeholder */}
        <div className="mt-16 relative">
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl p-8 text-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white/10 border-white/20 text-white">
                <CardHeader>
                  <CheckSquare className="h-8 w-8 mb-2" />
                  <CardTitle className="text-white">Task Manager</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80">Organize your daily, weekly, and monthly goals</p>
                </CardContent>
              </Card>
              <Card className="bg-white/10 border-white/20 text-white">
                <CardHeader>
                  <Clock className="h-8 w-8 mb-2" />
                  <CardTitle className="text-white">Pomodoro Timer</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80">Customizable focus sessions for better productivity</p>
                </CardContent>
              </Card>
              <Card className="bg-white/10 border-white/20 text-white">
                <CardHeader>
                  <FileText className="h-8 w-8 mb-2" />
                  <CardTitle className="text-white">Document Hub</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80">Annotate and manage your study materials</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How our platform makes your workflow easier</h2>
          <p className="text-muted-foreground">Everything you need to succeed in medical school, all in one place</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Goal Setting</h3>
            <p className="text-sm text-muted-foreground">Set and track your academic goals with priority levels</p>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Smart Scheduling</h3>
            <p className="text-sm text-muted-foreground">Organize tasks by daily, weekly, or monthly schedules</p>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Priority Management</h3>
            <p className="text-sm text-muted-foreground">Focus on what matters most with priority-based task sorting</p>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">AI Assistant</h3>
            <p className="text-sm text-muted-foreground">Get instant answers to your medical and pharmacy questions</p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to transform your academic management?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of FMPC students who are already using Aji Nqraw to excel in their studies
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/dashboard">Start Your Journey</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-2">
            <Pen className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-semibold">Aji Nqraw</span>
          </div>
          <p className="text-center text-muted-foreground mt-4">
            © 2024 Aji Nqraw. Built for FMPC students with ❤️
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
