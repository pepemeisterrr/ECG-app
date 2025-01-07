import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Исправленный путь

function RegistrationForm() {
  const { login, register, user, logout } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [message, setMessage] = useState('');

  const handleAuthSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage('Пожалуйста, заполните все поля.');
      return;
    }

    if (isLoginMode) {
      const success = await login(email, password);
      if (success) {
        setMessage("Вы успешно вошли");
      } else {
        setMessage("Неправильный email или пароль");
      }
    } else {
      if (!username) {
        setMessage('Пожалуйста, введите имя пользователя.');
        return;
      }
      await register(email, password, username);
      setMessage('Регистрация прошла успешно!');
    }
  };

  const toggleAuthMode = () => {
    setIsLoginMode(!isLoginMode);
    setMessage('');
  };

  if (user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-semibold mb-4 text-center">Привет, {user.username}!</h2>
          <p className="text-lg mb-4">Вы успешно вошли в систему.</p>
          <button onClick={logout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Выйти</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">{isLoginMode ? 'Вход' : 'Регистрация'}</h2>
        {message && <p className="mb-4 text-red-500">{message}</p>}
        <form onSubmit={handleAuthSubmit}>
          {!isLoginMode && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Имя пользователя
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Введите имя пользователя"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Введите email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Пароль
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              id="password"
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {isLoginMode ? 'Войти' : 'Зарегистрироваться'}
          </button>
          <button
            type="button"
            onClick={toggleAuthMode}
            className="text-blue-500 hover:text-blue-700 text-sm font-semibold focus:outline-none"
          >
            {isLoginMode ? 'Зарегистрироваться' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;