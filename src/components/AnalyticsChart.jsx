import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AnalyticsChart = () => {
  // Demo data (you can replace this later with live stats)
  const data = [
    { name: "Jan", views: 400 },
    { name: "Feb", views: 800 },
    { name: "Mar", views: 600 },
    { name: "Apr", views: 1000 },
    { name: "May", views: 750 },
    { name: "Jun", views: 1200 },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Property Views (Last 6 Months)
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="views" stroke="#3B82F6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsChart;
