// src/pages/UserDashboard.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ImageUploader from "../components/ImageUploader";

const UserDashboard = ({ token, userData }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user's properties from backend
  useEffect(() => {
    const fetchProperties = async () => {
      if (!token || !userData) return;
      try {
        const res = await fetch(
          `https://real-estate-backend-z8aa.onrender.com/properties/user/${userData.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await res.json();
        setProperties(data);
      } catch (err) {
        console.error("Failed to fetch properties:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [token, userData]);

  // Delete property
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;
    try {
      await fetch(`https://real-estate-backend-z8aa.onrender.com/properties/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setProperties(properties.filter((property) => property.id !== id));
    } catch (err) {
      console.error("Failed to delete property:", err);
    }
  };

  // Upload image for property
  const handleImageUpload = async (id, url) => {
    try {
      const res = await fetch(`https://real-estate-backend-z8aa.onrender.com/properties/${id}/images`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ url }),
      });
      if (res.ok) {
        setProperties((prev) =>
          prev.map((p) => (p.id === id ? { ...p, images: [...p.images, url] } : p))
        );
      }
    } catch (err) {
      console.error("Failed to upload image:", err);
    }
  };

  if (loading) return <p className="p-4">Loading dashboard...</p>;

  return (
    <div className="container mx-auto p-4">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {userData?.name}!</h1>
          <p className="text-gray-600">Here’s what’s happening with your account today.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
            {/* Placeholder for profile picture */}
            {userData?.name?.charAt(0)}
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <button
          onClick={() => navigate("/add-property")}
          className="bg-green-600 text-white p-4 rounded hover:bg-green-700 transition"
        >
          Add Property
        </button>
        <button className="bg-yellow-500 text-white p-4 rounded hover:bg-yellow-600 transition">
          Search Properties
        </button>
        <button className="bg-purple-600 text-white p-4 rounded hover:bg-purple-700 transition">
          Contact Agent
        </button>
        <button className="bg-indigo-600 text-white p-4 rounded hover:bg-indigo-700 transition">
          Schedule Visit
        </button>
      </div>

      {/* Property Management */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">My Properties</h2>
        {properties.length === 0 ? (
          <p>No properties found. Add your first property!</p>
        ) : (
          <div className="flex flex-col gap-4">
            {properties.map((property) => (
              <div key={property.id} className="border p-4 rounded shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-lg">{property.title}</h3>
                    <p>Location: {property.location}</p>
                    <p>Price: {property.price}</p>
                    <p>Status: {property.status || "Active"}</p>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      to={`/edit-property/${property.id}`}
                      className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(property.id)}
                      className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Image uploader for each property */}
                <div className="mt-3">
                  <ImageUploader onUpload={(url) => handleImageUpload(property.id, url)} />
                  <div className="flex gap-2 mt-2 overflow-x-auto">
                    {property.images?.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt="Property"
                        className="w-24 h-24 object-cover rounded"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Placeholders for other dashboard sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Inquiries & Communication */}
        <div className="border p-4 rounded shadow-sm">
          <h2 className="font-bold text-xl mb-2">Inquiries & Messages</h2>
          <p>Coming soon: Manage inquiries from agents or buyers/renters.</p>
        </div>

        {/* Transactions & Bookings */}
        <div className="border p-4 rounded shadow-sm">
          <h2 className="font-bold text-xl mb-2">Transactions & Bookings</h2>
          <p>Coming soon: View payment history and schedule visits.</p>
        </div>

        {/* Account & Settings */}
        <div className="border p-4 rounded shadow-sm">
          <h2 className="font-bold text-xl mb-2">Account & Settings</h2>
          <p>Coming soon: Update profile, security settings, and preferences.</p>
        </div>

        {/* Analytics & Activity */}
        <div className="border p-4 rounded shadow-sm">
          <h2 className="font-bold text-xl mb-2">Analytics & Activity</h2>
          <p>Coming soon: Dashboard charts and property performance metrics.</p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
