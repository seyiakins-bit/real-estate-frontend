// src/pages/PropertyManagementPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Trash2, PlusCircle } from "lucide-react";

const PropertyManagementPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch all properties
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await fetch(
          "https://real-estate-backend-z8aa.onrender.com/api/properties",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  // Delete property
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;

    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(
        `https://real-estate-backend-z8aa.onrender.com/api/properties/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        setProperties((prev) => prev.filter((p) => p.id !== id));
        alert("✅ Property deleted successfully!");
      } else {
        alert("❌ Failed to delete property");
      }
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading properties...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Property Management</h2>
        <button
          onClick={() => navigate("/add-property")}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          <PlusCircle size={20} /> Add Property
        </button>
      </div>

      {/* Property Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.length > 0 ? (
              properties.map((property) => (
                <tr key={property.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="p-3 font-medium">{property.title}</td>
                  <td className="p-3">₦{property.price}</td>
                  <td className="p-3">{property.location}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => navigate(`/edit-property/${property.id}`)}
                      className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      <Edit size={16} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(property.id)}
                      className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-5 text-gray-500">
                  No properties found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PropertyManagementPage;
