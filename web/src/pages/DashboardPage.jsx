import React, { useState, useMemo } from "react";
import { Plus, Users, Search, AlertCircle } from "lucide-react";
import { useUsers } from "../context/UserContext";
import Header from "../components/Header";
import UserCard from "../components/UserCard";
import AddUserForm from "../components/AddUserForm";

const DashboardPage = ({ onNavigateToUser }) => {
  const { users, loading, error, addUser, searchUsers } = useUsers();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [isAddingUser, setIsAddingUser] = useState(false);

  // Filter users based on search query
  const filteredUsers = useMemo(() => {
    return searchUsers(searchQuery);
  }, [users, searchQuery, searchUsers]);

  const handleUserClick = (user) => {
    if (onNavigateToUser) {
      onNavigateToUser(user.id);
    }
  };

  const handleAddUser = async (userData) => {
    try {
      setIsAddingUser(true);
      await addUser(userData);
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding user:", error);
      throw error; // Let AddUserForm handle the error display
    } finally {
      setIsAddingUser(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0A0A0A]">
        <Header showSearch={false} />
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center py-20">
            <div className="w-16 h-16 border-4 border-[#4F46E5] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-[#111827] dark:text-white mb-2 font-sora">
              Loading Users
            </h2>
            <p className="text-[#6B7280] dark:text-[#9CA3AF] font-inter">
              Fetching user data from the server...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0A0A0A]">
        <Header showSearch={false} />
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center py-20">
            <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-[#111827] dark:text-white mb-2 font-sora">
              Failed to Load Users
            </h2>
            <p className="text-[#6B7280] dark:text-[#9CA3AF] font-inter mb-4">
              {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[#4F46E5] text-white rounded-lg hover:bg-[#4338CA] transition-colors duration-150 font-inter"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0A0A0A]">
      <Header
        title="User Dashboard"
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        showSearch={!showAddForm}
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {showAddForm ? (
          // Add User Form
          <div className="max-w-2xl mx-auto">
            <AddUserForm
              onAddUser={handleAddUser}
              onCancel={() => setShowAddForm(false)}
              isLoading={isAddingUser}
            />
          </div>
        ) : (
          <>
            {/* Dashboard Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-bold text-[#111827] dark:text-white mb-2 font-sora">
                  Welcome to your Dashboard
                </h1>
                <p className="text-[#6B7280] dark:text-[#9CA3AF] font-inter">
                  {filteredUsers.length}{" "}
                  {filteredUsers.length === 1 ? "user" : "users"}
                  {searchQuery ? ` found for "${searchQuery}"` : " in total"}
                </p>
              </div>

              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-b from-[#4F46E5] to-[#4338CA] text-white font-semibold rounded-lg transition-all duration-150 hover:from-[#5B51E8] hover:to-[#4F46E5] active:from-[#4338CA] active:to-[#3730A3] active:scale-[0.99] font-inter"
              >
                <Plus size={20} />
                Add New User
              </button>
            </div>

            {/* Users Grid */}
            {filteredUsers.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-[#F3F4F6] dark:bg-[#374151] rounded-full flex items-center justify-center mx-auto mb-4">
                  {searchQuery ? (
                    <Search
                      size={32}
                      className="text-[#6B7280] dark:text-[#9CA3AF]"
                    />
                  ) : (
                    <Users
                      size={32}
                      className="text-[#6B7280] dark:text-[#9CA3AF]"
                    />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-[#111827] dark:text-white mb-2 font-sora">
                  {searchQuery ? "No users found" : "No users yet"}
                </h3>
                <p className="text-[#6B7280] dark:text-[#9CA3AF] font-inter mb-4">
                  {searchQuery
                    ? `No users match "${searchQuery}". Try adjusting your search terms.`
                    : "Get started by adding your first user to the dashboard."}
                </p>
                {searchQuery ? (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="px-4 py-2 text-[#4F46E5] dark:text-[#818CF8] hover:bg-[#EEF2FF] dark:hover:bg-[#312E81] rounded-lg transition-colors duration-150 font-inter"
                  >
                    Clear search
                  </button>
                ) : (
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-b from-[#4F46E5] to-[#4338CA] text-white font-semibold rounded-lg transition-all duration-150 hover:from-[#5B51E8] hover:to-[#4F46E5] active:from-[#4338CA] active:to-[#3730A3] active:scale-[0.99] mx-auto font-inter"
                  >
                    <Plus size={20} />
                    Add First User
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.map((user) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    onClick={() => handleUserClick(user)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
