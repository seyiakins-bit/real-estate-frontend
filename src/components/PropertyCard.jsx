import React from "react";
import { Link, useNavigate } from "react-router-dom";

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  // Safe price display logic
  const getPriceTag = () => {
    if (!property.price) {
      switch (property.title) {
        case "Luxury Apartment":
          return "₦100,000,000+";
        case "Modern Duplex":
          return "₦50,000,000 - ₦100,000,000";
        case "Beach House":
        case "Cozy Bungalow":
          return "₦15,000,000 - ₦50,000,000";
        default:
          return "Price on Request";
      }
    }

    // Safe numeric formatting
    const numericPrice = Number(property.price);
    if (isNaN(numericPrice)) return property.price; // handle if it's already formatted like "₦120,000,000"
    return `₦${numericPrice.toLocaleString()}`;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1">
      {/* Property Image */}
      <div className="overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-56 object-cover transform hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Property Info */}
      <div className="p-5">
        <h3
          onClick={() => navigate(property.link)}
          className="text-xl font-semibold text-indigo-700 hover:text-indigo-900 cursor-pointer mb-2"
        >
          {property.title}
        </h3>

        <p className="text-gray-600 text-sm mb-2">{property.location}</p>
        <p className="text-gray-700 font-medium mb-2">{property.type}</p>
        <p className="text-indigo-600 font-bold">{getPriceTag()}</p>

        <Link
          to={property.link}
          className="mt-4 w-full inline-block bg-indigo-600 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-indigo-700 transition-colors duration-300 text-center shadow"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
