import React, { useState } from "react";
import { UserProvider } from "../context/UserContext";
import DashboardPage from "../pages/DashboardPage";
import UserDetailsPage from "../pages/UserDetailsPage";

export default function App() {
  const [currentView, setCurrentView] = useState("dashboard");
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleNavigateToUser = (userId) => {
    setSelectedUserId(userId);
    setCurrentView("userDetails");
  };

  const handleNavigateBack = () => {
    setCurrentView("dashboard");
    setSelectedUserId(null);
  };

  return (
    <UserProvider>
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0A0A0A]">
        {currentView === "dashboard" ? (
          <DashboardPage onNavigateToUser={handleNavigateToUser} />
        ) : (
          <UserDetailsPage
            userId={selectedUserId}
            onNavigateBack={handleNavigateBack}
          />
        )}
      </div>
    </UserProvider>
  );
}
