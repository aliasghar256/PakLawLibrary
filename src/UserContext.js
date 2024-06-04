import React, { createContext, useState, useEffect } from 'react';

// Create a new context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  // Initialize state with useState hook
  const [userData, setUserData] = useState({
    loggedIn: false,
    token: '',
  });

  // useEffect to load token from localStorage when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUserData({ loggedIn: true, token });
    }
  }, []);

  // Login function to update state and localStorage
  const login = (token) => {
    setUserData({ loggedIn: true, token });
    localStorage.setItem('token', token);
  };

  // Logout function to update state and localStorage
  const logout = () => {
    setUserData({ loggedIn: false, token: '' });
    localStorage.removeItem('token');
  };

  // Return the provider with the value containing userData, login, and logout
  return (
    <UserContext.Provider value={{ userData, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Export the context to use in other components
export default UserContext;
