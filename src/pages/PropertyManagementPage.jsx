// src/pages/PropertyManagementPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PropertyManagementPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await fetch("https://real-estate-backend-z8aa.onrender.com/api/properties", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setProperties(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const handleDeleteProperty = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(
        `https://real-estate-backend-z8aa.onrender.com/api/properties/${id}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.ok) setProperties(properties.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading properties...</p>;

  return (
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
                onClick={() => navigate(`/edit-property/${property._id}`)}
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
  );
};

export default PropertyManagementPage;
