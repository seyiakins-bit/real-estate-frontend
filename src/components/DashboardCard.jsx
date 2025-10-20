// src/components/DashboardCard.jsx
import React from "react";

const DashboardCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-gray-500 font-medium">{title}</h4>
          <h2 className="text-2xl font-bold text-gray-800 mt-1">{value}</h2>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  );
};

export default DashboardCard;
