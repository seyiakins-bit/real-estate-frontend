import { useState } from "react";
import { Link } from "react-router-dom";
import ImageUploader from "../components/ImageUploader";

const initialProperties = [
  { id: 1, title: "Luxury Apartment", location: "Lagos", price: "₦50,000,000", owner: "Seyi", images: [] },
  { id: 2, title: "Beach House", location: "Lekki", price: "₦120,000,000", owner: "Tunde", images: [] },
];

const AdminDashboard = () => {
  const [properties, setProperties] = useState(initialProperties);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      setProperties(properties.filter((property) => property.id !== id));
    }
  };

  const handleImageUpload = (id, url) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, images: [...p.images, url] } : p))
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">All Properties</h2>
          <Link
            to="/add-property"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add New Property
          </Link>
        </div>

        {properties.length === 0 ? (
          <p>No properties found.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {properties.map((property) => (
              <div
                key={property.id}
                className="border p-4 rounded"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-lg">{property.title}</h3>
                    <p>Location: {property.location}</p>
                    <p>Price: {property.price}</p>
                    <p>Owner: {property.owner}</p>
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

                {/* Image Uploader */}
                <ImageUploader
                  onUpload={(url) => handleImageUpload(property.id, url)}
                />
                <div className="flex gap-2 mt-2">
                  {property.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt="Property"
                      className="w-24 h-24 object-cover rounded"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
