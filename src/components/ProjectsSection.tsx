
import React, { useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

const ProjectsSection = () => {
  const { projects, isAdmin, addProject, updateProject, deleteProject } = usePortfolio();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<typeof projects[0] | null>(null);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    imageUrl: "",
    driveLink: "",
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProject(newProject);
    setNewProject({ title: "", description: "", imageUrl: "", driveLink: "" });
    setIsAddDialogOpen(false);
    toast.success("Project added successfully");
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentProject) {
      updateProject(currentProject);
      setIsEditDialogOpen(false);
      toast.success("Project updated successfully");
    }
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      deleteProject(id);
      toast.success("Project deleted successfully");
    }
  };

  const openEditDialog = (project: typeof projects[0]) => {
    setCurrentProject(project);
    setIsEditDialogOpen(true);
  };

  return (
    <section id="projects" className="py-16 bg-earth-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="section-title">Project Showcase</h2>
          {isAdmin && (
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary-600 hover:bg-primary-700">Add New Project</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Add New Project</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddSubmit} className="space-y-4 mt-4">
                  <div className="grid w-full gap-1.5">
                    <Label htmlFor="title">Project Title</Label>
                    <Input 
                      id="title"
                      value={newProject.title}
                      onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                      placeholder="Enter project title"
                      required
                    />
                  </div>
                  <div className="grid w-full gap-1.5">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description"
                      value={newProject.description}
                      onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                      placeholder="Brief description of the project"
                      required
                    />
                  </div>
                  <div className="grid w-full gap-1.5">
                    <Label htmlFor="imageUrl">Image URL</Label>
                    <Input 
                      id="imageUrl"
                      value={newProject.imageUrl}
                      onChange={(e) => setNewProject({...newProject, imageUrl: e.target.value})}
                      placeholder="URL to project image"
                      required
                    />
                  </div>
                  <div className="grid w-full gap-1.5">
                    <Label htmlFor="driveLink">Google Drive Link</Label>
                    <Input 
                      id="driveLink"
                      value={newProject.driveLink}
                      onChange={(e) => setNewProject({...newProject, driveLink: e.target.value})}
                      placeholder="Link to project files on Google Drive"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">Add Project</Button>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="relative">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-48 object-cover"
                />
                
                {isAdmin && (
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button 
                      onClick={() => openEditDialog(project)} 
                      className="p-2 bg-primary-600 rounded-full text-white hover:bg-primary-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                    </button>
                    <button 
                      onClick={() => handleDeleteProject(project.id)} 
                      className="p-2 bg-red-600 rounded-full text-white hover:bg-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-earth-600 mb-4">{project.description}</p>
                <a 
                  href={project.driveLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center"
                >
                  View Project Files
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </CardContent>
            </div>
          ))}
        </div>
      </div>
      
      {/* Edit Project Dialog */}
      {currentProject && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Edit Project</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditSubmit} className="space-y-4 mt-4">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="edit-title">Project Title</Label>
                <Input 
                  id="edit-title"
                  value={currentProject.title}
                  onChange={(e) => setCurrentProject({...currentProject, title: e.target.value})}
                  placeholder="Enter project title"
                  required
                />
              </div>
              <div className="grid w-full gap-1.5">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea 
                  id="edit-description"
                  value={currentProject.description}
                  onChange={(e) => setCurrentProject({...currentProject, description: e.target.value})}
                  placeholder="Brief description of the project"
                  required
                />
              </div>
              <div className="grid w-full gap-1.5">
                <Label htmlFor="edit-imageUrl">Image URL</Label>
                <Input 
                  id="edit-imageUrl"
                  value={currentProject.imageUrl}
                  onChange={(e) => setCurrentProject({...currentProject, imageUrl: e.target.value})}
                  placeholder="URL to project image"
                  required
                />
              </div>
              <div className="grid w-full gap-1.5">
                <Label htmlFor="edit-driveLink">Google Drive Link</Label>
                <Input 
                  id="edit-driveLink"
                  value={currentProject.driveLink}
                  onChange={(e) => setCurrentProject({...currentProject, driveLink: e.target.value})}
                  placeholder="Link to project files on Google Drive"
                  required
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

export default ProjectsSection;
