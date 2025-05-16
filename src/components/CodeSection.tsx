
import React, { useState, useRef } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Trash2, Image, Upload, Edit } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CodeSection = () => {
  const { codeSnippets, isAdmin, addCodeSnippet, updateCodeSnippet, deleteCodeSnippet } = usePortfolio();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentSnippet, setCurrentSnippet] = useState<typeof codeSnippets[0] | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);
  const [newSnippet, setNewSnippet] = useState({
    title: "",
    description: "",
    category: "ArcGIS Pro" as "ArcGIS Pro" | "QGIS",
    githubLink: "",
    driveLink: "",
    imageUrl: "",
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCodeSnippet(newSnippet);
    setNewSnippet({
      title: "",
      description: "",
      category: "ArcGIS Pro",
      githubLink: "",
      driveLink: "",
      imageUrl: "",
    });
    setImagePreview(null);
    setIsAddDialogOpen(false);
    toast.success("Code snippet added successfully");
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentSnippet) {
      updateCodeSnippet(currentSnippet);
      setIsEditDialogOpen(false);
      setImagePreview(null);
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
    setImagePreview(snippet.imageUrl || null);
    setIsEditDialogOpen(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isEdit: boolean = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const imageUrl = event.target.result as string;
        
        if (isEdit && currentSnippet) {
          setCurrentSnippet({
            ...currentSnippet,
            imageUrl
          });
          setImagePreview(imageUrl);
        } else {
          setNewSnippet({
            ...newSnippet,
            imageUrl
          });
          setImagePreview(imageUrl);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = (isEdit: boolean = false) => {
    if (isEdit) {
      editFileInputRef.current?.click();
    } else {
      fileInputRef.current?.click();
    }
  };

  return (
    <section id="code" className="py-16 bg-earth-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="section-title">Code Snippets</h2>
          {isAdmin && (
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary-600 hover:bg-primary-700">Add New Snippet</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle>Add New Code Snippet</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddSubmit} className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="grid w-full gap-1.5">
                      <Label htmlFor="title">Title</Label>
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
                        placeholder="Brief description of the code snippet"
                        required
                        className="min-h-[100px]"
                      />
                    </div>
                    <div className="grid w-full gap-1.5">
                      <Label htmlFor="category">Category</Label>
                      <Select 
                        value={newSnippet.category}
                        onValueChange={(value) => setNewSnippet({
                          ...newSnippet, 
                          category: value as "ArcGIS Pro" | "QGIS"
                        })}
                      >
                        <SelectTrigger>
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
                        placeholder="Link to Google Drive files"
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Image Upload Section */}
                  <div className="grid w-full gap-4">
                    <Label>Screenshot (Optional)</Label>
                    <div className="flex flex-col items-center gap-6">
                      <div className="w-full h-48 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
                        {imagePreview ? (
                          <div className="relative w-full h-full">
                            <img 
                              src={imagePreview} 
                              alt="Screenshot Preview" 
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Button 
                                type="button" 
                                variant="outline" 
                                size="sm"
                                className="bg-white"
                                onClick={() => triggerFileInput()}
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Change Image
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => triggerFileInput()}
                            className="flex flex-col items-center p-6"
                          >
                            <Image className="h-12 w-12 mb-2 text-gray-400" />
                            <span className="text-sm text-gray-500">Upload screenshot</span>
                            <span className="text-xs text-gray-400 mt-1">Click to browse files</span>
                          </Button>
                        )}
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e)}
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full">Add Code Snippet</Button>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {codeSnippets.map((snippet) => (
            <div key={snippet.id} className="code-card group overflow-hidden rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                {snippet.imageUrl && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={snippet.imageUrl} 
                      alt={snippet.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                
                <div className="absolute top-2 right-2 flex gap-2">
                  {isAdmin && (
                    <>
                      <button 
                        onClick={() => openEditDialog(snippet)} 
                        className="p-2 bg-white/90 rounded-full text-primary-600 hover:bg-primary-600 hover:text-white transition-colors"
                        aria-label="Edit code snippet"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteSnippet(snippet.id)} 
                        className="p-2 bg-white/90 rounded-full text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                        aria-label="Delete code snippet"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>

                <div className="absolute top-2 left-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    snippet.category === "ArcGIS Pro" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                  }`}>
                    {snippet.category}
                  </span>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{snippet.title}</h3>
                <p className="text-earth-600 mb-4 line-clamp-3">{snippet.description}</p>
                <div className="flex flex-wrap gap-3">
                  <a 
                    href={snippet.githubLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center text-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github mr-1" viewBox="0 0 16 16">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                    GitHub
                  </a>
                  <a 
                    href={snippet.driveLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center text-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google mr-1" viewBox="0 0 16 16">
                      <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
                    </svg>
                    Drive Files
                  </a>
                </div>
              </CardContent>
            </div>
          ))}
        </div>
      </div>
      
      {/* Edit Code Snippet Dialog */}
      {currentSnippet && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Edit Code Snippet</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditSubmit} className="space-y-4 mt-4">
              <Tabs defaultValue="details">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="details">Snippet Details</TabsTrigger>
                  <TabsTrigger value="image">Screenshot</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-4">
                  <div className="grid w-full gap-3">
                    <div className="grid w-full gap-1.5">
                      <Label htmlFor="edit-title">Title</Label>
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
                        placeholder="Brief description of the code snippet"
                        required
                        className="min-h-[150px]"
                      />
                    </div>
                    <div className="grid w-full gap-1.5">
                      <Label htmlFor="edit-category">Category</Label>
                      <Select 
                        value={currentSnippet.category}
                        onValueChange={(value) => setCurrentSnippet({
                          ...currentSnippet, 
                          category: value as "ArcGIS Pro" | "QGIS"
                        })}
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
                        placeholder="Link to Google Drive files"
                        required
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="image">
                  <div className="space-y-4">
                    <Label>Screenshot (Optional)</Label>
                    <div className="flex flex-col items-center gap-6">
                      <div className="w-full h-64 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
                        {imagePreview ? (
                          <div className="relative w-full h-full group">
                            <img 
                              src={imagePreview} 
                              alt="Screenshot Preview" 
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                              <Button 
                                type="button" 
                                variant="outline" 
                                size="sm"
                                className="bg-white"
                                onClick={() => triggerFileInput(true)}
                              >
                                <Upload className="h-4 w-4 mr-2" />
                                Change
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => triggerFileInput(true)}
                            className="flex flex-col items-center p-8"
                          >
                            <Image className="h-16 w-16 mb-3 text-gray-400" />
                            <span className="text-sm text-gray-500">Upload screenshot</span>
                            <span className="text-xs text-gray-400 mt-1">Click to browse files</span>
                          </Button>
                        )}
                      </div>
                      <input
                        ref={editFileInputRef}
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, true)}
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              <Button type="submit" className="w-full">Save Changes</Button>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
};

export default CodeSection;
