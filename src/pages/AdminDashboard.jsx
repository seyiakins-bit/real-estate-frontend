// src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import DashboardCard from "../components/DashboardCard";
import AnalyticsChart from "../components/AnalyticsChart";
import UserManagement from "../components/UserManagement";
import InquiriesMessages from "../components/InquiriesMessages";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [properties, setProperties] = useState([]);
  const [users, setUsers] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) return;

        // Fetch properties
        const propRes = await fetch(
          "https://real-estate-backend-z8aa.onrender.com/api/properties",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const propData = await propRes.json();

        // Fetch users
        const userRes = await fetch(
          "https://real-estate-backend-z8aa.onrender.com/api/users",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const userData = await userRes.json();

        // Fetch inquiries/messages
        const inquiryRes = await fetch(
          "https://real-estate-backend-z8aa.onrender.com/api/inquiries",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const inquiryData = await inquiryRes.json();

        setProperties(Array.isArray(propData) ? propData : []);
        setUsers(Array.isArray(userData) ? userData : []);
        setInquiries(Array.isArray(inquiryData) ? inquiryData : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  const chartData = properties.map((p) => ({
    name: p.title,
    views: Math.floor(Math.random() * 100),
  }));

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        properties={properties}
        setProperties={setProperties}
        users={users}
        setUsers={setUsers}
      />

      <div className="flex-1 flex flex-col overflow-auto md:ml-64">
        <TopBar />

        {activeTab === "dashboard" && (
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <DashboardCard title="Total Properties" value={properties.length} icon="🏠" />
              <DashboardCard
                title="Active Listings"
                value={properties.filter((p) => p.status === "active").length}
                icon="📌"
              />
              <DashboardCard title="Total Users" value={users.length} icon="👤" />
              <DashboardCard title="New Inquiries" value={inquiries.length} icon="✉️" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
              <AnalyticsChart title="Property Views" data={chartData} />
              <AnalyticsChart title="Sales / Lease Trends" data={chartData} />
            </div>
          </div>
        )}

        {activeTab === "add-property" && (
          <div className="p-6">Add Property Form will go here</div>
        )}

        {activeTab === "user-management" && <UserManagement users={users} />}

        {activeTab === "inquiries" && <InquiriesMessages inquiries={inquiries} />}
      </div>
    </div>
  );
};

export default AdminDashboard;
