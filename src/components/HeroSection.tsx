import React from "react";
import { Button } from "@/components/ui/button";
const HeroSection = () => {
  return <section className="bg-gradient-to-br from-primary-700 to-primary-900 map-pattern text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-heading">GIS &  Eng</h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-2xl mx-auto">
            Transforming spatial data into actionable insights through custom analysis, automation, and visualization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary-700 hover:bg-primary-50">
              <a href="#projects">View Projects</a>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-primary-800">
              <a href="#contact">Contact Me</a>
            </Button>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;