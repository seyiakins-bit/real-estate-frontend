import React, { useState } from "react";
import axios from "axios";

const AddPropertyPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    ownerId: 1, // you can get this from logged-in user
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("location", formData.location);
      data.append("ownerId", formData.ownerId);

      if (imageFile) data.append("image", imageFile);

      const response = await axios.post(
        "https://real-estate-backend-z8aa.onrender.com/api/properties",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Property added:", response.data);
      alert("Property added successfully!");
      setFormData({ title: "", description: "", price: "", location: "", ownerId: 1 });
      setImageFile(null);
    } catch (error) {
      console.error("Error adding property:", error.response?.data || error.message);
      alert("Failed to add property. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        required
      />
      <input type="file" onChange={handleFileChange} />
      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Property"}
      </button>
    </form>
  );
};

export default AddPropertyPage;
