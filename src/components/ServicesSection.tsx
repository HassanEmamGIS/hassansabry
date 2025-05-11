
import React, { useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const ServiceIcon = ({ name }: { name: string }) => {
  // Simple icon mapping - in a real app, you might use a more comprehensive icon library
  switch (name) {
    case "layers":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.75l7.25 4.5M12 4.75L4.75 9.25M12 19.25l-7.25-4.5M12 19.25l7.25-4.5M12 14.75l-7.25-4.5M12 14.75l7.25-4.5" />
        </svg>
      );
    case "code":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    case "map":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      );
    case "globe":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="16"></line>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
      );
  }
};

const ServicesSection = () => {
  const { services, isAdmin, updateServices } = usePortfolio();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState<typeof services[0] | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newService, setNewService] = useState({
    title: "",
    description: "",
    icon: "layers",
  });

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentService) {
      const updatedServices = services.map(s => 
        s.id === currentService.id ? currentService : s
      );
      updateServices(updatedServices);
      setIsEditDialogOpen(false);
      toast.success("Service updated successfully");
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newServiceWithId = {
      ...newService,
      id: Date.now().toString(),
    };
    updateServices([...services, newServiceWithId]);
    setNewService({
      title: "",
      description: "",
      icon: "layers",
    });
    setIsAddDialogOpen(false);
    toast.success("Service added successfully");
  };

  const handleDeleteService = (id: string) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      const updatedServices = services.filter(s => s.id !== id);
      updateServices(updatedServices);
      toast.success("Service deleted successfully");
    }
  };

  return (
    <section id="services" className="py-16 bg-earth-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="section-title">Services Offered</h2>
          {isAdmin && (
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary-600 hover:bg-primary-700">Add New Service</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Add New Service</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddSubmit} className="space-y-4 mt-4">
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
                      placeholder="Service description"
                      required
                    />
                  </div>
                  <div className="grid w-full gap-1.5">
                    <Label htmlFor="icon">Icon</Label>
                    <select
                      id="icon"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={newService.icon}
                      onChange={(e) => setNewService({...newService, icon: e.target.value})}
                    >
                      <option value="layers">Layers</option>
                      <option value="code">Code</option>
                      <option value="map">Map</option>
                      <option value="globe">Globe</option>
                    </select>
                  </div>
                  <Button type="submit" className="w-full">Add Service</Button>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="bg-white overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4 text-primary-600">
                  <ServiceIcon name={service.icon} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-earth-600">{service.description}</p>
                
                {isAdmin && (
                  <div className="flex justify-center gap-2 mt-4">
                    <button 
                      onClick={() => {
                        setCurrentService(service);
                        setIsEditDialogOpen(true);
                      }}
                      className="text-primary-600 p-2 hover:bg-primary-50 rounded"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                    </button>
                    <button 
                      onClick={() => handleDeleteService(service.id)} 
                      className="text-red-500 p-2 hover:bg-red-50 rounded"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Edit Service Dialog */}
      {currentService && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Edit Service</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditSubmit} className="space-y-4 mt-4">
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
                  placeholder="Service description"
                  required
                />
              </div>
              <div className="grid w-full gap-1.5">
                <Label htmlFor="edit-icon">Icon</Label>
                <select
                  id="edit-icon"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={currentService.icon}
                  onChange={(e) => setCurrentService({...currentService, icon: e.target.value})}
                >
                  <option value="layers">Layers</option>
                  <option value="code">Code</option>
                  <option value="map">Map</option>
                  <option value="globe">Globe</option>
                </select>
              </div>
              <Button type="submit" className="w-full">Save Changes</Button>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
};

export default ServicesSection;
