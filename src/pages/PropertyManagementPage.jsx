// src/pages/PropertyManagementPage.jsx
import React, { useEffect, useState } from "react";
import { Edit, Trash2, PlusCircle, Save, X } from "lucide-react";

const PropertyManagementPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Editing state
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: "", price: "", location: "", image: "" });

  // Add new property
  const [newProperty, setNewProperty] = useState({ title: "", price: "", location: "", image: "" });

  // Fetch all properties
  useEffect(() => {
    const fetchProperties = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return alert("You must be logged in!");

      try {
        const res = await fetch("https://real-estate-backend-z8aa.onrender.com/api/properties", {
          headers: { Authorization: `Bearer ${token}` },
        });
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

  // Add property
  const handleAdd = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return alert("You must be logged in!");

    const { title, price, location, image } = newProperty;
    if (!title || !price || !location || !image) return alert("All fields are required");

    try {
      const ownerId = 1; // replace with actual logged-in user ID
      const res = await fetch("https://real-estate-backend-z8aa.onrender.com/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...newProperty, ownerId }),
      });
      const data = await res.json();
      if (res.ok) {
        setProperties((prev) => [...prev, data.property]);
        setNewProperty({ title: "", price: "", location: "", image: "" });
        alert("Property added successfully!");
      } else {
        alert(data.message || "Failed to add property");
      }
    } catch (error) {
      console.error("Error adding property:", error);
      alert("An error occurred while adding property");
    }
  };

  // Delete property
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;
    const token = localStorage.getItem("authToken");
    if (!token) return alert("You must be logged in!");

    try {
      const res = await fetch(`https://real-estate-backend-z8aa.onrender.com/api/properties/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setProperties((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  // Edit property
  const handleEdit = (property) => {
    setEditingId(property.id);
    setEditData({
      title: property.title,
      price: property.price,
      location: property.location,
      image: property.image,
    });
  };

  const handleUpdate = async (id) => {
    const token = localStorage.getItem("authToken");
    if (!token) return alert("You must be logged in!");

    const { title, price, location, image } = editData;
    if (!title || !price || !location || !image) return alert("All fields are required");

    try {
      const res = await fetch(`https://real-estate-backend-z8aa.onrender.com/api/properties/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(editData),
      });
      if (res.ok) {
        setProperties((prev) => prev.map((p) => (p.id === id ? { ...p, ...editData } : p)));
        setEditingId(null);
      }
    } catch (error) {
      console.error("Error updating property:", error);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading properties...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Property Management</h2>

      {/* Add New Property */}
      <div className="mb-6 bg-white p-4 rounded shadow">
        <h3 className="font-medium mb-2">Add New Property</h3>
        <div className="flex gap-2 flex-wrap">
          <input placeholder="Title" value={newProperty.title} onChange={(e) => setNewProperty({ ...newProperty, title: e.target.value })} className="border px-2 py-1 rounded"/>
          <input placeholder="Price" type="number" value={newProperty.price} onChange={(e) => setNewProperty({ ...newProperty, price: e.target.value })} className="border px-2 py-1 rounded"/>
          <input placeholder="Location" value={newProperty.location} onChange={(e) => setNewProperty({ ...newProperty, location: e.target.value })} className="border px-2 py-1 rounded"/>
          <input placeholder="Image URL" value={newProperty.image} onChange={(e) => setNewProperty({ ...newProperty, image: e.target.value })} className="border px-2 py-1 rounded"/>
          <button onClick={handleAdd} className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"><PlusCircle size={16}/> Add</button>
        </div>
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
            {properties.length > 0 ? properties.map((property) => (
              <tr key={property.id} className="border-b hover:bg-gray-50">
                <td className="p-3"><img src={editingId === property.id ? editData.image : property.image} alt={property.title} className="w-16 h-16 object-cover rounded"/>
                  {editingId === property.id && <input placeholder="Image URL" value={editData.image} onChange={(e)=>setEditData({...editData,image:e.target.value})} className="border px-1 py-0.5 rounded w-full mt-1"/>}
                </td>
                <td className="p-3">{editingId===property.id ? <input value={editData.title} onChange={(e)=>setEditData({...editData,title:e.target.value})} className="border px-1 py-0.5 rounded w-full"/> : property.title}</td>
                <td className="p-3">{editingId===property.id ? <input type="number" value={editData.price} onChange={(e)=>setEditData({...editData,price:e.target.value})} className="border px-1 py-0.5 rounded w-full"/> : `₦${property.price}`}</td>
                <td className="p-3">{editingId===property.id ? <input value={editData.location} onChange={(e)=>setEditData({...editData,location:e.target.value})} className="border px-1 py-0.5 rounded w-full"/> : property.location}</td>
                <td className="p-3 flex gap-2">
                  {editingId===property.id ? <>
                    <button onClick={()=>handleUpdate(property.id)} className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"><Save size={16}/> Save</button>
                    <button onClick={()=>setEditingId(null)} className="flex items-center gap-1 bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"><X size={16}/> Cancel</button>
                  </> : <>
                    <button onClick={()=>handleEdit(property)} className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"><Edit size={16}/> Edit</button>
                    <button onClick={()=>handleDelete(property.id)} className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"><Trash2 size={16}/> Delete</button>
                  </>}
                </td>
              </tr>
            )) : <tr><td colSpan="5" className="text-center p-5 text-gray-500">No properties found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PropertyManagementPage;
