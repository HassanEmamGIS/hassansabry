
import React from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { toast } from "@/hooks/use-toast";

const Footer = () => {
  const { aboutInfo } = usePortfolio();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-earth-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 font-heading">GIS<span className="text-primary-400">Portfolio</span></h3>
            <p className="text-earth-300">
              Professional GIS and Geospatial Engineering services for environmental analysis, urban planning, and data visualization.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4 font-heading">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#projects" className="text-earth-300 hover:text-white transition-colors">Projects</a></li>
              <li><a href="#code" className="text-earth-300 hover:text-white transition-colors">Code</a></li>
              <li><a href="#services" className="text-earth-300 hover:text-white transition-colors">Services</a></li>
              <li><a href="#about" className="text-earth-300 hover:text-white transition-colors">About</a></li>
              <li><a href="#contact" className="text-earth-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4 font-heading">Connect</h3>
            <div className="flex space-x-4">
              <a 
                href={`mailto:${aboutInfo.email}`} 
                className="bg-earth-700 hover:bg-earth-600 p-2 rounded-full transition-colors"
                aria-label="Email"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </a>
              <a 
                href={aboutInfo.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-earth-700 hover:bg-earth-600 p-2 rounded-full transition-colors"
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a 
                href={aboutInfo.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-earth-700 hover:bg-earth-600 p-2 rounded-full transition-colors"
                aria-label="GitHub"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast({
                    title: "Success",
                    description: "Portfolio URL copied to clipboard!"
                  });
                }}
                className="bg-earth-700 hover:bg-earth-600 p-2 rounded-full transition-colors"
                aria-label="Copy Link"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-earth-700 mt-8 pt-6 text-center text-earth-400">
          <p>© {currentYear} GIS Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
