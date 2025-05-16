
import React, { useState, useRef } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Trash2, Image, Upload, Edit } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ServicesSection = () => {
  const { services, isAdmin, addService, updateService, deleteService } = usePortfolio();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState<typeof services[0] | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);
  const [newService, setNewService] = useState({
    title: "",
    description: "",
    icon: "",
    imageUrl: "",
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addService(newService);
    setNewService({ title: "", description: "", icon: "", imageUrl: "" });
    setImagePreview(null);
    setIsAddDialogOpen(false);
    toast.success("Service added successfully");
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentService) {
      updateService(currentService);
      setIsEditDialogOpen(false);
      setImagePreview(null);
      toast.success("Service updated successfully");
    }
  };

  const handleDeleteService = (id: string) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      deleteService(id);
      toast.success("Service deleted successfully");
    }
  };

  const openEditDialog = (service: typeof services[0]) => {
    setCurrentService(service);
    setImagePreview(service.imageUrl || null);
    setIsEditDialogOpen(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isEdit: boolean = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const imageUrl = event.target.result as string;
        
        if (isEdit && currentService) {
          setCurrentService({
            ...currentService,
            imageUrl
          });
          setImagePreview(imageUrl);
        } else {
          setNewService({
            ...newService,
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
    <section id="services" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="section-title">Services Offered</h2>
          {isAdmin && (
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary-600 hover:bg-primary-700">Add New Service</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle>Add New Service</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddSubmit} className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="grid w-full gap-1.5">
                      <Label htmlFor="title">Service Title</Label>
                      <Input 
                        id="title"
                        value={newService.title}
                        onChange={(e) => setNewService({...newService, title: e.target.value})}
                        placeholder="Enter service title"
                        required
                      />
                    </div>
                    <div className="grid w-full gap-1.5">
                      <Label htmlFor="description">Description</Label>
                      <Textarea 
                        id="description"
                        value={newService.description}
                        onChange={(e) => setNewService({...newService, description: e.target.value})}
                        placeholder="Brief description of the service"
                        required
                        className="min-h-[100px]"
                      />
                    </div>
                    <div className="grid w-full gap-1.5">
                      <Label htmlFor="icon">Icon Name</Label>
                      <Input 
                        id="icon"
                        value={newService.icon}
                        onChange={(e) => setNewService({...newService, icon: e.target.value})}
                        placeholder="Icon name or path"
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Image Upload Section */}
                  <div className="grid w-full gap-4">
                    <Label>Service Image (Optional)</Label>
                    <div className="flex flex-col items-center gap-6">
                      <div className="w-full h-48 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
                        {imagePreview ? (
                          <div className="relative w-full h-full">
                            <img 
                              src={imagePreview} 
                              alt="Service Preview" 
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
                            <span className="text-sm text-gray-500">Upload service image</span>
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
                  
                  <Button type="submit" className="w-full">Add Service</Button>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="service-card group overflow-hidden rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                {service.imageUrl && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={service.imageUrl} 
                      alt={service.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                
                {isAdmin && (
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button 
                      onClick={() => openEditDialog(service)} 
                      className="p-2 bg-white/90 rounded-full text-primary-600 hover:bg-primary-600 hover:text-white transition-colors"
                      aria-label="Edit service"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteService(service.id)} 
                      className="p-2 bg-white/90 rounded-full text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                      aria-label="Delete service"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <span className="text-primary-600 text-2xl mr-3">
                    <i className={service.icon}></i>
                  </span>
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                </div>
                <p className="text-earth-600">{service.description}</p>
              </CardContent>
            </div>
          ))}
        </div>
      </div>
      
      {/* Edit Service Dialog */}
      {currentService && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Edit Service</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditSubmit} className="space-y-4 mt-4">
              <Tabs defaultValue="details">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="details">Service Details</TabsTrigger>
                  <TabsTrigger value="image">Service Image</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-4">
                  <div className="grid w-full gap-3">
                    <div className="grid w-full gap-1.5">
                      <Label htmlFor="edit-title">Service Title</Label>
                      <Input 
                        id="edit-title"
                        value={currentService.title}
                        onChange={(e) => setCurrentService({...currentService, title: e.target.value})}
                        placeholder="Enter service title"
                        required
                      />
                    </div>
                    <div className="grid w-full gap-1.5">
                      <Label htmlFor="edit-description">Description</Label>
                      <Textarea 
                        id="edit-description"
                        value={currentService.description}
                        onChange={(e) => setCurrentService({...currentService, description: e.target.value})}
                        placeholder="Brief description of the service"
                        required
                        className="min-h-[150px]"
                      />
                    </div>
                    <div className="grid w-full gap-1.5">
                      <Label htmlFor="edit-icon">Icon Name</Label>
                      <Input 
                        id="edit-icon"
                        value={currentService.icon}
                        onChange={(e) => setCurrentService({...currentService, icon: e.target.value})}
                        placeholder="Icon name or path"
                        required
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="image">
                  <div className="space-y-4">
                    <Label>Service Image (Optional)</Label>
                    <div className="flex flex-col items-center gap-6">
                      <div className="w-full h-64 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
                        {imagePreview ? (
                          <div className="relative w-full h-full group">
                            <img 
                              src={imagePreview} 
                              alt="Service Preview" 
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
                            <span className="text-sm text-gray-500">Upload service image</span>
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

export default ServicesSection;
