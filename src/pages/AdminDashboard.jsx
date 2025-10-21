// src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import ImageUploader from "../components/ImageUploader";
import DashboardCard from "../components/DashboardCard";
import AnalyticsChart from "../components/AnalyticsChart";

const AdminDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return navigate("/login");

      // Fetch properties
      const propRes = await fetch("https://real-estate-backend-z8aa.onrender.com/api/properties", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const propData = await propRes.json();
      setProperties(Array.isArray(propData) ? propData : []);

      // Fetch users
      const userRes = await fetch("https://real-estate-backend-z8aa.onrender.com/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userData = await userRes.json();
      setUsers(Array.isArray(userData) ? userData : []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteProperty = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(`https://real-estate-backend-z8aa.onrender.com/api/properties/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setProperties((prev) => prev.filter((p) => p.id !== id));
      else alert("Failed to delete property");
    } catch (error) {
      console.error(error);
      alert("Error deleting property");
    }
  };

  const handleImageUpload = (id, url) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, images: [...(p.images || []), url] } : p))
    );
  };

  // Demo chart data
  const chartData = properties.map((p) => ({ name: p.title, views: Math.floor(Math.random() * 100) }));

  if (loading)
    return <p className="text-center mt-10 text-lg">Loading dashboard data...</p>;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-auto md:ml-64">
        <TopBar />

        {/* Dashboard Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
          <DashboardCard title="Total Properties" value={properties.length} icon="🏠" />
          <DashboardCard title="Active Listings" value={properties.filter(p => p.status === "active").length} icon="📌" />
          <DashboardCard title="Total Users" value={users.length} icon="👤" />
          <DashboardCard title="New Inquiries" value={25} icon="✉️" />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-6">
          <AnalyticsChart title="Property Views" data={chartData} />
          <AnalyticsChart title="Sales / Lease Trends" data={chartData} />
        </div>

        {/* Property Management */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Manage Properties</h2>
            <Link
              to="/add-property"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              + Add Property
            </Link>
          </div>

          {properties.length === 0 ? (
            <p>No properties found.</p>
          ) : (
            <div className="space-y-4">
              {properties.map((property) => (
                <div key={property.id} className="border p-4 rounded-lg bg-white shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{property.title}</h3>
                      <p className="text-sm text-gray-600">📍 {property.location}</p>
                      <p className="text-sm text-gray-600">💰 {property.price}</p>
                      <p className="text-sm text-gray-600">🧑 Owner: {property.owner?.name || "N/A"}</p>
                      <p className="text-sm text-gray-600">Status: {property.status || "Active"}</p>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        to={`/edit-property/${property.id}`}
                        className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteProperty(property.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Image Upload & Preview */}
                  <div className="mt-3">
                    <ImageUploader onUpload={(url) => handleImageUpload(property.id, url)} />
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {property.images?.map((img, i) => (
                        <img key={i} src={img} alt="Property" className="w-24 h-24 object-cover rounded" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User Management */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">User Management</h2>
          {users.length === 0 ? (
            <p>No users found.</p>
          ) : (
            <div className="space-y-2">
              {users.map((user) => (
                <div key={user.id} className="border p-3 rounded flex justify-between items-center bg-white shadow-sm">
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <p className="text-sm text-gray-600">Role: {user.role}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500">Edit</button>
                    <button className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">Ban</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Placeholders for Inquiries, Transactions, Reports */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          <div className="border p-4 rounded shadow-sm">
            <h2 className="font-bold text-xl mb-2">Inquiries & Messages</h2>
            <p>Coming soon: Track and respond to user inquiries.</p>
          </div>
          <div className="border p-4 rounded shadow-sm">
            <h2 className="font-bold text-xl mb-2">Transactions / Payments</h2>
            <p>Coming soon: View payment history and revenue stats.</p>
          </div>
          <div className="border p-4 rounded shadow-sm">
            <h2 className="font-bold text-xl mb-2">Reports & Analytics</h2>
            <p>Coming soon: Generate reports and export data.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
