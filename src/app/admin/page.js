"use client";
import React from "react";

export default function Admin() {

  const handleLogout = () => {
    // Remove token from cookie
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // Redirect to homepage or login page
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold mb-6">
          Hello admin. You are successfully logged in.
        </h1>
        <button
          onClick={handleLogout}
          className="mt-4 bg-red-600 text-white py-2 px-6 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
