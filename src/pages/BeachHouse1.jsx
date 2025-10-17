import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function BeachHouse1() {
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

        const whatsappMessage = encodeURIComponent(
          `Hello, my name is ${formData.name}. I’m interested in Beach House 1. ${formData.message} Contact me at ${formData.phone} or ${formData.email}`
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

  // Cloudinary images for BeachHouse1
  const beachHouseImages = [
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1758723623/59f3d021_kvglmk.avif",
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1758723594/03be2521_b9kf3k.avif",
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1758723526/93329a84_innym0.webp",
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1758723348/de54cdfa_cfx6zc.avif",
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1758723373/de54cdfa_1_uewtg9.avif",
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1758723328/ed4f362d_vesste.webp",
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1758723301/a177e0cc_nhtdj9.webp",
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1758723280/3018029b_i9etes.webp",
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 w-full">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Luxury Beach House 1
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
        {beachHouseImages.map((img, index) => (
          <div key={index}>
            <img
              src={img}
              alt={`Beach House 1 - ${index + 1}`}
              className="w-full h-[500px] object-cover"
            />
          </div>
        ))}
      </Carousel>

      {/* Property Info */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-center font-bold mb-7">PROPERTY DESCRIPTION</h2>

        <p>
          A stunning luxury beachfront home located in Ilashe, Lagos. This property combines modern architecture with breathtaking ocean views.
        </p>

        <h2 className="font-semibold mt-6 mb-2">Description:</h2>
        <p>
          Spacious 5-bedroom villa with infinity pool, private beach access, fully equipped kitchen, modern interiors, and 24/7 security.
        </p>

        <h2 className="font-semibold mt-6 mb-2">Amenities include:</h2>
        <p>
          Swimming Pool, Private Beach, Gym, Smart Home System, 24/7 Security, Ocean View Balcony, Jacuzzi, Secure Parking, and Unlimited WiFi.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
          <h2>Price</h2>
          <p className="text-2xl font-semibold text-green-600">
            ₦35,000,000 per annum
          </p>
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

      {/* Google Map */}
      <div className="w-full mt-8 rounded-lg overflow-hidden shadow-lg">
        <iframe
          className="w-full h-64 sm:h-96"
          title="Ilashe Beach Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.674802089849!2d3.288592214300198!3d6.398165295219083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103d863021e32e95%3A0x2239aef0b4858de3!2sIlashe%20Beach%2C%20Lagos%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1695523029653!5m2!1sen!2sng"
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

export default BeachHouse1;
