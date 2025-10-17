// src/pages/HomePage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import PropertyCard from "../components/PropertyCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

const properties = [
  {
    id: 1,
    title: "Luxury Apartment",
    location: "Lagos",
    type: "Apartment",
    bedrooms: 3,
    bathrooms: 2,
    image:
      "https://res.cloudinary.com/dlu8e511s/image/upload/v1758721250/066eddefa10a67-estate-available-for-fastest-finger-for-an-investor-28-units-block-of-flats-for-sale-ajah-lagos_hbusxc.jpg",
    link: "/LuxuryApartment",
  },
  {
    id: 2,
    title: "Beach House",
    location: "Lekki",
    type: "House",
    bedrooms: 5,
    bathrooms: 4,
    image:
      "https://res.cloudinary.com/dlu8e511s/image/upload/v1758723394/a9070607_1_lvnog3.avif",
    link: "/BeachHouse",
  },
  {
    id: 3,
    title: "Modern Duplex",
    location: "Victoria Island",
    type: "Duplex",
    bedrooms: 4,
    bathrooms: 3,
    image:
      "https://res.cloudinary.com/dlu8e511s/image/upload/v1758774752/068d3abc83014b-2-units-of-3-bedroom-flat-detached-duplexes-for-sale-lekki-ibeju-lagos_asw0bm.jpg",
    link: "/ModernDuplex",
  },
  {
    id: 4,
    title: "Cozy Bungalow",
    location: "Ikeja",
    type: "Bungalow",
    bedrooms: 2,
    bathrooms: 1,
    image:
      "https://res.cloudinary.com/dlu8e511s/image/upload/v1758719708/0681e23b2ee125-luxury-3-bedroom-waterfront-apartment-for-rent-banana-island-ikoyi-lagos_a8p7pk.jpg",
    link: "/CozyBungalow",
  },
  {
    id: 5,
    title: "Urban Penthouse",
    location: "Banana Island",
    type: "Penthouse",
    bedrooms: 5,
    bathrooms: 5,
    image:
      "https://res.cloudinary.com/dlu8e511s/image/upload/v1760169442/ubarn1_xtfdig.jpg",
    link: "/UrbanPenthouse",
  },
  {
    id: 6,
    title: "Family Duplex",
    location: "Gwarinpa, Abuja",
    type: "Duplex",
    bedrooms: 4,
    bathrooms: 3,
    image:
      "https://res.cloudinary.com/dlu8e511s/image/upload/v1760175810/bed_1_living_room_lplxao.jpg",
    link: "/FamilyDuplex",
  },
  {
    id: 7,
    title: "Suburban Villa",
    location: "Magodo, Lagos",
    type: "Villa",
    bedrooms: 6,
    bathrooms: 5,
    image:
      "https://res.cloudinary.com/dlu8e511s/image/upload/v1760302564/subarnvilla_k0kbej.jpg",
    link: "/SuburbanVilla",
  },
  {
    id: 8,
    title: "City Apartment",
    location: "Surulere, Lagos",
    type: "Apartment",
    bedrooms: 3,
    bathrooms: 2,
    image:
      "https://res.cloudinary.com/dlu8e511s/image/upload/v1760304180/city_c3bocg.jpg",
    link: "/CityApartment",
  },
  {
    id: 9,
    title: "Estate Mansion",
    location: "Maitama, Abuja",
    type: "Mansion",
    bedrooms: 7,
    bathrooms: 6,
    image:
      "https://res.cloudinary.com/dlu8e511s/image/upload/v1760306651/estatem13_x0vdu3.jpg",
    link: "/EstateMansion",
  },
  {
    id: 10,
    title: "Classic Bungalow",
    location: "Ibadan, Oyo",
    type: "Bungalow",
    bedrooms: 3,
    bathrooms: 2,
    image:
      "https://res.cloudinary.com/dlu8e511s/image/upload/v1758798761/classic-bungalow_ibadan_dhzf8s.jpg",
    link: "/ClassicBungalow",
  },
];

const HomePage = () => {
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 6;

  const handleSearch = (query) => {
    const results = properties.filter(
      (p) =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.location.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProperties(results);
    setCurrentPage(1);
  };

  const handleFilter = ({ location, bedrooms }) => {
    let results = [...properties];
    if (location) results = results.filter((p) => p.location === location);
    if (bedrooms) results = results.filter((p) => p.bedrooms >= +bedrooms);
    setFilteredProperties(results);
    setCurrentPage(1);
  };

  const indexOfLast = currentPage * propertiesPerPage;
  const indexOfFirst = indexOfLast - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 text-gray-800">
      {/* ===== VIDEO HERO SECTION ===== */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/akins.mp4"
          autoPlay
          loop
          muted
          playsInline
        ></video>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center bg-black/20">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-4"
          >
            Find Your Dream Home
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-lg md:text-xl mb-8 text-gray-200"
          >
            Discover premium properties and luxurious living across Nigeria
          </motion.p>
          <Link
            to="/properties"
            className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-3 rounded-full text-white font-semibold shadow-lg"
          >
            Explore Now
          </Link>
        </div>
      </section>

      {/* ===== LUXURY INVESTMENT SECTION ===== */}
      <section className="w-full py-16 px-6 md:px-12 bg-white text-gray-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              DISCRETION. ACCESS. DELIVERY
            </h2>
            <p className="text-lg font-semibold text-blue-700 mb-6">
              Invest in the AKINS LUXURY HOME. Live in Luxury. Unlock
              Opportunity.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              AKINS LUXURY isn’t just a brand—it’s your trusted gateway to
              global real estate, financial freedom, and a lifestyle defined by
              elegance and opportunity. From Nigeria to the world, we connect
              discerning investors to high-value properties across the UAE and
              beyond.
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Premium returns and secure investments</li>
              <li>Iconic developments and exclusive communities</li>
              <li>World-class healthcare, education, and security</li>
              <li>Global mobility and family-focused visa advantages</li>
            </ul>
            <p className="mt-6 text-gray-700 leading-relaxed">
              From beachfront penthouses to high-yield urban developments, your
              path to international prestige and smart investment begins here.
            </p>
            <h1 className="text-3xl mt-4">
              With Akins Luxury, you’re not just investing — you’re elevating
              your legacy.
            </h1>
          </div>
          <div className="flex justify-center">
            <img
              src="https://res.cloudinary.com/dlu8e511s/image/upload/v1760441494/ChatGPT_Image_Oct_13_2025_12_12_59_AM_kqkfzr.png"
              alt="Akins Luxury home"
              className="rounded-2xl shadow-lg w-full h-[850px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* ===== LUXURY IMAGE SLIDER ===== */}
      <section className="w-full py-16 bg-gray-100">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
          Explore Our World of Luxury
        </h2>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={3}
          loop={true}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="w-full"
        >
          {[
            "https://res.cloudinary.com/dlu8e511s/image/upload/v1760175810/bed_1_living_room_lplxao.jpg",
            "https://res.cloudinary.com/dlu8e511s/image/upload/v1760302564/subarnvilla_k0kbej.jpg",
            "https://res.cloudinary.com/dlu8e511s/image/upload/v1760304180/city_c3bocg.jpg",
            "https://res.cloudinary.com/dlu8e511s/image/upload/v1758774752/068d3abc83014b-2-units-of-3-bedroom-flat-detached-duplexes-for-sale-lekki-ibeju-lagos_asw0bm.jpg",
            "https://res.cloudinary.com/dlu8e511s/image/upload/v1760306651/estatem13_x0vdu3.jpg",
          ].map((url, i) => (
            <SwiperSlide key={i}>
              <img
                src={url}
                alt="Luxury property"
                className="rounded-2xl shadow-lg w-full h-[350px] object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* ===== SEARCH + FILTERS ===== */}
      <div className="bg-white w-full shadow-md relative z-20 py-8 px-3 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full space-y-5"
        >
          <SearchBar onSearch={handleSearch} />
          <Filters onFilter={handleFilter} />
        </motion.div>
      </div>

      {/* ===== FEATURED PROPERTIES ===== */}
      <section
        className="relative bg-cover bg-center bg-no-repeat py-20 px-6 md:px-12"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dlu8e511s/image/upload/v1760441982/luxury-bg_ngzskj.png')",
        }}
      >
        <div className="relative z-10">
          <h2 className="text-6xl font-extrabold text-white mb-12 text-center drop-shadow-lg">
            Featured Properties
          </h2>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {currentProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-10">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-5 py-2 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (num) => (
                  <button
                    key={num}
                    onClick={() => setCurrentPage(num)}
                    className={`px-5 py-2 rounded-full font-medium ${
                      currentPage === num
                        ? "bg-indigo-600 text-white shadow-md"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {num}
                  </button>
                )
              )}
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-5 py-2 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ===== YOUTUBE VIDEO SECTION ===== */}
      <section className="relative bg-gray-900 py-20 mt-24 rounded-2xl overflow-hidden shadow-2xl mx-6 md:mx-12">
        <div className="absolute inset-0">
          <img
            src="/video-bg.jpg"
            alt="Luxury background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative z-10 text-center w-[90%] md:w-[70%] mx-auto"
        >
          <h2 className="text-4xl font-extrabold text-white mb-6">
            Discover Our Vision for Modern Living
          </h2>
          <p className="text-gray-300 text-lg mb-10">
            Take a closer look at our premium properties and explore the future
            of luxurious real estate across Nigeria.
          </p>
          <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 mx-auto">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/rMdN--kRx68?autoplay=0&rel=0&modestbranding=1"
              title="Luxury Real Estate Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </motion.div>
      </section>

      {/* ===== APP DOWNLOAD SECTION ===== */}
      <div className="bg-gray-50 py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Find new properties anytime, anywhere!
        </h2>
        <p className="text-gray-600 mb-10 max-w-xl mx-auto">
          Download our Android or iOS app to get quick access to properties from
          your phone.
        </p>

        <div className="flex justify-center gap-6 mb-8">
          <img
            src="/phone1.png"
            alt="Mobile app preview 1"
            className="w-48 md:w-64 rounded-2xl shadow-lg"
          />
          <img
            src="/phone2.png"
            alt="Mobile app preview 2"
            className="w-48 md:w-64 rounded-2xl shadow-lg"
          />
        </div>

        <div className="flex justify-center gap-4">
          <a
            href="https://play.google.com/store"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/googleplay.svg"
              alt="Get it on Google Play"
              className="h-12"
            />
          </a>
          <a
            href="https://apps.apple.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/appstore.svg"
              alt="Download on App Store"
              className="h-12"
            />
          </a>
        </div>
      </div>

      {/* ===== FINAL CTA ===== */}
      <div className="text-center mt-16">
        <Link
          to="/properties"
          className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-all duration-300"
        >
          View All Properties
        </Link>

        <p className="text-gray-600 mt-6 text-lg max-w-2xl mx-auto mb-4">
          Discover exclusive listings from Akins Luxury Homes — premium estates,
          smart investments, and elegant lifestyles designed for you.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
