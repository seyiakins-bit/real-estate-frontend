// src/components/ContactForm.jsx
import React, { useState } from "react";

const ContactForm = ({ propertyTitle, propertyPrice, propertyLocation }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Build message including property details
    const message = `
📌 Property Inquiry
--------------------------
🏠 Property: ${propertyTitle}
💰 Price: ${propertyPrice}
📍 Location: ${propertyLocation}

👤 Name: ${formData.name}
📧 Email: ${formData.email}
📱 Phone: ${formData.phone}

📝 Message: ${formData.message}
    `;

    // ✅ Send to WhatsApp (replace number with your own)
    const whatsappUrl = `https://wa.me/2347039443290?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 space-y-4"
    >
      <h2 className="text-2xl font-semibold mb-2">Contact Agent</h2>

      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="tel"
        name="phone"
        placeholder="Your Phone"
        value={formData.phone}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <textarea
        name="message"
        placeholder="Your Message"
        value={formData.message}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        rows="4"
      ></textarea>

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
      >
        Send via WhatsApp
      </button>
    </form>
  );
};

export default ContactForm;
