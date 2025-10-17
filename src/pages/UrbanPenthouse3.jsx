import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function UrbanPenthouse3() {
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
  }

  // ✅ Cloudinary Images for UrbanPenthouse3 (replace with actual images)
  const cloudinaryImages = [
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1760171809/lounge_iw608y.jpg",
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1760171827/lounge1_gbn1ss.jpg",
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1760171844/lounge2_uquy1p.jpg",
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1760171863/lounge3_hsw9bt.jpg",
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1760171889/lounge4_mczbco.jpg",
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1760171897/lounge5_linifh.jpg",
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1760171905/lounge6_wdz6rp.jpg",
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 w-full">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Exquisite Urban Penthouse in Banana Island, Ikoyi
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
              alt={`Urban Penthouse 3 - Image ${i + 1}`}
              className="w-full h-96 object-cover"
            />
          </div>
        ))}
      </Carousel>

      {/* Property Info */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-center font-bold mb-7">PROPERTY DESCRIPTION</h2>
        <p>
          Step into a realm of sophistication with this stunning Urban Penthouse located
          in the prestigious Banana Island, Ikoyi. Designed for elite living, it combines
          architectural brilliance, cutting-edge technology, and breathtaking ocean views.
        </p>

        <h2 className="font-semibold mt-6 mb-2">Description:</h2>
        <p>
          This masterpiece features an open-concept layout with a panoramic skyline view,
          high ceilings, marble flooring, rooftop entertainment area, and a smart home automation system.
        </p>

        <h2 className="font-semibold mt-6 mb-2">Amenities include:</h2>
        <p>
          Infinity Pool, Home Theatre, Gym, Rooftop Lounge, Smart Lighting, 24/7 Power Supply,
          Concierge Service, and Secure Underground Parking.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
          <h2>Price</h2>
          <p className="text-2xl font-semibold text-green-600">₦950,000,000</p>
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

      {/* ✅ Updated Google Map Embed - Banana Island Ikoyi */}
      <div className="w-full mt-8 rounded-lg overflow-hidden shadow-lg">
        <iframe
          className="w-full h-64 sm:h-96"
          title="Urban Penthouse Location - Banana Island Ikoyi"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253650.8631624438!2d2.9623952945312446!3d6.6102526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf53c36672dc3%3A0x91de90f886a2916e!2sBanana%20island%20Ikoyi!5e0!3m2!1sen!2sng!4v1760172160067!5m2!1sen!2sng"
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

export default UrbanPenthouse3;
