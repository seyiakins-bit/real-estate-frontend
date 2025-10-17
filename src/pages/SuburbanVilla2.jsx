// src/pages/SuburbanVilla2.jsx
import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function SuburbanVilla2() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const whatsappNumber = "+2347039443290";

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

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

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 w-full">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Contemporary 4-Bedroom Suburban Villa – Ajah, Lagos
      </h1>

      {/* Carousel */}
      <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} interval={4000}>
        {[
          "https://res.cloudinary.com/dlu8e511s/image/upload/v1760302564/subarnvilla_k0kbej.jpg",
          "https://res.cloudinary.com/dlu8e511s/image/upload/v1760302576/subarnvilla1_b0fid2.jpg",
          "https://res.cloudinary.com/dlu8e511s/image/upload/v1760302588/subarnvilla2_zv2eno.jpg",
          "https://res.cloudinary.com/dlu8e511s/image/upload/v1760302598/subarnvilla3_cfiuis.jpg",
          "https://res.cloudinary.com/dlu8e511s/image/upload/v1760302607/subarnvilla4_rc0aou.jpg",
          "https://res.cloudinary.com/dlu8e511s/image/upload/v1760302619/subarnvilla4_ly8ij1.jpg",
          "https://res.cloudinary.com/dlu8e511s/image/upload/v1760302626/subarnvilla6_asgra6.jpg",
        ].map((img, idx) => (
          <div key={idx}>
            <img
              src={img}
              alt={`Suburban Villa view ${idx + 1}`}
              className="w-full h-80 object-cover rounded-lg"
            />
          </div>
        ))}
      </Carousel>

      {/* Property Info */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
        <h2 className="font-bold text-center mb-4">PROPERTY DESCRIPTION</h2>
        <p>
          A modern 4-bedroom suburban villa offering a calm, family-friendly environment in Ajah.
          Featuring open-plan interiors, natural light, and contemporary finishes, this home blends
          style with functionality.
        </p>

        <h2 className="font-semibold mt-6 mb-2">Features:</h2>
        <ul className="list-disc ml-6">
          <li>4 Bedrooms (All En-Suite)</li>
          <li>Spacious Living & Dining Area</li>
          <li>Fully Fitted Kitchen</li>
          <li>Ample Parking Space</li>
          <li>Good Road Network & Security</li>
        </ul>

        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-2xl font-semibold text-green-600">₦120,000,000</p>
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

      {/* Google Map Embed */}
      <div className="w-full mt-8 rounded-lg overflow-hidden shadow-lg">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31715.650436778717!2d3.5292169249113963!3d6.463731067624153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf7442fc585df%3A0x642eaefe2c2c7ce2!2sAjah%2C%20Lekki%20106104%2C%20Lagos!5e0!3m2!1sen!2sng!4v1760303079810!5m2!1sen!2sng"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Suburban Villa Location"
        ></iframe>
      </div>

      {/* Contact Form */}
      <div className="mt-10 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Contact Agent</h2>
        {successMsg && <p className="text-green-600 font-semibold mb-4">{successMsg}</p>}
        {errorMsg && <p className="text-red-600 font-semibold mb-4">{errorMsg}</p>}
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required className="px-4 py-2 border rounded-lg" />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required className="px-4 py-2 border rounded-lg" />
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Your Phone Number" required className="px-4 py-2 border rounded-lg" />
          <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" rows="4" required className="px-4 py-2 border rounded-lg"></textarea>
          <button type="submit" disabled={loading} className={`bg-blue-600 text-white px-6 py-2 rounded-lg ${loading ? "opacity-50" : "hover:bg-blue-700"}`}>
            {loading ? "Sending..." : "Send Message & Open WhatsApp"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SuburbanVilla2;
