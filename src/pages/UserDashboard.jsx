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
          {
            headers: { Authorization: `Bearer ${token}` },
          }
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
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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

  if (loading) return <p className="p-4">Loading properties...</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Properties</h1>
        <button
          onClick={() => navigate("/add-property")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Property
        </button>
      </div>

      {properties.length === 0 ? (
        <p>No properties found. Add your first property!</p>
      ) : (
        <div className="flex flex-col gap-4">
          {properties.map((property) => (
            <div key={property.id} className="border p-4 rounded">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-bold text-lg">{property.title}</h2>
                  <p>Location: {property.location}</p>
                  <p>Price: {property.price}</p>
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
                <div className="flex gap-2 mt-2">
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
  );
};

export default UserDashboard;
