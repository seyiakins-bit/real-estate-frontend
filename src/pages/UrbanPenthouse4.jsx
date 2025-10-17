import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function UrbanPenthouse4() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const whatsappNumber = "+2347039443290";

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
        window.open(
          `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`,
          "_blank"
        );
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

  // ✅ Cloudinary Images for UrbanPenthouse4
  const cloudinaryImages = [
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1760172696/private_o1eufx.jpg",
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1760172710/private1_vatdr1.jpg",
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1760172817/private2_guarlb.jpg",
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1760172817/private3_kns5e9.jpg",
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1760172875/private4_ompuyv.jpg",
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 w-full">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Luxury Urban Penthouse — Lucrezia by Sujimoto, Ikoyi
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
              alt={`Urban Penthouse 4 - Image ${i + 1}`}
              className="w-full h-96 object-cover"
            />
          </div>
        ))}
      </Carousel>

      {/* Property Info */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-center font-bold mb-7">PROPERTY DESCRIPTION</h2>
        <p>
          Welcome to **Lucrezia by Sujimoto**, the pinnacle of luxury living in Ikoyi.
          This ultra-modern penthouse showcases world-class architecture,
          bespoke interiors, and panoramic city views that redefine sophistication.
        </p>

        <h2 className="font-semibold mt-6 mb-2">Description:</h2>
        <p>
          Designed for connoisseurs of fine living, this penthouse includes 6 ensuite bedrooms,
          an infinity pool, sky lounge, cinema, and marble-finished living areas.
          The residence also offers a private elevator and a 360° skyline view of Lagos.
        </p>

        <h2 className="font-semibold mt-6 mb-2">Amenities include:</h2>
        <p>
          Infinity Pool, Home Cinema, Sky Lounge, Gym & Spa, 24/7 Security,
          Smart Home System, Valet Parking, Concierge Service, and Power Backup System.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
          <h2>Price</h2>
          <p className="text-2xl font-semibold text-green-600">₦1,200,000,000</p>
          <button className="mt-4 sm:mt-0 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition">
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact via WhatsApp
            </a>
          </button>
        </div>
      </div>

      {/* ✅ Updated Google Map Embed - Lucrezia by Sujimoto, Ikoyi */}
      <div className="w-full mt-8 rounded-lg overflow-hidden shadow-lg">
        <iframe
          className="w-full h-64 sm:h-96"
          title="Urban Penthouse 4 Location - Lucrezia by Sujimoto Ikoyi"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63430.816089556276!2d3.371507748632802!3d6.467594999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf59afe88cc81%3A0x166c585fe9f88135!2sLucreziaBySujimoto!5e0!3m2!1sen!2sng!4v1760173105633!5m2!1sen!2sng"
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

export default UrbanPenthouse4;
