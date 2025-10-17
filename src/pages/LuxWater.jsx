// src/pages/LuxWater.jsx
import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function LuxWater() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const whatsappNumber = "+2347039443290"; // Your WhatsApp number

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setErrorMsg("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setSuccessMsg("Your message has been sent successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });

        // Open WhatsApp with pre-filled message
        const whatsappMessage = encodeURIComponent(
          `Hello, my name is ${formData.name}. ${formData.message} Contact me at ${formData.phone} or ${formData.email}`
        );
        window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, "_blank");
      } else {
        setErrorMsg("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Array of Cloudinary images
  const cloudinaryImages = [
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1758719768/0681e23b493341-luxury-3-bedroom-waterfront-apartment-for-rent-banana-island-ikoyi-lagos_kdl3eg.jpg",
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1758719755/0681e23b6353f1-luxury-3-bedroom-waterfront-apartment-for-rent-banana-island-ikoyi-lagos_qwb5pu.jpg",
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1758719739/0681e23b7e09a1-luxury-3-bedroom-waterfront-apartment-for-rent-banana-island-ikoyi-lagos_aurcu5.jpg",
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1758719725/0681e23b06d578-luxury-3-bedroom-waterfront-apartment-for-rent-banana-island-ikoyi-lagos_dsqvbt.jpg",
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1758719708/0681e23b2ee125-luxury-3-bedroom-waterfront-apartment-for-rent-banana-island-ikoyi-lagos_a8p7pk.jpg",
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1758719692/0681e23b1af930-luxury-3-bedroom-waterfront-apartment-for-rent-banana-island-ikoyi-lagos_xbtf8a.jpg",
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1758719675/0681e23af2e784-luxury-3-bedroom-waterfront-apartment-for-rent-banana-island-ikoyi-lagos_vl3xed.jpg",
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 w-full">
      <h1 className="text-3xl font-bold mb-6 text-center">
        An Exceptional Luxurious Waterfront 3 Bedroom Flat
      </h1>

      {/* Image Carousel */}
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={4000}
        className="rounded-2xl overflow-hidden shadow-lg"
      >
        {cloudinaryImages.map((url, i) => (
          <div key={i}>
            <img
              src={url}
              alt={`Property ${i + 1}`}
              className="w-full h-96 object-cover" // <-- increased height here
            />
          </div>
        ))}
      </Carousel>

      {/* Property Info */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-center font-bold mb-7">PROPERTY DESCRIPTION</h2>
        
        <p>
          A Luxury 3 Bedroom Apartment at Mulberry Mansions Ikoyi, Shoreline Drive, off Onikoyi Rd, Ikoyi, Lagos
        </p>

        <h2 className="font-semibold mt-6 mb-2">Description:</h2>
        <p>
          Waterfront Luxury 3 bedroom fully furnished flat with Jetty, swimming
          pool, CCTV camera, water treatment plant, 24hrs lights and security
          services etc.
        </p>

        <h2 className="font-semibold mt-6 mb-2">Amenities include:</h2>
        <p>
          Jetty, Top notch security, Swimming Pool, Gym, CCTV, Unlimited WiFi, Water
          Treatment Plant, Modern Decor, Constant Power Supply, Secure Parking,
          Daily Housekeeping, On-site maintenance
        </p>

        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
          <h2>Price</h2>
          <p className="text-2xl font-semibold text-green-600">
            ₦120,000,000 
          </p>
          <button className="mt-4 sm:mt-0 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition">
            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
              Contact via WhatsApp
            </a>
          </button>
        </div>
      </div>

      {/* Google Map */}
      <div className="w-full mt-8 rounded-lg overflow-hidden shadow-lg">
       <iframe className="w-full h-64 sm:h-96"
      title="Mulberry Mansions Location"
      src="https://www.google.com/maps?q=Mulberry+Mansions+Ikoyi,+Shoreline+Drive,+off+Onikoyi+Rd,+Ikoyi,+Lagos&output=embed"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
      </div>

      {/* Contact Form */}
      <div className="mt-10 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Contact Agent</h2>

        {successMsg && (
          <p className="text-green-600 font-semibold mb-4">{successMsg}</p>
        )}
        {errorMsg && (
          <p className="text-red-600 font-semibold mb-4">{errorMsg}</p>
        )}

        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your Phone Number"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="4"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Sending..." : "Send Message & Open WhatsApp"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LuxWater;
