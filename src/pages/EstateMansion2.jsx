import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function EstateMansion2() {
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 w-full">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Grand 7-Bedroom Estate Mansion with Private Cinema – Banana Island,
        Lagos
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
            "https://res.cloudinary.com/dlu8e511s/image/upload/v1760306615/estatem8_eg5nrg.jpg",
            "https://res.cloudinary.com/dlu8e511s/image/upload/v1760306622/estatem9_p6y5qm.jpg",
            "https://res.cloudinary.com/dlu8e511s/image/upload/v1760306628/estatem10_jdmnhk.jpg",
            "https://res.cloudinary.com/dlu8e511s/image/upload/v1760306636/estatem11_cpyu1x.jpg",
            "https://res.cloudinary.com/dlu8e511s/image/upload/v1760306642/estatem12_j7jj5h.jpg",
            "https://res.cloudinary.com/dlu8e511s/image/upload/v1760306651/estatem13_x0vdu3.jpg",
            "https://res.cloudinary.com/dlu8e511s/image/upload/v1760306661/estatem14_c4ty0y.jpg",
            "https://res.cloudinary.com/dlu8e511s/image/upload/v1760306668/estatem15_sk2zhs.jpg",
        ].map((img, idx) => (
          <div key={idx}>
            <img
              src={img}
              alt={`Estate Mansion 2 view ${idx + 1}`}
              className="w-full h-80 object-cover rounded-lg"
            />
          </div>
        ))}
      </Carousel>

      {/* Property Info */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
        <h2 className="font-bold text-center mb-4">PROPERTY DESCRIPTION</h2>
        <p>
          This 7-bedroom luxury estate mansion in Banana Island redefines elite
          living. Designed with modern aesthetics, it features a private cinema,
          rooftop lounge, swimming pool, and breathtaking lagoon views.
        </p>

        <h2 className="font-semibold mt-6 mb-2">Features:</h2>
        <ul className="list-disc ml-6">
          <li>7 En-Suite Bedrooms with Italian Finishes</li>
          <li>Private Cinema and Entertainment Room</li>
          <li>Infinity Pool and Rooftop Lounge</li>
          <li>State-of-the-Art Kitchen and Bar</li>
          <li>Home Office and Gym</li>
          <li>Smart Security & Automated Lighting</li>
        </ul>

        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-2xl font-semibold text-green-600">₦500,000,000</p>
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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31706.35789530552!2d3.229157074316406!3d6.6102526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf53c36672dc3%3A0x91de90f886a2916e!2sBanana%20island%20Ikoyi!5e0!3m2!1sen!2sng!4v1760306424506!5m2!1sen!2sng"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Estate Mansion Banana Island Location"
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

export default EstateMansion2;
