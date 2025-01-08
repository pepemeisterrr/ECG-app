import React, { useState } from "react";
import { invoke } from '@tauri-apps/api/core';

export default function Login() {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await invoke("login_user", { data: formData });
            setMessage(response);
        } catch (error) {
            setMessage("Login failed.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
                {["username", "password"].map((field) => (
                    <div key={field} className="mb-4">
                        <label className="block mb-2">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                        <input
                            type={field === "password" ? "password" : "text"}
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:ring-blue-500"
                            required
                        />
                    </div>
                ))}
                <button type="submit" className="w-full p-2 bg-blue-600 rounded-md hover:bg-blue-700">Login</button>
            </form>
            {message && <p className="mt-4 text-green-400">{message}</p>}
        </div>
    );
}
