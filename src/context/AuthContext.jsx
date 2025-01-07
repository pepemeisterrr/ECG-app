import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // При загрузке приложения проверяем, есть ли сохраненный пользователь в localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email, password) => {
    const { invoke } = window.__TAURI__.tauri;
    try {
      const usersData = await invoke('read_file', { filePath: 'data/users.json' });
      const users = JSON.parse(usersData);
      const matchedUser = users.find(user => user.email === email && user.password === password);

      if (matchedUser) {
        setUser(matchedUser);
        localStorage.setItem('user', JSON.stringify(matchedUser)); // Сохраняем пользователя в localStorage
        return true;
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const register = async (email, password, username) => {
    const { invoke } = window.__TAURI__.tauri;
    try {
      const usersData = await invoke('read_file', { filePath: 'data/users.json' });
      const users = usersData ? JSON.parse(usersData) : [];
      
      if (users.find(user => user.email === email)) {
        throw new Error('User already exists');
      }

      const newUser = { email, password, username };
      users.push(newUser);
      await invoke('write_file', { filePath: 'data/users.json', contents: JSON.stringify(users) });

      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser)); // Сохраняем нового пользователя в localStorage
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Удаляем пользователя из localStorage при выходе
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);