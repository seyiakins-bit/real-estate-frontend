import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditPropertyPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    image: "",
  });
  const [file, setFile] = useState(null);

  // Fetch property data
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/properties/${id}`);
        const data = await res.json();
        setFormData(data);
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    };
    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadImage = async () => {
    if (!file) return null;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "real-estate"); // your preset name

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dlu8e511s/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const result = await res.json();
      return result.secure_url;
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = formData.image;

    if (file) {
      const uploadedUrl = await uploadImage();
      if (uploadedUrl) imageUrl = uploadedUrl;
    }

    const finalData = { ...formData, image: imageUrl };

    try {
      const res = await fetch(`http://localhost:5000/api/properties/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      if (res.ok) {
        alert(`✅ Property "${formData.title}" updated successfully!`);
        navigate(`/property/${id}`);
      } else {
        alert("❌ Failed to update property");
      }
    } catch (error) {
      console.error("Error updating property:", error);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Property</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        {/* Image URL input */}
        <input
          type="text"
          name="image"
          placeholder="Paste Cloudinary Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* File upload input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Update Property
        </button>
      </form>
    </div>
  );
}

export default EditPropertyPage;
