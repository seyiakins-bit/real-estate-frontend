// src/pages/ModernDuplex.jsx
import React from "react";
import { Link } from "react-router-dom";

const properties = [
  {
    id: 1,
    title: "Sleek 3-Bedroom Modern Duplex",
    type: "Modern Duplex",
    location: "Ayorinde Street, Victoria Island Lagos",
    bedrooms: 3,
    bathrooms: 3,
    toilets: 3,
    price: "₦70,000,000",
    image: "https://res.cloudinary.com/dlu8e511s/image/upload/v1758774752/068d3abc83014b-2-units-of-3-bedroom-flat-detached-duplexes-for-sale-lekki-ibeju-lagos_asw0bm.jpg",
    link: "/modernduplex1",
  },
  {
    id: 2,
    title: "Contemporary Duplex with Smart Home Features",
    type: "Modern Duplex",
    location: "1004 Apartment Complex Lekki, vi, Ikoyi, Oniru, Lagos",
    bedrooms: 4,
    bathrooms: 4,
    toilets: 4,
    price: "₦120,000,000",
    image: "https://res.cloudinary.com/dlu8e511s/image/upload/v1758774752/068d3abc83014b-2-units-of-3-bedroom-flat-detached-duplexes-for-sale-lekki-ibeju-lagos_asw0bm.jpg",
    link: "/modernduplex2",
  },
];

function ModernDuplex() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">Modern Duplexes</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <div
            key={property.id}
            className="relative bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-40 text-white p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <h2 className="text-lg font-semibold">{property.title}</h2>
                <p className="text-sm mt-1">{property.location}</p>
                <p className="mt-1">{property.price}</p>
              </div>
            </div>

            <div className="p-4">
              <div className="flex flex-wrap gap-4 text-gray-700 mb-4">
                {property.bedrooms > 0 && <span>{property.bedrooms} Bedroom</span>}
                {property.bathrooms > 0 && <span>{property.bathrooms} Bathroom</span>}
                {property.toilets > 0 && <span>{property.toilets} Toilet</span>}
              </div>
              <Link
                to={property.link}
                className="block text-center py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                More Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ModernDuplex;
