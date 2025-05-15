
import React from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import Header from "@/components/Header";
import AdminBar from "@/components/AdminBar";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import CodeSection from "@/components/CodeSection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  const { isAdmin } = usePortfolio();

  return (
    <div className="flex flex-col min-h-screen">
      {isAdmin && <AdminBar />}
      <Header />
      <main>
        <HeroSection />
        <ProjectsSection />
        <CodeSection />
        <ServicesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
