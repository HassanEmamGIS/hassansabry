
import React, { useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

const AboutSection = () => {
  const { aboutInfo, isAdmin, updateAboutInfo } = usePortfolio();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedInfo, setEditedInfo] = useState(aboutInfo);
  
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateAboutInfo(editedInfo);
    setIsEditDialogOpen(false);
    toast.success("About information updated successfully");
  };
  
  const getInitials = (name: string = "GIS Expert") => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <section id="about" className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="section-title">About Me</h2>
          {isAdmin && (
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary-600 hover:bg-primary-700">Edit About Info</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Edit About Information</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleEditSubmit} className="space-y-4 mt-4">
                  <div className="grid w-full gap-1.5">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea 
                      id="bio"
                      value={editedInfo.bio}
                      onChange={(e) => setEditedInfo({...editedInfo, bio: e.target.value})}
                      placeholder="Your professional bio"
                      rows={6}
                      required
                    />
                  </div>
                  <div className="grid w-full gap-1.5">
                    <Label htmlFor="photo">Photo URL</Label>
                    <Input 
                      id="photo"
                      value={editedInfo.photo}
                      onChange={(e) => setEditedInfo({...editedInfo, photo: e.target.value})}
                      placeholder="URL to your professional photo"
                      required
                    />
                  </div>
                  <div className="grid w-full gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email"
                      type="email"
                      value={editedInfo.email}
                      onChange={(e) => setEditedInfo({...editedInfo, email: e.target.value})}
                      placeholder="Your professional email"
                      required
                    />
                  </div>
                  <div className="grid w-full gap-1.5">
                    <Label htmlFor="linkedin">LinkedIn URL</Label>
                    <Input 
                      id="linkedin"
                      value={editedInfo.linkedin}
                      onChange={(e) => setEditedInfo({...editedInfo, linkedin: e.target.value})}
                      placeholder="Your LinkedIn profile URL"
                      required
                    />
                  </div>
                  <div className="grid w-full gap-1.5">
                    <Label htmlFor="github">GitHub URL</Label>
                    <Input 
                      id="github"
                      value={editedInfo.github}
                      onChange={(e) => setEditedInfo({...editedInfo, github: e.target.value})}
                      placeholder="Your GitHub profile URL"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">Save Changes</Button>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-1 flex justify-center">
            <div className="relative w-64 h-64">
              <Avatar className="w-64 h-64 border-4 border-primary-100">
                <AvatarImage src={aboutInfo.photo} alt="Profile Photo" className="object-cover" />
                <AvatarFallback className="text-4xl bg-primary-200 text-primary-800">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              {isAdmin && (
                <button 
                  onClick={() => setIsEditDialogOpen(true)}
                  className="absolute bottom-2 right-2 p-2 bg-primary-600 rounded-full text-white hover:bg-primary-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </button>
              )}
            </div>
          </div>
          
          <div className="md:col-span-2">
            <p className="text-lg mb-6 leading-relaxed">
              {aboutInfo.bio}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href={`mailto:${aboutInfo.email}`} 
                className="flex items-center gap-2 bg-primary-50 hover:bg-primary-100 text-primary-700 px-4 py-2 rounded-lg transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                {aboutInfo.email}
              </a>
              
              <a 
                href={aboutInfo.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 bg-[#0077B5]/10 hover:bg-[#0077B5]/20 text-[#0077B5] px-4 py-2 rounded-lg transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
                LinkedIn
              </a>
              
              <a 
                href={aboutInfo.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 bg-earth-100 hover:bg-earth-200 text-earth-700 px-4 py-2 rounded-lg transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
