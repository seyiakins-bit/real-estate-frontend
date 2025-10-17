import React from "react";
import { Link } from "react-router-dom";

const properties = [
  {
    id: 1,
    title: "Skyline Urban Penthouse with Panoramic View",
    type: "Penthouse",
    location: "Banana Island, Ikoyi, Lagos",
    bedrooms: 5,
    bathrooms: 5,
    toilets: 6,
    price: "₦950,000,000",
    image:
    "https:res.cloudinary.com/dlu8e511s/image/upload/v1760169442/ubarn1_xtfdig.jpg",
    link: "/UrbanPenthouse1",
  },
  {
    id: 2,
    title: "Modern High-Rise Penthouse with Infinity Pool",
    type: "Penthouse",
    location: "Victoria Island, Lagos",
    bedrooms: 4,
    bathrooms: 5,
    toilets: 5,
    price: "₦800,000,000",
    image:
      "https://res.cloudinary.com/dlu8e511s/image/upload/v1760170733/pool1_thtlmp.jpg",
    link: "/UrbanPenthouse2",
  },
  {
    id: 3,
    title: "Luxury Duplex Penthouse with Rooftop Lounge",
    type: "Penthouse",
    location: "Lekki Phase 1, Lagos",
    bedrooms: 5,
    bathrooms: 5,
    toilets: 6,
    price: "₦870,000,000",
    image:
      "https://res.cloudinary.com/dlu8e511s/image/upload/v1760171809/lounge_iw608y.jpg",
    link: "/UrbanPenthouse3",
  },
  {
    id: 4,
    title: "Executive Penthouse with Private Elevator & Smart Tech",
    type: "Penthouse",
    location: "Eko Atlantic City, Lagos",
    bedrooms: 6,
    bathrooms: 7,
    toilets: 7,
    price: "₦1,200,000,000",
    image:
      "https://res.cloudinary.com/dlu8e511s/image/upload/v1760172696/private_o1eufx.jpg",
    link: "/UrbanPenthouse4",
  },
];

function UrbanPenthouse() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Urban Penthouses
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {properties.map((property) => (
          <div
            key={property.id}
            className="relative bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
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
                <p className="mt-1 font-medium">{property.price}</p>
              </div>
            </div>

            <div className="p-5">
              <div className="flex flex-wrap gap-4 text-gray-700 mb-4 text-sm">
                {property.bedrooms > 0 && (
                  <span>{property.bedrooms} Bedroom</span>
                )}
                {property.bathrooms > 0 && (
                  <span>{property.bathrooms} Bathroom</span>
                )}
                {property.toilets > 0 && (
                  <span>{property.toilets} Toilet</span>
                )}
              </div>
              <Link
                to={property.link}
                className="block text-center py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200"
              >
                More Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <Link
          to="/properties"
          className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-8 py-3 rounded-full transition-all duration-300"
        >
          ← Back to Properties
        </Link>
      </div>
    </div>
  );
}

export default UrbanPenthouse;
