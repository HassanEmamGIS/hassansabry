
import React, { createContext, useContext, ReactNode } from "react";
import { PortfolioContextType } from "../types/portfolio";
import { usePortfolioActions } from "../hooks/usePortfolioActions";

// Create the context
const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const portfolioActions = usePortfolioActions();

  return (
    <PortfolioContext.Provider value={portfolioActions}>
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
