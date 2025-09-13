import React, { createContext, useContext, useState, useEffect } from 'react';
import { userService } from '../api/userService';

// Create the context
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};

// UserProvider component
export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users on component mount
  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedUsers = await userService.fetchUsers();
        setUsers(fetchedUsers);
      } catch (err) {
        setError('Failed to load users. Please try again later.');
        console.error('Error loading users:', err);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  // Add new user to the state
  const addUser = async (userData) => {
    try {
      const newUser = await userService.addUser(userData);
      // For demonstration purposes, assign a unique ID since JSONPlaceholder returns id: 11
      const userWithId = {
        ...newUser,
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1
      };
      setUsers(prevUsers => [...prevUsers, userWithId]);
      return userWithId;
    } catch (err) {
      console.error('Error adding user:', err);
      throw new Error('Failed to add user. Please try again.');
    }
  };

  // Search/filter users by name or email
  const searchUsers = (query) => {
    if (!query.trim()) return users;
    
    const lowercaseQuery = query.toLowerCase();
    return users.filter(user => 
      user.name.toLowerCase().includes(lowercaseQuery) ||
      user.email.toLowerCase().includes(lowercaseQuery) ||
      user.username.toLowerCase().includes(lowercaseQuery)
    );
  };

  // Get user by ID
  const getUserById = (id) => {
    return users.find(user => user.id === parseInt(id));
  };

  const value = {
    users,
    loading,
    error,
    addUser,
    searchUsers,
    getUserById,
    refetchUsers: () => {
      // Re-fetch users if needed
      setLoading(true);
      userService.fetchUsers()
        .then(setUsers)
        .catch(err => setError('Failed to refresh users'))
        .finally(() => setLoading(false));
    }
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};