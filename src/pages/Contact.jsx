import React from "react";
import AkinBg from "../assets/akins.jpg";

const Contact = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center text-gray-100"
      style={{ backgroundImage: `url(${AkinBg})` }}
    >
      {/* Dark overlay for readability */}
      <div className="bg-black bg-opacity-70 min-h-screen flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-6 py-16 w-full">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Contact Akins Luxury Homes
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
              Whether you’re looking to buy, sell, or invest — we’d love to hear
              from you. Our team is dedicated to delivering luxury experiences
              built on trust, value, and excellence.
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-10">
            {/* Contact Form */}
            <div className="bg-gray-800 bg-opacity-80 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-semibold text-white mb-6 text-center">
                Send Us a Message
              </h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-gray-100 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-gray-100 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Message</label>
                  <textarea
                    rows="5"
                    placeholder="Write your message..."
                    className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-gray-100 focus:outline-none focus:border-blue-500"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-white py-3 rounded-lg font-semibold"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="bg-gray-800 bg-opacity-80 rounded-2xl p-8 shadow-lg flex flex-col justify-center">
              <h2 className="text-2xl font-semibold text-white mb-6 text-center">
                Get in Touch
              </h2>
              <ul className="space-y-4 text-gray-300">
                <li>
                  📍 <span className="font-medium">Address:</span>
                  <br />
                  Ahmed Onibudo St Victoria Island, Lagos 106104, Lagos
                </li>
                <li>
                  📞 <span className="font-medium">Phone:</span>{" "}
                  <a href="tel:+2347039443290" className="hover:text-blue-400">
                    +234 703 944 3290
                  </a>
                </li>
                <li>
                  📧 <span className="font-medium">Email:</span>{" "}
                  <a
                    href="mailto:info@akinsluxuryhomes.com"
                    className="hover:text-blue-400"
                  >
                    info@akinsluxuryhomes.com
                  </a>
                </li>
                <li>
                  🕓 <span className="font-medium">Business Hours:</span>
                  <br /> Mon - Sat: 9:00 AM – 6:00 PM
                </li>
              </ul>

              <div className="mt-6 flex justify-center gap-4 text-2xl text-blue-400">
                <a
                  href="https://wa.me/2347039443290"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white"
                >
                  <i className="fab fa-whatsapp"></i>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white"
                >
                  <i className="fab fa-facebook"></i>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Embedded Google Map */}
          <div className="mt-16 rounded-2xl overflow-hidden shadow-lg border border-gray-700">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.6749614051337!2d3.425848774752437!3d6.43577799355537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf528154b5d55%3A0xc94a6f6ede9d0d91!2sAhmed%20Onibudo%20St%2C%20Victoria%20Island%2C%20Lagos%20106104%2C%20Lagos!5e0!3m2!1sen!2sng!4v1760511427318!5m2!1sen!2sng"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Akins Luxury Homes Location"
            ></iframe>
          </div>

          {/* Footer text */}
          <div className="text-center text-gray-400 border-t border-gray-700 pt-8 mt-10">
            <p>We look forward to helping you find your dream property.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
