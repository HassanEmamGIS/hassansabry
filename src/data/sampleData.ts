
import { Project, CodeSnippet, Service, AboutInfo } from "../types/portfolio";

// Sample initial data
export const sampleProjects: Project[] = [
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

export const sampleCodeSnippets: CodeSnippet[] = [
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

export const sampleServices: Service[] = [
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

export const sampleAboutInfo: AboutInfo = {
  bio: "GIS Engineer with over 8 years of experience specializing in environmental applications, remote sensing, and geospatial analysis. Proficient in ArcGIS Pro, QGIS, Python, and various spatial databases. Passionate about leveraging geospatial technology to solve complex environmental and urban planning challenges.",
  photo: "https://placehold.co/400x400?text=Your+Photo",
  email: "contact@gisportfolio.com",
  linkedin: "https://linkedin.com/in/username",
  github: "https://github.com/username",
};
