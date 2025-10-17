import React from "react";
import { Link } from "react-router-dom";

// Placeholder images (replace with Cloudinary URLs later)
const properties = [
  {
    id: 1,
    title: "Waterfront Elegance: 3-Bedroom Luxury Apartment",
    type: "Luxury Apartment",
    location: "Ikoyi, Shoreline Drive, off Onikoyi Rd, Ikoyi, Lagos",
    bedrooms: 3,
    bathrooms: 3,
    toilets: 3,
    price: "₦120,000,000",
    image: "https://res.cloudinary.com/dlu8e511s/image/upload/v1758719768/0681e23b493341-luxury-3-bedroom-waterfront-apartment-for-rent-banana-island-ikoyi-lagos_kdl3eg.jpg", // Replace with Cloudinary URL
    link: "/luxWater",
  },
  {
    id: 2,
    title: "Grand 14-Room Bungalow with Expansive Grounds",
    type: "Luxury Apartment",
    location: "Glover Street, Ikoyi, Lagos",
    bedrooms: 14,
    bathrooms: 10,
    toilets: 10,
    price: "₦350,000,000",
    image: "https://res.cloudinary.com/dlu8e511s/image/upload/v1758721250/066eddefa10a67-estate-available-for-fastest-finger-for-an-investor-28-units-block-of-flats-for-sale-ajah-lagos_hbusxc.jpg", // Replace with Cloudinary URL
    link: "/roombung",
  },
  {
    id: 3,
    title: "Contemporary Smart Home with Pool & Luxury Amenities",
    type: "Luxury Apartment",
    location: "Ajah,Eti-Osa, Lagos Lekki",
    bedrooms: 6,
    bathrooms: 6,
    toilets: 6,
    price: "₦450,000,000",
    image: "https://res.cloudinary.com/dlu8e511s/image/upload/v1758722113/0686fe01debe43-luxury-5-bed-smart-home-with-cinema-gym-swimming-pool-and-bq-for-sale-lekki-phase-1-lekki-lagos_oyadkd.jpg", // Replace with Cloudinary URL
    link: "/luxsmart",
  },
  {
    id: 4,
    title: "Premium 400-Plot Development Opportunity in Ogombo",
    type: "Luxury Apartment",
    location: "Churchgate St, Victoria Island, Lagos ",
    bedrooms: 0,
    bathrooms: 0,
    toilets: 0,
    price: "₦200,000,000",
    image: "https://res.cloudinary.com/dlu8e511s/image/upload/v1758722654/068330e157cf57-prime-land-with-shops-mixed-use-land-for-sale-sangotedo-ajah-lagos_hbjmzb.jpg", // Replace with Cloudinary URL
    link: "/PrimeP",
  },
];

function LuxuryApartment() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">
        Luxury Apartments
      </h1>

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

export default LuxuryApartment;
