// src/pages/RoomBung.jsx
import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function RoomBung() {
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

  // New Cloudinary images
  const roomImages = [
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1758721393/0681e23b1af930-luxury-3-bedroom-waterfront-apartment-for-rent-banana-island-ikoyi-lagos_k7hrhk.jpg",
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1758721381/0681e23af2e784-luxury-3-bedroom-waterfront-apartment-for-rent-banana-island-ikoyi-lagos_lxk5i6.jpg",
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1758721363/066eddf002965b-estate-available-for-fastest-finger-for-an-investor-28-units-block-of-flats-for-sale-ajah-lagos_oxvzia.jpg",
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1758721353/066eddf02574bc-estate-available-for-fastest-finger-for-an-investor-28-units-block-of-flats-for-sale-ajah-lagos_rltypw.jpg",
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1758721342/066eddf035dab7-estate-available-for-fastest-finger-for-an-investor-28-units-block-of-flats-for-sale-ajah-lagos_rhh55v.jpg",
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1758721327/066eddeff0ebaa-estate-available-for-fastest-finger-for-an-investor-28-units-block-of-flats-for-sale-ajah-lagos_hydfpc.jpg",
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1758721314/066eddefe11f73-estate-available-for-fastest-finger-for-an-investor-28-units-block-of-flats-for-sale-ajah-lagos_rrgrzd.jpg",
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1758721297/066eddefbe5f26-estate-available-for-fastest-finger-for-an-investor-28-units-block-of-flats-for-sale-ajah-lagos_qfqf4o.jpg",
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1758721269/066eddefb0e5a7-estate-available-for-fastest-finger-for-an-investor-28-units-block-of-flats-for-sale-ajah-lagos_bhw5gf.jpg",
    "https://res.cloudinary.com/dlu8e511s/image/upload/v1758721250/066eddefa10a67-estate-available-for-fastest-finger-for-an-investor-28-units-block-of-flats-for-sale-ajah-lagos_hbusxc.jpg",
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 w-full">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6 text-center">
        14 Rooms Bungalow On Almost Full Plot Of Land
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
        {roomImages.map((img, index) => (
          <div key={index}>
            <img
              src={img}
              alt={`Room view ${index + 1}`}
              className="w-full h-[600px] object-cover" // <-- increased height
            />
          </div>
        ))}
      </Carousel>

      {/* Property Info */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-center font-bold mb-7">PROPERTY DESCRIPTION</h2>

        <p>
          Furnished 3 Bedroom Apartment with Mini Flat Guest Chalet at Glover Court Community Club, Glover Street, Ikoyi, Lagos 106104, Lagos(BQ)
        </p>

        <h2 className="font-semibold mt-6 mb-6">Features:</h2>
        <p>
          Fully and luxuriously furnished <br />
          Fully serviced <br />
          Serene environment with 24/7 security <br />
          Elevator, Swimming pool and Gym <br />
          Inverter (Back up power supply)
        </p>

        <h2 className="font-semibold mt-6 mb-6">Payable Amount:</h2>
        <p>
          price: ₦350 million <br />
          24hrs Inspection Notice
        </p>

        {/* Price + Contact Button */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-2xl font-semibold text-green-600">₦350,000,000</p>
          <button className="mt-4 sm:mt-0 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
              Contact Agent
            </a>
          </button>
        </div>
      </div>

      {/* Google Map */}
      <div className="w-full order-0 md:order-1 mt-8">
        <iframe
          className="w-full sm:h-96 h-[68vh] rounded-xl shadow-md"
          title="Glover Court Community Club Location"
          src="https://www.google.com/maps?q=Glover+Court+Community+Club,+Glover+Street,+Ikoyi,+Lagos+106104,+Lagos&output=embed"
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

export default RoomBung;
