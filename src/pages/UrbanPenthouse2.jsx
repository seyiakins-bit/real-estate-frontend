import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function UrbanPenthouse2() {
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

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.message
    ) {
      setErrorMsg("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch("https://real-estate-backend-z8aa.onrender.com/api/contact", {
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

  // Cloudinary Images for UrbanPenthouse2
  const cloudinaryImages = [
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1760170725/pool_rd61xn.jpg",
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1760170733/pool1_thtlmp.jpg",
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1760170746/pool2_ua8ipk.jpg",
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1760170761/pool3_kufwvd.jpg",
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1760170776/pool4_y8fb3n.jpg",
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1760170788/pool5_nvlwn0.jpg",
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1760170799/pool6_nrdmxf.jpg",
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1760170809/pool7_rbpfjk.jpg",
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1760170823/pool8_ssmac9.jpg",
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 w-full">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Ultra-Modern Urban Penthouse with Ocean View Terrace
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
              alt={`Urban Penthouse 2 - Image ${i + 1}`}
              className="w-full h-96 object-cover"
            />
          </div>
        ))}
      </Carousel>

      {/* Property Info */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-center font-bold mb-7">PROPERTY DESCRIPTION</h2>
        <p>
          Discover refined sophistication in this breathtaking Urban Penthouse
          overlooking the Atlantic Ocean in Banana Island, Ikoyi. Designed with
          elegance, this 5-bedroom residence merges contemporary architecture
          with ultimate luxury.
        </p>

        <h2 className="font-semibold mt-6 mb-2">Description:</h2>
        <p>
          Boasting a private elevator, sky lounge, rooftop jacuzzi, cinema,
          fully equipped gym, and ocean-view terrace — this home is the
          definition of prestige and exclusivity.
        </p>

        <h2 className="font-semibold mt-6 mb-2">Amenities include:</h2>
        <p>
          Smart Home System, Rooftop Jacuzzi, Home Cinema, Gym, Private Parking
          Garage, 24/7 Security, CCTV Monitoring, High-Speed Elevator, and Ocean
          View Balconies.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
          <h2>Price</h2>
          <p className="text-2xl font-semibold text-green-600">₦800,000,000</p>
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
      {/* ✅ Updated Google Map Embed - Banana Island */}
      <div className="w-full mt-8 rounded-lg overflow-hidden shadow-lg">
        <iframe
          className="w-full h-64 sm:h-96"
          title="Urban Penthouse Location - Banana Island"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253623.58714257757!2d3.1743030948502455!3d6.663208044776339!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf48e1f7f0595%3A0xd636bdb81fb9e5e9!2sBanana%20Island!5e0!3m2!1sen!2sng!4v1760171391814!5m2!1sen!2sng"
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

export default UrbanPenthouse2;
