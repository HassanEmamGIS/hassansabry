
import React from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AdminBar = () => {
  const { isAdmin } = usePortfolio();
  
  if (!isAdmin) return null;
  
  const handleSaveChanges = () => {
    // In a real application, this would save to a database or file system
    // For this demo, we'll just show a toast notification
    toast.success("Changes saved successfully");
  };

  return (
    <div className="bg-primary-700 text-white px-4 py-2">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-bold">Admin Mode</span>
          <span className="text-xs bg-green-500 px-2 py-0.5 rounded-full">Active</span>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-white border-white hover:bg-primary-600"
            onClick={() => window.location.hash = "#projects"}
          >
            Edit Projects
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-white border-white hover:bg-primary-600"
            onClick={() => window.location.hash = "#code"}
          >
            Edit Code
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-white border-white hover:bg-primary-600"
            onClick={() => window.location.hash = "#services"}
          >
            Edit Services
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-white border-white hover:bg-primary-600"
            onClick={() => window.location.hash = "#about"}
          >
            Edit About
          </Button>
          <Button 
            size="sm" 
            className="bg-green-500 hover:bg-green-600"
            onClick={handleSaveChanges}
          >
            Save All Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminBar;
