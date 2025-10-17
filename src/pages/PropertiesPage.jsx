import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";

const allProperties = [
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
      "https://res.cloudinary.com/dlu8e511s/image/upload/v1758798743/modern-penthouse_lagos_bx1acp.jpg",
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
      "https://res.cloudinary.com/dlu8e511s/image/upload/v1758798745/duplex-family_abuja_s8iqak.jpg",
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
      "https://res.cloudinary.com/dlu8e511s/image/upload/v1758798751/villa_magodo_m7xfsj.jpg",
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
      "https://res.cloudinary.com/dlu8e511s/image/upload/v1758798753/city-apartment_lagos_wtiv7o.jpg",
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
      "https://res.cloudinary.com/dlu8e511s/image/upload/v1758798758/mansion_abuja_t8e7z1.jpg",
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
  {
    id: 11,
    title: "Lakeview Duplex",
    location: "Ajah, Lagos",
    type: "Duplex",
    bedrooms: 4,
    bathrooms: 3,
    image:
      "https://res.cloudinary.com/dlu8e511s/image/upload/v1758798763/lakeview-duplex_ajah_mkuexp.jpg",
    link: "/LakeviewDuplex",
  },
  {
    id: 12,
    title: "Mini Apartment",
    location: "Yaba, Lagos",
    type: "Apartment",
    bedrooms: 2,
    bathrooms: 1,
    image:
      "https://res.cloudinary.com/dlu8e511s/image/upload/v1758798765/mini-apartment_yaba_lqv9bn.jpg",
    link: "/MiniApartment",
  },
  {
    id: 13,
    title: "Luxury Villa",
    location: "Asokoro, Abuja",
    type: "Villa",
    bedrooms: 6,
    bathrooms: 5,
    image:
      "https://res.cloudinary.com/dlu8e511s/image/upload/v1758798767/luxury-villa_asokoro_evohva.jpg",
    link: "/LuxuryVilla",
  },
  {
    id: 14,
    title: "Modern Condo",
    location: "Ikeja GRA, Lagos",
    type: "Condo",
    bedrooms: 3,
    bathrooms: 2,
    image:
      "https://res.cloudinary.com/dlu8e511s/image/upload/v1758798769/modern-condo_ikeja_mghabf.jpg",
    link: "/ModernCondo",
  },
];

const PropertiesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 9;
  const totalPages = Math.ceil(allProperties.length / propertiesPerPage);

  const indexOfLast = currentPage * propertiesPerPage;
  const indexOfFirst = indexOfLast - propertiesPerPage;
  const currentProperties = allProperties.slice(indexOfFirst, indexOfLast);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 text-gray-800 py-20 px-6 md:px-12">
      {/* ===== TITLE ===== */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12"
      >
        All Available Properties
      </motion.h1>

      {/* ===== GRID ===== */}
      <div className="w-[100%] mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {currentProperties.map((property, index) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl bg-white"
          >
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-all duration-300"></div>

            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-2xl font-semibold">{property.title}</h3>
              <p className="text-gray-200">{property.location}</p>
              <Link
                to={property.link}
                className="mt-3 inline-block bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-5 py-2 rounded-full shadow-md transition-all duration-300"
              >
                View Details
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ===== PAGINATION ===== */}
      <div className="flex justify-center items-center gap-4 mt-12">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-5 py-2 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50 transition"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-5 py-2 rounded-full font-medium transition ${
              currentPage === i + 1
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-5 py-2 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50 transition"
        >
          Next
        </button>
      </div>

      {/* ===== BACK TO HOME ===== */}
      <div className="text-center mt-16">
        <Link
          to="/"
          className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold px-8 py-3 rounded-full shadow-md transition-all duration-300"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PropertiesPage;
