import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import DashboardCard from "../components/DashboardCard";
import AnalyticsChart from "../components/AnalyticsChart";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [properties, setProperties] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) return;

        const propRes = await fetch("https://real-estate-backend-z8aa.onrender.com/api/properties", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userRes = await fetch("https://real-estate-backend-z8aa.onrender.com/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const propData = await propRes.json();
        const userData = await userRes.json();

        setProperties(Array.isArray(propData) ? propData : []);
        setUsers(Array.isArray(userData) ? userData : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  const chartData = properties.map((p) => ({ name: p.title, views: Math.floor(Math.random() * 100) }));

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
              <DashboardCard title="Active Listings" value={properties.filter(p => p.status === "active").length} icon="📌" />
              <DashboardCard title="Total Users" value={users.length} icon="👤" />
              <DashboardCard title="New Inquiries" value={25} icon="✉️" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
              <AnalyticsChart title="Property Views" data={chartData} />
              <AnalyticsChart title="Sales / Lease Trends" data={chartData} />
            </div>
          </div>
        )}

        {activeTab === "add-property" && <div className="p-6">Add Property Form will go here</div>}
        {activeTab === "user-management" && <div className="p-6">User Management table goes here</div>}
        {activeTab === "inquiries" && <div className="p-6">Inquiries & Messages table goes here</div>}
      </div>
    </div>
  );
};

export default AdminDashboard;
