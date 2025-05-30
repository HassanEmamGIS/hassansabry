
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { usePortfolio } from "@/context/PortfolioContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const HeroSection = () => {
  const { aboutInfo, isAdmin, updateAboutInfo } = usePortfolio();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedInfo, setEditedInfo] = useState({
    ...aboutInfo,
    photo: "/lovable-uploads/d83efba8-0064-4b58-985a-1bcf24c61377.png"
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateAboutInfo(editedInfo);
    setIsEditDialogOpen(false);
    toast({
      title: "Success",
      description: "About information updated successfully",
    });
  };
  
  const getInitials = (name: string = "GIS Expert") => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setEditedInfo({
          ...editedInfo,
          photo: event.target.result as string
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Update the aboutInfo with the new image on component mount
  React.useEffect(() => {
    if (isAdmin) {
      updateAboutInfo({
        ...aboutInfo,
        photo: "/lovable-uploads/d83efba8-0064-4b58-985a-1bcf24c61377.png"
      });
    }
  }, []);

  return (
    <section className="bg-gradient-to-br from-primary-700 to-primary-900 map-pattern text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          {/* Profile Image */}
          <div className="md:w-1/3 relative">
            <Avatar className="w-64 h-64 border-4 border-white/30 mx-auto">
              <AvatarImage 
                src="/lovable-uploads/d83efba8-0064-4b58-985a-1bcf24c61377.png" 
                alt="Profile Photo" 
                className="object-cover"
              />
              <AvatarFallback className="text-4xl bg-primary-200 text-primary-800">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            {isAdmin && (
              <button 
                onClick={() => setIsEditDialogOpen(true)}
                className="absolute bottom-2 right-2 p-2 bg-white rounded-full text-primary-700 hover:bg-primary-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </button>
            )}
          </div>
          
          {/* Text Content */}
          <div className="md:w-2/3 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-heading">GIS &amp; Engineering</h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-2xl mx-auto md:mx-0">
              {aboutInfo.bio}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button size="lg" className="bg-white text-primary-700 hover:bg-primary-50">
                <a href="#projects">View Projects</a>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-primary-800">
                <a href="#contact">Contact Me</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Edit Dialog */}
      {isAdmin && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
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
              
              {/* Image Upload Section */}
              <div className="grid w-full gap-1.5">
                <Label htmlFor="photo">Profile Image</Label>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-20 rounded-md overflow-hidden bg-gray-100">
                    {editedInfo.photo ? (
                      <img 
                        src={editedInfo.photo} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={triggerFileInput}
                    >
                      Upload Image
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                    <Input 
                      id="photo"
                      value={typeof editedInfo.photo === 'string' ? editedInfo.photo : ''}
                      onChange={(e) => setEditedInfo({...editedInfo, photo: e.target.value})}
                      placeholder="or enter URL"
                    />
                  </div>
                </div>
              </div>
              
              <Button type="submit" className="w-full">Save Changes</Button>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
};

export default HeroSection;
