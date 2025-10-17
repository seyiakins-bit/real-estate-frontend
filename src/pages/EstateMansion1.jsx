import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function EstateMansion1() {
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

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

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

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 w-full">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Exquisite 6-Bedroom Estate Mansion – Ikoyi, Lagos
      </h1>

      {/* Carousel */}
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={4000}
      >
        {[
            "https://res.cloudinary.com/dlu8e511s/image/upload/v1760306539/estatem_bmnpup.jpg",
            "https://res.cloudinary.com/dlu8e511s/image/upload/v1760306548/estatem1_vsnbka.jpg",
            "https://res.cloudinary.com/dlu8e511s/image/upload/v1760306556/estatem2_mkehcc.jpg",
            "https://res.cloudinary.com/dlu8e511s/image/upload/v1760306564/estatem3_li8jgv.jpg",
            "https://res.cloudinary.com/dlu8e511s/image/upload/v1760306573/estatem34_io0aka.jpg",
            "https://res.cloudinary.com/dlu8e511s/image/upload/v1760306587/estatem5_iehyjw.jpg",
            "https://res.cloudinary.com/dlu8e511s/image/upload/v1760306595/estatem6_glfrmo.jpg",
            "https://res.cloudinary.com/dlu8e511s/image/upload/v1760306605/estatem7_wsir5z.jpg",
        ].map((img, idx) => (
          <div key={idx}>
            <img
              src={img}
              alt={`Estate Mansion 1 view ${idx + 1}`}
              className="w-full h-80 object-cover rounded-lg"
            />
          </div>
        ))}
      </Carousel>

      {/* Property Info */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
        <h2 className="font-bold text-center mb-4">PROPERTY DESCRIPTION</h2>
        <p>
          Experience timeless luxury in this 6-bedroom estate mansion located in
          Ikoyi, Lagos. This masterpiece features elegant architecture, spacious
          living areas, and premium facilities designed for comfort and
          prestige.
        </p>

        <h2 className="font-semibold mt-6 mb-2">Features:</h2>
        <ul className="list-disc ml-6">
          <li>6 En-Suite Bedrooms with Walk-in Closets</li>
          <li>Grand Living Room and Family Lounge</li>
          <li>Fully Fitted Chef’s Kitchen</li>
          <li>Private Swimming Pool and Gym</li>
          <li>Smart Home Automation System</li>
          <li>24/7 Security and Power Supply</li>
        </ul>

        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-2xl font-semibold text-green-600">₦350,000,000</p>
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 sm:mt-0 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Contact via WhatsApp
          </a>
        </div>
      </div>

      {/* Google Map */}
      <div className="w-full mt-8 rounded-lg overflow-hidden shadow-lg">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.4404567635297!2d3.4218448773382537!3d6.465752376832833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf4b12c5ab865%3A0x68b78c70fb67e4d8!2s6th%20St%2C%20Ikoyi%2C%20Lagos%20106104%2C%20Lagos!5e0!3m2!1sen!2sng!4v1760306041865!5m2!1sen!2sng"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Estate Mansion Ikoyi Location"
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
            className="px-4 py-2 border rounded-lg"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="px-4 py-2 border rounded-lg"
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your Phone Number"
            required
            className="px-4 py-2 border rounded-lg"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="4"
            required
            className="px-4 py-2 border rounded-lg"
          ></textarea>
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-600 text-white px-6 py-2 rounded-lg ${
              loading ? "opacity-50" : "hover:bg-blue-700"
            }`}
          >
            {loading ? "Sending..." : "Send Message & Open WhatsApp"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EstateMansion1;
