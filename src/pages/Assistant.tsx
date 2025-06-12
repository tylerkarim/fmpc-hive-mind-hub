
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Pen, Send, MessageCircle, Bot, User } from "lucide-react";
import { Link } from "react-router-dom";

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: string;
}

const Assistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! I'm your AI assistant for FMPC studies. I can help you with medical and pharmacy questions, study tips, and academic guidance. What would you like to know?",
      sender: 'assistant',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const sendMessage = () => {
    if (inputMessage.trim()) {
      const userMessage: Message = {
        id: Date.now(),
        content: inputMessage,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString()
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      // Simulate AI response (you would connect to OpenAI API here)
      setTimeout(() => {
        const aiResponse: Message = {
          id: Date.now() + 1,
          content: "I understand your question about " + inputMessage + ". While I'm currently in demo mode, I would normally provide detailed medical/pharmacy information here. To fully activate me, you'll need to connect your OpenAI API.",
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString()
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
      
      setInputMessage('');
    }
  };

  const quickQuestions = [
    "Explain the mechanism of action of ACE inhibitors",
    "What are the phases of clinical trials?",
    "Help me study pharmacokinetics",
    "Cardiovascular system anatomy overview"
  ];

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
              <Link to="/pomodoro" className="text-muted-foreground hover:text-foreground transition-colors">
                Pomodoro
              </Link>
              <Link to="/documents" className="text-muted-foreground hover:text-foreground transition-colors">
                Documents
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">AI Assistant</h1>
          <p className="text-muted-foreground">Get instant answers to your medical and pharmacy questions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Bot className="h-5 w-5 text-blue-600" />
                  <CardTitle>Medical & Pharmacy Assistant</CardTitle>
                  <Badge variant="secondary">AI Powered</Badge>
                </div>
                <CardDescription>Ask me anything about your FMPC studies</CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col">
                <ScrollArea className="flex-1 pr-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === 'user' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          <div className="flex items-center space-x-2 mb-1">
                            {message.sender === 'user' ? 
                              <User className="h-4 w-4" /> : 
                              <Bot className="h-4 w-4" />
                            }
                            <span className="text-xs opacity-70">{message.timestamp}</span>
                          </div>
                          <p className="text-sm">{message.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                
                <div className="flex space-x-2 mt-4">
                  <Input
                    placeholder="Ask your medical or pharmacy question..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={sendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Questions Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Questions</CardTitle>
                <CardDescription>Common study topics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-left h-auto p-3 text-sm"
                    onClick={() => setInputMessage(question)}
                  >
                    <MessageCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                    {question}
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Study Subjects</CardTitle>
                <CardDescription>Areas I can help with</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['Anatomy', 'Physiology', 'Pharmacology', 'Pathology', 'Biochemistry', 'Microbiology'].map((subject) => (
                    <Badge key={subject} variant="secondary">{subject}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">AI Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">Demo Mode</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Connect OpenAI API for full functionality
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assistant;
