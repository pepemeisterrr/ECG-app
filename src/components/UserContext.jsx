import React, { createContext, useState, useContext } from 'react';

// Create Context for User Information
const UserContext = createContext();

// Custom Hook to Use the UserContext
export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    username: 'Guest', // Default to 'Guest' when no user is logged in
    email: 'guest@example.com', // Default email for guest
  });

  const login = (username, email) => {
    setUser({ username, email });
  };

  const logout = () => {
    setUser({ username: 'Guest', email: 'guest@example.com' });
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
