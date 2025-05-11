
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define types for our portfolio data
export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  driveLink: string;
}

export interface CodeSnippet {
  id: string;
  title: string;
  description: string;
  category: "ArcGIS Pro" | "QGIS";
  githubLink: string;
  driveLink: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface AboutInfo {
  bio: string;
  photo: string;
  email: string;
  linkedin: string;
  github: string;
}

interface PortfolioContextType {
  // Data
  projects: Project[];
  codeSnippets: CodeSnippet[];
  services: Service[];
  aboutInfo: AboutInfo;
  isAdmin: boolean;
  
  // Admin actions
  setIsAdmin: (value: boolean) => void;
  addProject: (project: Omit<Project, "id">) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  addCodeSnippet: (snippet: Omit<CodeSnippet, "id">) => void;
  updateCodeSnippet: (snippet: CodeSnippet) => void;
  deleteCodeSnippet: (id: string) => void;
  updateServices: (services: Service[]) => void;
  updateAboutInfo: (info: Partial<AboutInfo>) => void;
}

// Create the context
const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

// Sample initial data
const sampleProjects: Project[] = [
  {
    id: "1",
    title: "Urban Heat Island Analysis",
    description: "Analyzed temperature variations across urban areas using satellite imagery and spatial analysis techniques.",
    imageUrl: "https://placehold.co/600x400?text=Urban+Heat+Map",
    driveLink: "https://drive.google.com/drive/folders/example1",
  },
  {
    id: "2",
    title: "Flood Risk Assessment",
    description: "Created risk assessment maps for flood-prone areas using elevation data, precipitation records and hydrological modeling.",
    imageUrl: "https://placehold.co/600x400?text=Flood+Risk+Map",
    driveLink: "https://drive.google.com/drive/folders/example2",
  },
  {
    id: "3",
    title: "Wildlife Corridor Planning",
    description: "Identified optimal wildlife corridors between fragmented habitats using least-cost path analysis and habitat suitability modeling.",
    imageUrl: "https://placehold.co/600x400?text=Wildlife+Corridor",
    driveLink: "https://drive.google.com/drive/folders/example3",
  },
];

const sampleCodeSnippets: CodeSnippet[] = [
  {
    id: "1",
    title: "Batch Processing Script",
    description: "Python script to automate the processing of multiple raster datasets in ArcGIS Pro.",
    category: "ArcGIS Pro",
    githubLink: "https://github.com/username/repo1",
    driveLink: "https://drive.google.com/drive/folders/example4",
  },
  {
    id: "2",
    title: "Custom Symbology Tool",
    description: "A PyQGIS script that applies custom symbology based on attribute data.",
    category: "QGIS",
    githubLink: "https://github.com/username/repo2",
    driveLink: "https://drive.google.com/drive/folders/example5",
  },
  {
    id: "3",
    title: "Spatial Analysis Toolbox",
    description: "A collection of geoprocessing tools for environmental analysis in ArcGIS Pro.",
    category: "ArcGIS Pro",
    githubLink: "https://github.com/username/repo3",
    driveLink: "https://drive.google.com/drive/folders/example6",
  },
];

const sampleServices: Service[] = [
  {
    id: "1",
    title: "Geospatial Data Analysis",
    description: "Advanced analysis of spatial patterns and relationships in your data.",
    icon: "layers",
  },
  {
    id: "2",
    title: "Python Automation",
    description: "Custom scripts to automate repetitive GIS tasks and workflows.",
    icon: "code",
  },
  {
    id: "3",
    title: "Cartography & Visualization",
    description: "Professional map production and spatial data visualization.",
    icon: "map",
  },
  {
    id: "4",
    title: "Remote Sensing",
    description: "Satellite imagery analysis and interpretation for environmental monitoring.",
    icon: "globe",
  },
];

const sampleAboutInfo: AboutInfo = {
  bio: "GIS Engineer with over 8 years of experience specializing in environmental applications, remote sensing, and geospatial analysis. Proficient in ArcGIS Pro, QGIS, Python, and various spatial databases. Passionate about leveraging geospatial technology to solve complex environmental and urban planning challenges.",
  photo: "https://placehold.co/400x400?text=Your+Photo",
  email: "contact@gisportfolio.com",
  linkedin: "https://linkedin.com/in/username",
  github: "https://github.com/username",
};

export const PortfolioProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(sampleProjects);
  const [codeSnippets, setCodeSnippets] = useState<CodeSnippet[]>(sampleCodeSnippets);
  const [services, setServices] = useState<Service[]>(sampleServices);
  const [aboutInfo, setAboutInfo] = useState<AboutInfo>(sampleAboutInfo);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

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

  // Service and About Info update operations
  const updateServices = (newServices: Service[]) => {
    setServices(newServices);
  };

  const updateAboutInfo = (info: Partial<AboutInfo>) => {
    setAboutInfo({ ...aboutInfo, ...info });
  };

  return (
    <PortfolioContext.Provider
      value={{
        projects,
        codeSnippets,
        services,
        aboutInfo,
        isAdmin,
        setIsAdmin,
        addProject,
        updateProject,
        deleteProject,
        addCodeSnippet,
        updateCodeSnippet,
        deleteCodeSnippet,
        updateServices,
        updateAboutInfo,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

// Custom hook to use the portfolio context
export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};
