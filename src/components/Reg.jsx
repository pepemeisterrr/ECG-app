import React, { useState } from 'react';

// Имитация базы данных пользователей
const usersData = [
  { email: 'test@example.com', password: 'password123', username: "Test User" },
  { email: 'user@example.com', password: 'securepass', username: "User" },
];

function RegistrationForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginMode, setIsLoginMode] = useState(false); // Используется для переключения режима регистрации/входа
    const [message, setMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState('');


    const handleAuthSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setMessage('Пожалуйста, заполните все поля.');
            return;
        }

        if (isLoginMode) {
            // Логика для входа
             const user = usersData.find(user => user.email === email && user.password === password);

             if(user) {
                setMessage("Вы успешно вошли");
                setIsLoggedIn(true);
                setLoggedInUser(user.username);
                setEmail('');
                setPassword('');
             } else {
                setMessage("Неправильный email или пароль");
             }
        } else {
            // Логика для регистрации
            const isExistingUser = usersData.some(user => user.email === email);
            if(isExistingUser){
                setMessage("Пользователь с таким email уже существует")
            }
             else if (!username) {
                setMessage('Пожалуйста, введите имя пользователя.');
                return;
              }
            else {
                // Имитация успешной регистрации
                usersData.push({email, password, username});
                setMessage('Регистрация прошла успешно!');
                setUsername('');
                setEmail('');
                setPassword('');
            }
        }
    };


    const toggleAuthMode = () => {
        setIsLoginMode(!isLoginMode);
        setMessage('');
    };


    const handleLogout = () => {
      setIsLoggedIn(false);
      setLoggedInUser('');
    };


    if (isLoggedIn) {
      return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <div className="bg-white p-8 rounded shadow-md w-96">
            <h2 className="text-2xl font-semibold mb-4 text-center">Привет, {loggedInUser}!</h2>
            <p className="text-lg mb-4">Вы успешно вошли в систему.</p>
            <button onClick={handleLogout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Выйти</button>
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
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none justify-between"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                /> <br/>
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
            </div>
          </form>
        </div>
      </div>
  );
}


function App() {
    return <RegistrationForm/>
}


export default App;