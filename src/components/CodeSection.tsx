
import React, { useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const CodeSection = () => {
  const { codeSnippets, isAdmin, addCodeSnippet, updateCodeSnippet, deleteCodeSnippet } = usePortfolio();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentSnippet, setCurrentSnippet] = useState<typeof codeSnippets[0] | null>(null);
  const [newSnippet, setNewSnippet] = useState({
    title: "",
    description: "",
    category: "ArcGIS Pro" as "ArcGIS Pro" | "QGIS",
    githubLink: "",
    driveLink: "",
  });

  const arcgisSnippets = codeSnippets.filter(snippet => snippet.category === "ArcGIS Pro");
  const qgisSnippets = codeSnippets.filter(snippet => snippet.category === "QGIS");

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCodeSnippet(newSnippet);
    setNewSnippet({
      title: "",
      description: "",
      category: "ArcGIS Pro",
      githubLink: "",
      driveLink: "",
    });
    setIsAddDialogOpen(false);
    toast.success("Code snippet added successfully");
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentSnippet) {
      updateCodeSnippet(currentSnippet);
      setIsEditDialogOpen(false);
      toast.success("Code snippet updated successfully");
    }
  };

  const handleDeleteSnippet = (id: string) => {
    if (window.confirm("Are you sure you want to delete this code snippet?")) {
      deleteCodeSnippet(id);
      toast.success("Code snippet deleted successfully");
    }
  };

  const openEditDialog = (snippet: typeof codeSnippets[0]) => {
    setCurrentSnippet(snippet);
    setIsEditDialogOpen(true);
  };

  return (
    <section id="code" className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="section-title">Python Code Snippets</h2>
          {isAdmin && (
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary-600 hover:bg-primary-700">Add New Code Snippet</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Add New Code Snippet</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddSubmit} className="space-y-4 mt-4">
                  <div className="grid w-full gap-1.5">
                    <Label htmlFor="title">Snippet Title</Label>
                    <Input 
                      id="title"
                      value={newSnippet.title}
                      onChange={(e) => setNewSnippet({...newSnippet, title: e.target.value})}
                      placeholder="Enter snippet title"
                      required
                    />
                  </div>
                  <div className="grid w-full gap-1.5">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description"
                      value={newSnippet.description}
                      onChange={(e) => setNewSnippet({...newSnippet, description: e.target.value})}
                      placeholder="What does this code do?"
                      required
                    />
                  </div>
                  <div className="grid w-full gap-1.5">
                    <Label htmlFor="category">Category</Label>
                    <Select 
                      value={newSnippet.category} 
                      onValueChange={(value: "ArcGIS Pro" | "QGIS") => setNewSnippet({...newSnippet, category: value})}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ArcGIS Pro">ArcGIS Pro</SelectItem>
                        <SelectItem value="QGIS">QGIS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid w-full gap-1.5">
                    <Label htmlFor="githubLink">GitHub Link</Label>
                    <Input 
                      id="githubLink"
                      value={newSnippet.githubLink}
                      onChange={(e) => setNewSnippet({...newSnippet, githubLink: e.target.value})}
                      placeholder="Link to GitHub repository"
                      required
                    />
                  </div>
                  <div className="grid w-full gap-1.5">
                    <Label htmlFor="driveLink">Google Drive Link</Label>
                    <Input 
                      id="driveLink"
                      value={newSnippet.driveLink}
                      onChange={(e) => setNewSnippet({...newSnippet, driveLink: e.target.value})}
                      placeholder="Link to additional files on Google Drive"
                    />
                  </div>
                  <Button type="submit" className="w-full">Add Snippet</Button>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>
        
        <Tabs defaultValue="arcgis" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto mb-8 grid-cols-2">
            <TabsTrigger value="arcgis">ArcGIS Pro</TabsTrigger>
            <TabsTrigger value="qgis">QGIS</TabsTrigger>
          </TabsList>
          
          <TabsContent value="arcgis">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {arcgisSnippets.map((snippet) => (
                <Card key={snippet.id} className="overflow-hidden">
                  <div className="bg-primary-100 p-4 flex items-center">
                    <div className="bg-primary-700 text-white p-2 rounded mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                      </svg>
                    </div>
                    <h3 className="font-semibold">{snippet.title}</h3>
                    {isAdmin && (
                      <div className="ml-auto flex gap-1">
                        <button 
                          onClick={() => openEditDialog(snippet)} 
                          className="text-primary-600 p-1 hover:bg-primary-50 rounded-full"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                        </button>
                        <button 
                          onClick={() => handleDeleteSnippet(snippet.id)} 
                          className="text-red-500 p-1 hover:bg-red-50 rounded-full"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                  <CardContent className="pt-4">
                    <p className="text-sm text-earth-600 mb-2">{snippet.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between bg-earth-50 py-2">
                    <a 
                      href={snippet.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-sm text-primary-600 hover:underline flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                      GitHub
                    </a>
                    <a 
                      href={snippet.driveLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-sm text-primary-600 hover:underline flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                      Drive Files
                    </a>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="qgis">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {qgisSnippets.map((snippet) => (
                <Card key={snippet.id} className="overflow-hidden">
                  <div className="bg-green-100 p-4 flex items-center">
                    <div className="bg-green-700 text-white p-2 rounded mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold">{snippet.title}</h3>
                    {isAdmin && (
                      <div className="ml-auto flex gap-1">
                        <button 
                          onClick={() => openEditDialog(snippet)} 
                          className="text-primary-600 p-1 hover:bg-primary-50 rounded-full"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                        </button>
                        <button 
                          onClick={() => handleDeleteSnippet(snippet.id)} 
                          className="text-red-500 p-1 hover:bg-red-50 rounded-full"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                  <CardContent className="pt-4">
                    <p className="text-sm text-earth-600 mb-2">{snippet.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between bg-earth-50 py-2">
                    <a 
                      href={snippet.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-sm text-primary-600 hover:underline flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                      GitHub
                    </a>
                    <a 
                      href={snippet.driveLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-sm text-primary-600 hover:underline flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                      Drive Files
                    </a>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Edit Code Snippet Dialog */}
      {currentSnippet && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Edit Code Snippet</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditSubmit} className="space-y-4 mt-4">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="edit-title">Snippet Title</Label>
                <Input 
                  id="edit-title"
                  value={currentSnippet.title}
                  onChange={(e) => setCurrentSnippet({...currentSnippet, title: e.target.value})}
                  placeholder="Enter snippet title"
                  required
                />
              </div>
              <div className="grid w-full gap-1.5">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea 
                  id="edit-description"
                  value={currentSnippet.description}
                  onChange={(e) => setCurrentSnippet({...currentSnippet, description: e.target.value})}
                  placeholder="What does this code do?"
                  required
                />
              </div>
              <div className="grid w-full gap-1.5">
                <Label htmlFor="edit-category">Category</Label>
                <Select 
                  value={currentSnippet.category} 
                  onValueChange={(value: "ArcGIS Pro" | "QGIS") => setCurrentSnippet({...currentSnippet, category: value})}
                >
                  <SelectTrigger id="edit-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ArcGIS Pro">ArcGIS Pro</SelectItem>
                    <SelectItem value="QGIS">QGIS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid w-full gap-1.5">
                <Label htmlFor="edit-githubLink">GitHub Link</Label>
                <Input 
                  id="edit-githubLink"
                  value={currentSnippet.githubLink}
                  onChange={(e) => setCurrentSnippet({...currentSnippet, githubLink: e.target.value})}
                  placeholder="Link to GitHub repository"
                  required
                />
              </div>
              <div className="grid w-full gap-1.5">
                <Label htmlFor="edit-driveLink">Google Drive Link</Label>
                <Input 
                  id="edit-driveLink"
                  value={currentSnippet.driveLink}
                  onChange={(e) => setCurrentSnippet({...currentSnippet, driveLink: e.target.value})}
                  placeholder="Link to additional files on Google Drive"
                />
              </div>
              <Button type="submit" className="w-full">Save Changes</Button>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
};

export default CodeSection;
