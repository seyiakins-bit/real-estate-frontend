// src/pages/SuburbanVilla.jsx
import React from "react";
import { Link } from "react-router-dom";

const properties = [
  {
    id: 1,
    title: "Luxurious 5-Bedroom Suburban Villa",
    type: "Suburban Villa",
    location: "Ikoyi, Lagos",
    bedrooms: 5,
    bathrooms: 5,
    toilets: 6,
    price: "₦150,000,000",
    image:
      "https://res.cloudinary.com/dlu8e511s/image/upload/v1760302564/subarnvilla_k0kbej.jpg",
    link: "/suburbanvilla1",
  },
  {
    id: 2,
    title: "Elegant 6-Bedroom Villa with Private Pool",
    type: "Suburban Villa",
    location: "Banana Island, Lagos",
    bedrooms: 6,
    bathrooms: 6,
    toilets: 7,
    price: "₦220,000,000",
    image:
      "https://res.cloudinary.com/dlu8e511s/image/upload/v1760302598/subarnvilla3_cfiuis.jpg",
    link: "/suburbanvilla2",
  },
];

function SuburbanVilla() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">Suburban Villas</h1>

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

export default SuburbanVilla;
