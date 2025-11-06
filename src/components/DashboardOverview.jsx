// src/components/DashboardOverview.jsx
import React from "react";
import DashboardCard from "./DashboardCard";
import AnalyticsChart from "./AnalyticsChart";

const DashboardOverview = ({ properties, users, inquiries = [], revenue = 0 }) => {
  // Compute KPIs
  const totalProperties = properties.length;
  const activeListings = properties.filter(p => p.status === "active").length;
  const soldOrRented = properties.filter(p => p.status !== "active").length;
  const totalUsers = users.length;
  const totalInquiries = inquiries.length;

  // Demo chart data
  const listingsOverTime = properties.map(p => ({
    name: p.title,
    count: Math.floor(Math.random() * 10) + 1,
  }));

  const userGrowth = users.map(u => ({
    name: u.name,
    count: Math.floor(Math.random() * 5) + 1,
  }));

  const inquiriesPerWeek = inquiries.map((i, index) => ({
    name: `Week ${index + 1}`,
    count: Math.floor(Math.random() * 5) + 1,
  }));

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard title="Total Properties" value={totalProperties} icon="🏠" />
        <DashboardCard title="Active Listings" value={activeListings} icon="📌" />
        <DashboardCard title="Sold / Rented" value={soldOrRented} icon="✅" />
        <DashboardCard title="Total Users" value={totalUsers} icon="👤" />
        <DashboardCard title="Total Inquiries" value={totalInquiries} icon="✉️" />
        <DashboardCard title="Revenue" value={`$${revenue}`} icon="💰" />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <AnalyticsChart title="Listings Over Time" data={listingsOverTime} />
        <AnalyticsChart title="User Growth" data={userGrowth} />
        <AnalyticsChart title="Inquiries / Week" data={inquiriesPerWeek} />
      </div>
    </div>
  );
};

export default DashboardOverview;
