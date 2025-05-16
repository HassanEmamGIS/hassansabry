
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

export interface PortfolioContextType {
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
