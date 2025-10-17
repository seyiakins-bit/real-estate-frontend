import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function ModernDuplex1() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const whatsappNumber = "+2347039443290"; // Agent WhatsApp

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

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 w-full">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6 text-center">
        Modern Duplex 1 – Luxury 5 Bedroom Duplex
      </h1>

      {/* Carousel */}
      <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} interval={4000}>
        {[
          "https://res.cloudinary.com/dlu8e511s/image/upload/v1758774752/068d3abc83014b-2-units-of-3-bedroom-flat-detached-duplexes-for-sale-lekki-ibeju-lagos_asw0bm.jpg",
          "https://res.cloudinary.com/dlu8e511s/image/upload/v1758774741/068d3abc50a24a-2-units-of-3-bedroom-flat-detached-duplexes-for-sale-lekki-ibeju-lagos_ovbc9z.jpg",
          "https://res.cloudinary.com/dlu8e511s/image/upload/v1758774728/068d3abc34afd5-2-units-of-3-bedroom-flat-detached-duplexes-for-sale-lekki-ibeju-lagos_gz8zs5.jpg",
          "https://res.cloudinary.com/dlu8e511s/image/upload/v1758774716/068d3abc1c243d-2-units-of-3-bedroom-flat-detached-duplexes-for-sale-lekki-ibeju-lagos_fbk8x7.jpg",
          "https://res.cloudinary.com/dlu8e511s/image/upload/v1758774704/068d3abbfe3e35-2-units-of-3-bedroom-flat-detached-duplexes-for-sale-lekki-ibeju-lagos_1_gekk47.jpg",
        ].map((url, idx) => (
          <div key={idx}>
            <img
              src={url}
              alt={`Modern Duplex 1 view ${idx + 1}`}
              className="w-full h-[500px] object-cover"
            />
          </div>
        ))}
      </Carousel>

      {/* Info */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-center font-bold mb-7">PROPERTY DESCRIPTION</h2>
        <p>
          A luxurious 5-bedroom modern duplex located in Ligali Ayorinde Street, Victoria Island
          Lagos. Features exquisite finishing, ensuite bedrooms, fitted kitchen, swimming pool, and
          ample parking space.
        </p>

        <h2 className="font-semibold mt-6 mb-6">Features:</h2>
        <p>
          5 ensuite bedrooms <br />
          Spacious living rooms <br />
          Fully fitted kitchen <br />
          Swimming pool & gym <br />
          24/7 power supply <br />
          CCTV & smart security
        </p>

        <h2 className="font-semibold mt-6 mb-6">Payable Amount:</h2>
        <p>
          Price: ₦250,000,000 <br />
          Agency fee: 5% <br />
          Legal: 5% <br />
          Service charge: ₦2,000,000
        </p>

        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-2xl font-semibold text-green-600">₦250,000,000</p>
          <button className="mt-4 sm:mt-0 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
              Contact Agent
            </a>
          </button>
        </div>
      </div>

      {/* Google Map */}
      <div className="w-full mt-8">
        <iframe
          className="w-full sm:h-96 h-[68vh] rounded-xl shadow-md"
          title="Ligali Ayorinde Street Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.6332538980813!2d3.44097!3d6.428565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf50fca5e5c01%3A0x94f5fa9ef9e9f3b4!2sLigali%20Ayorinde%20St%2C%20Victoria%20Island%2C%20Lagos!5e0!3m2!1sen!2sng!4v1695400000000!5m2!1sen!2sng"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
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
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your Phone Number"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="4"
            required
            className="w-full px-4 py-2 border rounded-lg"
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

export default ModernDuplex1;
