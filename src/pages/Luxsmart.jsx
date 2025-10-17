// src/pages/LuxSmart.jsx
import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function LuxSmart() {
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

  // Updated Cloudinary images
  const luxSmartImages = [
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1758722158/0686fe0120743e-luxury-5-bed-smart-home-with-cinema-gym-swimming-pool-and-bq-for-sale-lekki-phase-1-lekki-lagos_rifyan.jpg",
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1758722143/0686fe0181b6da-luxury-5-bed-smart-home-with-cinema-gym-swimming-pool-and-bq-for-sale-lekki-phase-1-lekki-lagos_djgr8d.jpg",
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1758722125/0686fe0156f8d0-luxury-5-bed-smart-home-with-cinema-gym-swimming-pool-and-bq-for-sale-lekki-phase-1-lekki-lagos_gcbgzu.jpg",
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1758722113/0686fe01debe43-luxury-5-bed-smart-home-with-cinema-gym-swimming-pool-and-bq-for-sale-lekki-phase-1-lekki-lagos_oyadkd.jpg",
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1758722094/0686fe01b070f8-luxury-5-bed-smart-home-with-cinema-gym-swimming-pool-and-bq-for-sale-lekki-phase-1-lekki-lagos_tlr2pc.jpg",
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1758722080/0686fe00f00b51-luxury-5-bed-smart-home-with-cinema-gym-swimming-pool-and-bq-for-sale-lekki-phase-1-lekki-lagos_gc6qud.jpg",
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1758722060/0686fe00be6cbc-luxury-5-bed-smart-home-with-cinema-gym-swimming-pool-and-bq-for-sale-lekki-phase-1-lekki-lagos_qv6tjl.jpg",
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 w-full">
      <h1 className="text-3xl font-bold mb-6 text-center">
        LuxSmart – Ultra Modern 5 Bedroom Smart Home
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
        {luxSmartImages.map((img, index) => (
          <div key={index}>
            <img
              src={img}
              alt={`LuxSmart view ${index + 1}`}
              className="w-full h-[600px] object-cover" // Increased height
            />
          </div>
        ))}
      </Carousel>

      {/* Property Info */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-center font-bold mb-7">PROPERTY DESCRIPTION</h2>

        <p>
          Ultra-modern 5 Bedroom Smart Home located at Lekki Phase 1, Lagos. Features cinema, gym, swimming pool, and fully automated smart home technology for lighting, security, and climate control.
        </p>

        <h2 className="font-semibold mt-6 mb-6">Features:</h2>
        <p>
          Smart Home Automation <br />
          Fully serviced with 24/7 power and security <br />
          Swimming pool, Gym & Cinema <br />
          Smart lighting & climate control <br />
          High-speed internet <br />
          Underground parking
        </p>

        <h2 className="font-semibold mt-6 mb-6">Payable Amount:</h2>
        <p>
          Price: ₦450,000,000 </p>

        {/* Price + Contact Button */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-2xl font-semibold text-green-600">₦450,000,000</p>
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
          className="w-full sm:h-96 h-[68vh] rounded-xl shadow-md"
          title="Lekki Phase 1 Location"
          src="https://www.google.com/maps?q=Lekki+Phase+1,+Lagos&output=embed"
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

export default LuxSmart;
