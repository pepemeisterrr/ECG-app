import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null, если пользователь не авторизован.

  const login = async (email, password) => {
    // Пример загрузки данных пользователей из файла через Tauri.
    const { invoke } = window.__TAURI__.tauri;
    try {
      const usersData = await invoke('read_file', { filePath: 'users.json' });
      const users = JSON.parse(usersData);
      const matchedUser = users.find(user => user.email === email && user.password === password);

      if (matchedUser) {
        setUser(matchedUser);
        return true;
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const register = async (email, password) => {
    const { invoke } = window.__TAURI__.tauri;
    try {
      const usersData = await invoke('read_file', { filePath: 'users.json' });
      const users = usersData ? JSON.parse(usersData) : [];
      
      if (users.find(user => user.email === email)) {
        throw new Error('User already exists');
      }

      const newUser = { email, password };
      users.push(newUser);
      await invoke('write_file', { filePath: 'users.json', contents: JSON.stringify(users) });

      setUser(newUser);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
