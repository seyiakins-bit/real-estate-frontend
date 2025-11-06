// src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import DashboardCard from "../components/DashboardCard";
import AnalyticsChart from "../components/AnalyticsChart";
import UserManagement from "../components/UserManagement";
import InquiriesMessages from "../components/InquiriesMessages";
import AddPropertyPage from "./AddPropertyPage";
import EditPropertyPage from "./EditPropertyPage";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [properties, setProperties] = useState([]);
  const [users, setUsers] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) return;

        const [propRes, userRes, inquiryRes] = await Promise.all([
          fetch("https://real-estate-backend-z8aa.onrender.com/api/properties", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("https://real-estate-backend-z8aa.onrender.com/api/users", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("https://real-estate-backend-z8aa.onrender.com/api/inquiries", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const [propData, userData, inquiryData] = await Promise.all([
          propRes.json(),
          userRes.json(),
          inquiryRes.json(),
        ]);

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

  // Delete property handler
  const handleDeleteProperty = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(
        `https://real-estate-backend-z8aa.onrender.com/api/properties/${id}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.ok) {
        setProperties(properties.filter((p) => p._id !== id));
        alert("Property deleted successfully!");
      } else {
        const data = await res.json();
        console.error("Error deleting property:", data);
      }
    } catch (err) {
      console.error(err);
    }
  };

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

        {/* Dashboard Overview */}
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

        {/* Add Property */}
        {activeTab === "add-property" && <AddPropertyPage />}

        {/* Property Management (Edit/Delete) */}
        {activeTab === "property-management" && (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Property Management</h2>
            <div className="space-y-2">
              {properties.map((property) => (
                <div
                  key={property._id}
                  className="border p-3 rounded flex justify-between items-center bg-white shadow-sm"
                >
                  <div>
                    <p className="font-semibold">{property.title}</p>
                    <p className="text-sm text-gray-600">{property.location}</p>
                    <p className="text-sm text-gray-600">Price: ${property.price}</p>
                    <p className="text-sm text-gray-600">Status: {property.status}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
                      onClick={() => navigate(`/admin/edit-property/${property._id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => handleDeleteProperty(property._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* User Management */}
        {activeTab === "user-management" && <UserManagement users={users} />}

        {/* Inquiries & Messages */}
        {activeTab === "inquiries" && <InquiriesMessages inquiries={inquiries} />}
      </div>
    </div>
  );
};

export default AdminDashboard;
