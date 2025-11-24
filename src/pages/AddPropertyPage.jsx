import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddPropertyPage() {
  const userData = JSON.parse(localStorage.getItem("userData")) || {};
  const isAdmin = userData.role === "ADMIN"; // detect admin
  const ownerId = isAdmin ? userData.id : userData.id || 1;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    image: "",
    ownerId
  });
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setFile(e.target.files[0]);

  const uploadImage = async () => {
    if (!file) return null;
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "real-estate");
    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dlu8e511s/image/upload", {
        method: "POST",
        body: data
      });
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

    // Include isAdmin flag for admin creation
    const finalData = {
      ...formData,
      image: imageUrl,
      images: [imageUrl],
      isAdmin: isAdmin
    };

    try {
      const token = localStorage.getItem("authToken");
      const headers = { "Content-Type": "application/json" };
      if (!isAdmin && token) headers.Authorization = `Bearer ${token}`;

      const res = await fetch("https://real-estate-backend-z8aa.onrender.com/api/properties", {
        method: "POST",
        headers,
        body: JSON.stringify(finalData)
      });

      const data = await res.json();

      if (res.ok) {
        alert(`✅ Property "${formData.title}" added successfully!`);
        navigate("/"); // go back to dashboard
      } else {
        alert(data.message || "Failed to add property");
        console.error("Error adding property:", data);
      }
    } catch (error) {
      console.error("Error submitting property:", error);
      alert("An error occurred while adding property");
    }
  };

  return (
    <div className="pt-20 p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Property</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required className="w-full border p-2 rounded"/>
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="w-full border p-2 rounded"/>
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required className="w-full border p-2 rounded"/>
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required className="w-full border p-2 rounded"/>
        <input type="text" name="image" placeholder="Paste Cloudinary Image URL" value={formData.image} onChange={handleChange} className="w-full border p-2 rounded"/>
        <input type="file" accept="image/*" onChange={handleFileChange} className="w-full"/>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Property</button>
      </form>
    </div>
  );
}

export default AddPropertyPage;
