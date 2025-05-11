
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent successfully! I'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" className="py-16 bg-primary-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center font-heading">Get In Touch</h2>
        
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" className="text-white">Name</Label>
                <Input 
                  id="name" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50" 
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input 
                  id="email" 
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50" 
                  placeholder="Your Email"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="subject" className="text-white">Subject</Label>
              <Input 
                id="subject" 
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50" 
                placeholder="Subject"
                required
              />
            </div>
            <div>
              <Label htmlFor="message" className="text-white">Message</Label>
              <Textarea 
                id="message" 
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50" 
                placeholder="Your message"
                rows={6}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-white text-primary-900 hover:bg-primary-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
