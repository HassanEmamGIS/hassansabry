
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePortfolio } from "@/context/PortfolioContext";
import Header from "@/components/Header";

const AdminDashboard = () => {
  const { isAdmin, setIsAdmin } = usePortfolio();
  const navigate = useNavigate();
  
  // Redirect to homepage if not admin
  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    } else {
      // If they're already admin, just redirect to homepage with admin controls visible
      navigate("/#projects");
    }
  }, [isAdmin, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <p className="mb-4">Redirecting to the homepage with admin controls...</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
