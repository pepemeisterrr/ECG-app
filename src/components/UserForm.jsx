import { invoke } from '@tauri-apps/api/core';
import React, { useState } from "react";
import { useUser } from "./UserContext";

function UserForm() {
  const { login, user } = useUser();  // Get login function from context
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState("");

  const toggleForm = () => setIsLogin(!isLogin);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    if (!isLogin && e.target.username) {
      formData.username = e.target.username.value;
    }

    try {
      if (isLogin) {
        const response = await invoke("login_user", { data: formData });
        const name = response.split("Welcome, ")[1]?.split("!")[0];
        login(name, formData.email); // Update user context on login
      } else {
        const response = await invoke("save_registration", { data: formData });
        alert("Registration successful!");
      }
    } catch (error) {
      alert("Error: " + error);
    }
  };

  if (user.username !== 'Guest') {
    // If the user is logged in, show the welcome message
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
        <h1 className="text-3xl font-bold mb-4">Welcome, {user.username}!</h1>
        <button onClick={() => login('Guest', '')} className="p-2 bg-red-600 rounded-lg">
          Log Out
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-4">{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            name="email"
            className="w-full p-2 rounded-md bg-gray-700 text-white"
            required
          />
        </div>

        {!isLogin && (
          <div className="mb-4">
            <label className="block mb-2">Username</label>
            <input
              type="text"
              name="username"
              className="w-full p-2 rounded-md bg-gray-700 text-white"
              required
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <input
            type="password"
            name="password"
            className="w-full p-2 rounded-md bg-gray-700 text-white"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 rounded-md hover:bg-blue-700"
        >
          {isLogin ? "Login" : "Register"}
        </button>
      </form>
      <button onClick={toggleForm} className="mt-4 text-blue-400 hover:underline">
        {isLogin ? "Need to register?" : "Already have an account? Login here"}
      </button>
    </div>
  );
}

export default UserForm;
