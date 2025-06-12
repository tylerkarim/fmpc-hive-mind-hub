
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pen, Upload, FileText, Trash2, Edit, Eye, Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface Document {
  id: number;
  title: string;
  subject: string;
  type: 'pdf' | 'image' | 'text';
  uploadDate: string;
  size: string;
}

const Documents = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [newDoc, setNewDoc] = useState({
    title: '',
    subject: '',
    type: 'pdf' as const
  });

  const subjects = ['Anatomy', 'Physiology', 'Pharmacology', 'Pathology', 'Biochemistry', 'Microbiology', 'Other'];

  const addDocument = () => {
    if (newDoc.title.trim() && newDoc.subject) {
      const doc: Document = {
        id: Date.now(),
        ...newDoc,
        uploadDate: new Date().toLocaleDateString(),
        size: '2.5 MB' // Mock size
      };
      setDocuments([...documents, doc]);
      setNewDoc({ title: '', subject: '', type: 'pdf' });
    }
  };

  const deleteDocument = (id: number) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  const getFileIcon = (type: string) => {
    return <FileText className="h-6 w-6" />;
  };

  const filterDocumentsBySubject = (subject: string) => {
    return documents.filter(doc => doc.subject === subject);
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
              <Link to="/pomodoro" className="text-muted-foreground hover:text-foreground transition-colors">
                Pomodoro
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
            <h1 className="text-3xl font-bold mb-2">Document Library</h1>
            <p className="text-muted-foreground">Upload, organize and annotate your study materials</p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload New Document</DialogTitle>
                <DialogDescription>Add a document to your library</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="doc-title">Document Title</Label>
                  <Input 
                    id="doc-title"
                    value={newDoc.title}
                    onChange={(e) => setNewDoc({...newDoc, title: e.target.value})}
                    placeholder="Enter document title"
                  />
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Select value={newDoc.subject} onValueChange={(value) => setNewDoc({...newDoc, subject: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="file-upload">File</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-400">PDF, Images, or Text files</p>
                    <Input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png,.txt" />
                  </div>
                </div>
                <Button onClick={addDocument} className="w-full">Upload Document</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="all">All</TabsTrigger>
            {subjects.map((subject) => (
              <TabsTrigger key={subject} value={subject}>{subject}</TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documents.length === 0 ? (
                <Card className="col-span-full">
                  <CardContent className="text-center py-12">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-medium mb-2">No documents yet</h3>
                    <p className="text-muted-foreground mb-4">Upload your first study material to get started</p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Document
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        {/* Same dialog content as above */}
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ) : (
                documents.map((doc) => (
                  <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {getFileIcon(doc.type)}
                          <div>
                            <CardTitle className="text-sm">{doc.title}</CardTitle>
                            <CardDescription>{doc.subject}</CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <span>{doc.uploadDate}</span>
                        <span>{doc.size}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => deleteDocument(doc.id)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {subjects.map((subject) => (
            <TabsContent key={subject} value={subject}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterDocumentsBySubject(subject).length === 0 ? (
                  <Card className="col-span-full">
                    <CardContent className="text-center py-8">
                      <p className="text-muted-foreground">No {subject} documents yet. Upload your first document!</p>
                    </CardContent>
                  </Card>
                ) : (
                  filterDocumentsBySubject(subject).map((doc) => (
                    <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                      {/* Same card content as above */}
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Documents;
