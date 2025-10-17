// src/pages/PrimeP.jsx
import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function PrimeP() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const whatsappNumber = "+2347039443290"; // Agent's WhatsApp number

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

  // Cloudinary images for PrimeP
  const primePImages = [
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1758722625/068330e1bd37f7-prime-land-with-shops-mixed-use-land-for-sale-sangotedo-ajah-lagos_jab7gh.jpg",
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1758722639/068330e1fce114-prime-land-with-shops-mixed-use-land-for-sale-sangotedo-ajah-lagos_dwjnkz.jpg",
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1758722654/068330e157cf57-prime-land-with-shops-mixed-use-land-for-sale-sangotedo-ajah-lagos_hbjmzb.jpg",
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1758722668/068330e1820ac4-prime-land-with-shops-mixed-use-land-for-sale-sangotedo-ajah-lagos_okzi3i.jpg",
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1758722686/068330e13532f1-prime-land-with-shops-mixed-use-land-for-sale-sangotedo-ajah-lagos_tox9on.jpg",
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1758722699/068330e23797a5-prime-land-with-shops-mixed-use-land-for-sale-sangotedo-ajah-lagos_sulc8d.jpg",
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 w-full">
      <h1 className="text-3xl font-bold mb-6 text-center">
        PrimeP Luxury Mixed-Use Land
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
        {primePImages.map((img, index) => (
          <div key={index}>
            <img
              src={img}
              alt={`PrimeP view ${index + 1}`}
              className="w-full h-[600px] object-cover"
            />
          </div>
        ))}
      </Carousel>

      {/* Property Info */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-center font-bold mb-7">PROPERTY DESCRIPTION</h2>

        <p>
          PrimeP is prime mixed-use land with shops located in Sangotedo, Ajah, Lagos. Perfect for investors seeking commercial and residential development opportunities in a high-demand area.
        </p>

        <h2 className="font-semibold mt-6 mb-6">Features:</h2>
        <p>
          Prime land with shops <br />
          Ideal for commercial & residential development <br />
          High traffic location <br />
          Secure and accessible <br />
          Strong investment potential
        </p>

        <h2 className="font-semibold mt-6 mb-6">Price:</h2>
        <p>
          Price: ₦200,000,000 </p>

        {/* Price + Contact Button */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-2xl font-semibold text-green-600">₦200,000,000</p>
          <button className="mt-4 sm:mt-0 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact Agent
            </a>
          </button>
        </div>
      </div>

      {/* Google Map */}
      <div className="w-full order-0 md:order-1 mt-8">
        <iframe
          className="w-full h-[68vh] rounded-xl shadow-md"
          title="Sangotedo Ajah Location"
          src="https://www.google.com/maps?q=Sangotedo,+Ajah,+Lagos&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* Contact Form */}
      <div className="mt-10 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Contact Agent</h2>

        {successMsg && <p className="text-green-600 font-semibold mb-4">{successMsg}</p>}
        {errorMsg && <p className="text-red-600 font-semibold mb-4">{errorMsg}</p>}

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

export default PrimeP;
