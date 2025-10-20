import React from "react";
import { LogOut } from "lucide-react";

const TopBar = ({ adminName = "Admin", onLogout }) => {
  return (
    <header className="flex justify-between items-center bg-white shadow-sm p-4 border-b border-gray-100">
      <h1 className="text-xl font-semibold text-gray-800">
        Welcome, <span className="text-blue-600">{adminName}</span>
      </h1>
      <button
        onClick={onLogout}
        className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
        <LogOut size={18} />
        Logout
      </button>
    </header>
  );
};

export default TopBar;
