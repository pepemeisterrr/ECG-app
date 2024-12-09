import { useState } from "react";
import { useAuth } from "../AuthContext";

export function LoginForm({ onClose }) {
  const { login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await register(email, password);
      } else {
        await login(email, password);
      }
      onClose(); // Закрыть форму после успешного действия
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-md w-80">
      <h2 className="text-lg font-bold mb-4">
        {isRegister ? "Register" : "Login"}
      </h2>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          {isRegister ? "Register" : "Login"}
        </button>
      </form>
      <button
        onClick={() => setIsRegister(!isRegister)}
        className="mt-4 text-sm text-blue-500 hover:underline"
      >
        {isRegister ? "Already have an account? Login" : "Need an account? Register"}
      </button>
      <button
        onClick={onClose}
        className="mt-2 text-sm text-gray-500 hover:underline"
      >
        Cancel
      </button>
    </div>
  );
}
