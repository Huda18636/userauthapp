"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"
export default function RegisterView() {
   const router = useRouter();
  const [activeTab, setActiveTab] = useState("login");
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
const [loading, setLoading] = useState(false);

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registerData),
    });

    const data = await res.json();

    if (data.success) {
      alert("Registration successful!");
      setRegisterData({ name: '', email: '', password: '' });
      setActiveTab('login');
    } else {
      alert(`Registration failed: ${data.message}`);
    }
  } catch (error) {
    console.error('Register submit error:', error);
    alert("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};

const handleLoginSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData),
    });

    const data = await res.json();

    if (data.success) {
      document.cookie = `token=${data.token}; path=/`;
      router.push("Views/dashboard");
    } else {
      alert(`Login failed: ${data.message}`);
    }
  } catch (error) {
    console.error('Login submit error:', error);
    alert("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="flex border-b">
          <button
            className={`flex-1 py-3 text-center font-semibold ${
              activeTab === "login"
                ? "border-b-4 border-indigo-600 text-indigo-600"
                : "text-gray-600 hover:text-indigo-600"
            }`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`flex-1 py-3 text-center font-semibold ${
              activeTab === "register"
                ? "border-b-4 border-indigo-600 text-indigo-600"
                : "text-gray-600 hover:text-indigo-600"
            }`}
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>
        </div>

        <div className="p-6">
          {activeTab === "login" && (
            <form onSubmit={handleLoginSubmit} className="space-y-5">
              <div>
                <label htmlFor="loginEmail" className="block text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="loginEmail"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="loginPassword" className="block text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="loginPassword"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

             <button
  type="submit"
  className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
  disabled={loading}
>
  {loading ? "Logging in..." : "Login"}
</button>

            </form>
          )}

          {activeTab === "register" && (
            <form onSubmit={handleRegisterSubmit} className="space-y-5">
              <div>
                <label htmlFor="registerName" className="block text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="registerName"
                  name="name"
                  value={registerData.name}
                  onChange={handleRegisterChange}
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="registerEmail" className="block text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="registerEmail"
                  name="email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="registerPassword" className="block text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="registerPassword"
                  name="password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
  type="submit"
  className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
  disabled={loading}
>
  {loading ? (
    <span className="flex items-center justify-center gap-2">
      <svg
        className="animate-spin h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      Registering...
    </span>
  ) : (
    "Register"
  )}
</button>

            </form>
          )}
        </div>
      </div>
    </div>
  );
}
