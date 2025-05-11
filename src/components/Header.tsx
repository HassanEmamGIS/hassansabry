
import React, { useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const Header = () => {
  const { isAdmin, setIsAdmin } = usePortfolio();
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  
  // Simple admin authentication for demo purposes
  // In a real app, this would use proper authentication
  const adminPassword = "admin123";
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === adminPassword) {
      setIsAdmin(true);
      toast({
        title: "Admin mode activated",
        description: "You can now edit the portfolio content",
      });
      setIsOpen(false);
    } else {
      toast({
        title: "Authentication failed",
        description: "Incorrect password",
        variant: "destructive",
      });
    }
  };
  
  const handleLogout = () => {
    setIsAdmin(false);
    toast({
      title: "Logged out",
      description: "Admin mode deactivated",
    });
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold font-heading text-primary-700">GIS<span className="text-earth-600">Portfolio</span></a>
        
        <div className="hidden md:flex space-x-6 font-medium">
          <a href="#projects" className="hover:text-primary-600 transition-colors">Projects</a>
          <a href="#code" className="hover:text-primary-600 transition-colors">Code</a>
          <a href="#services" className="hover:text-primary-600 transition-colors">Services</a>
          <a href="#about" className="hover:text-primary-600 transition-colors">About</a>
          <a href="#contact" className="hover:text-primary-600 transition-colors">Contact</a>
        </div>
        
        <div className="flex items-center space-x-4">
          {isAdmin ? (
            <Button onClick={handleLogout} variant="outline" className="border-primary-500 text-primary-700">
              Exit Admin Mode
            </Button>
          ) : (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" className="text-earth-600 hover:text-primary-600">
                  Admin Login
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Administrator Login</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter admin password"
                    />
                  </div>
                  <Button type="submit" className="w-full">Login</Button>
                </form>
              </DialogContent>
            </Dialog>
          )}
          <Button className="bg-primary-600 hover:bg-primary-700">
            <a href="#contact">Hire Me</a>
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
