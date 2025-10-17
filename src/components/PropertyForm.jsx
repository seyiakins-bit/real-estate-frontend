import { useState } from "react";

const PropertyForm = ({ initialData = {}, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    location: initialData.location || "",
    price: initialData.price || "",
    bedrooms: initialData.bedrooms || "",
    bathrooms: initialData.bathrooms || "",
    image: initialData.image || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Property form submitted:", formData);
    if (onSubmit) onSubmit(formData);
    // TODO: send data to backend API
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        name="title"
        placeholder="Property Title"
        value={formData.title}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />
      <input
        type="number"
        name="bedrooms"
        placeholder="Number of Bedrooms"
        value={formData.bedrooms}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="number"
        name="bathrooms"
        placeholder="Number of Bathrooms"
        value={formData.bathrooms}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={formData.image}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit Property
      </button>
    </form>
  );
};

export default PropertyForm;
