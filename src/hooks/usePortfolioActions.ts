import { useState } from "react";
import { Project, CodeSnippet, Service, AboutInfo } from "../types/portfolio";
import { sampleProjects, sampleCodeSnippets, sampleServices, sampleAboutInfo } from "../data/sampleData";

export function usePortfolioActions() {
  const [projects, setProjects] = useState<Project[]>(sampleProjects);
  const [codeSnippets, setCodeSnippets] = useState<CodeSnippet[]>(sampleCodeSnippets);
  const [services, setServices] = useState<Service[]>(sampleServices);
  const [aboutInfo, setAboutInfo] = useState<AboutInfo>(sampleAboutInfo);
  const [isAdmin, setIsAdmin] = useState<boolean>(true); // Set to true by default for immediate admin access

  // Project CRUD operations
  const addProject = (project: Omit<Project, "id">) => {
    const newProject = {
      ...project,
      id: Date.now().toString(),
    };
    setProjects([...projects, newProject]);
  };

  const updateProject = (project: Project) => {
    setProjects(projects.map(p => p.id === project.id ? project : p));
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  // Code snippet CRUD operations
  const addCodeSnippet = (snippet: Omit<CodeSnippet, "id">) => {
    const newSnippet = {
      ...snippet,
      id: Date.now().toString(),
    };
    setCodeSnippets([...codeSnippets, newSnippet]);
  };

  const updateCodeSnippet = (snippet: CodeSnippet) => {
    setCodeSnippets(codeSnippets.map(s => s.id === snippet.id ? snippet : s));
  };

  const deleteCodeSnippet = (id: string) => {
    setCodeSnippets(codeSnippets.filter(s => s.id !== id));
  };

  // Service CRUD operations
  const addService = (service: Omit<Service, "id">) => {
    const newService = {
      ...service,
      id: Date.now().toString(),
    };
    setServices([...services, newService]);
  };

  const updateService = (service: Service) => {
    setServices(services.map(s => s.id === service.id ? service : s));
  };

  const deleteService = (id: string) => {
    setServices(services.filter(s => s.id !== id));
  };

  // About Info update operations
  const updateServices = (newServices: Service[]) => {
    setServices(newServices);
  };

  const updateAboutInfo = (info: Partial<AboutInfo>) => {
    setAboutInfo({ ...aboutInfo, ...info });
  };

  return {
    // State
    projects,
    codeSnippets,
    services,
    aboutInfo,
    isAdmin,
    
    // Actions
    setIsAdmin,
    addProject,
    updateProject,
    deleteProject,
    addCodeSnippet,
    updateCodeSnippet,
    deleteCodeSnippet,
    addService,
    updateService,
    deleteService,
    updateServices,
    updateAboutInfo,
  };
}
