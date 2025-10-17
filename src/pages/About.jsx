import React from "react";
import AkinBg from "../assets/akins.jpg"; // ✅ Your new background
import CEOImg from "../assets/AKINSCEO.jpg"; // ✅ Your image

const About = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center text-gray-800"
      style={{ backgroundImage: `url(${AkinBg})` }} // ✅ Updated background
    >
      {/* Dark overlay */}
      <div className="bg-black bg-opacity-70 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-16 text-gray-100">
          {/* Intro Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              About Akins Luxury Homes
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              At{" "}
              <span className="text-blue-400 font-semibold">
                Akins Luxury Homes
              </span>
              , we redefine property excellence across Nigeria — combining
              technology, transparency, and luxury service to deliver seamless
              real estate experiences. Whether you’re buying, selling, or
              investing, our mission is simple: to connect you with properties
              that embody comfort, class, and value.
            </p>
          </div>

          {/* Mission, Vision, Values */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="bg-gray-800 bg-opacity-80 rounded-2xl p-8 text-center shadow-lg hover:scale-105 transition-transform duration-300">
              <h2 className="text-2xl font-semibold text-white mb-3">
                Our Mission
              </h2>
              <p className="text-gray-300">
                To empower property buyers, sellers, and investors through
                innovation, trust, and exceptional service that redefine real
                estate excellence.
              </p>
            </div>
            <div className="bg-gray-800 bg-opacity-80 rounded-2xl p-8 text-center shadow-lg hover:scale-105 transition-transform duration-300">
              <h2 className="text-2xl font-semibold text-white mb-3">
                Our Vision
              </h2>
              <p className="text-gray-300">
                To be Nigeria’s most trusted real estate brand — where luxury
                meets integrity and every property tells a story of value and
                vision.
              </p>
            </div>
            <div className="bg-gray-800 bg-opacity-80 rounded-2xl p-8 text-center shadow-lg hover:scale-105 transition-transform duration-300">
              <h2 className="text-2xl font-semibold text-white mb-3">
                Core Values
              </h2>
              <ul className="text-gray-300 space-y-2 text-left">
                <li>🏠 <span className="font-medium">Integrity</span> — We uphold honesty in every transaction.</li>
                <li>🤝 <span className="font-medium">Customer Focus</span> — Your satisfaction defines our success.</li>
                <li>🚀 <span className="font-medium">Innovation</span> — Technology that simplifies decisions.</li>
                <li>🌍 <span className="font-medium">Excellence</span> — We deliver only the best, every time.</li>
              </ul>
            </div>
          </div>

          {/* CEO Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-center text-white mb-10">
              Meet Our CEO
            </h2>

            <div className="bg-gray-800 bg-opacity-80 rounded-2xl p-8 shadow-lg flex flex-col md:flex-row items-center md:items-start gap-8 hover:shadow-blue-500/40 transition-shadow duration-300 max-w-4xl mx-auto">
              <img
                src={CEOImg}
                alt="CEO Akins Luxury Homes"
                className="w-48 h-48 rounded-full object-cover border-4 border-blue-500 shadow-lg"
              />
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-semibold text-white">Akins Seyi</h3>
                <p className="text-blue-400 font-medium mb-2">
                  Chief Executive Officer
                </p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  As the Founder and CEO of Akins Luxury Homes, I’m committed to 
                  redefining real estate in Nigeria through integrity, excellence, 
                  and innovation. Every client deserves more than a property — they 
                  deserve an experience built on trust and long-term value. 
                  Our vision is to connect individuals and families with luxurious 
                  spaces that represent success, comfort, and lasting legacy. 
                  At Akins Luxury Homes, this isn’t just real estate — it’s 
                  excellence reimagined.
                </p>
              </div>
            </div>
          </section>

          {/* Closing */}
          <div className="text-center text-gray-400 border-t border-gray-700 pt-8">
            <p>
              At Akins Luxury Homes, we don’t just find properties — we build
              legacies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
