import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ImageUploader from "../components/ImageUploader";

const AdminDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Load all properties when dashboard mounts
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await fetch("https://real-estate-backend-z8aa.onrender.com/api/properties", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        // ✅ Safety check: ensure we got an array
        if (!Array.isArray(data)) {
          console.error("Expected array, got:", data);
          setProperties([]);
        } else {
          setProperties(data);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [navigate]);

  // ✅ Delete property
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;

    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(`https://real-estate-backend-z8aa.onrender.com/api/properties/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setProperties(properties.filter((p) => p.id !== id));
        alert("Property deleted successfully");
      } else {
        const err = await res.json();
        alert(err.message || "Failed to delete property");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("An error occurred while deleting.");
    }
  };

  // ✅ Handle image uploads per property
  const handleImageUpload = (id, url) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, images: [...(p.images || []), url] } : p))
    );
  };

  if (loading) {
    return <p className="text-center mt-10 text-lg">Loading properties...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
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
        <div className="flex flex-col gap-4">
          {properties.map((property) => (
            <div key={property.id} className="border p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-xl">{property.title}</h3>
                  <p>📍 {property.location}</p>
                  <p>💰 {property.price}</p>
                  <p>🏠 Owner: {property.owner?.name || "N/A"}</p> {/* ✅ Safe owner display */}
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

export default AdminDashboard;
