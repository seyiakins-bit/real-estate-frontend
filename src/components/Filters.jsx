// src/components/Filters.jsx
import React, { useState } from "react";

const Filters = ({ onFilter }) => {
  const [location, setLocation] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const handleApply = () => {
    onFilter({ location, bedrooms, priceRange });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {/* Location */}
      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Locations</option>
        <option value="Lagos">Lagos</option>
        <option value="Lekki">Lekki</option>
        <option value="Victoria Island">Victoria Island</option>
        <option value="Ikeja">Ikeja</option>
      </select>

      {/* Bedrooms */}
      <select
        value={bedrooms}
        onChange={(e) => setBedrooms(e.target.value)}
        className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Any Bedrooms</option>
        <option value="2">2+</option>
        <option value="3">3+</option>
        <option value="4">4+</option>
        <option value="5">5+</option>
      </select>

      {/* Price */}
      <select
        value={priceRange}
        onChange={(e) => setPriceRange(e.target.value)}
        className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Any Price</option>
        <option value="0-50000000">₦0 - ₦50M</option>
        <option value="50000001-100000000">₦50M - ₦100M</option>
        <option value="100000001-999999999">₦100M+</option>
      </select>

      <button
        type="button"
        onClick={handleApply}
        className="sm:col-span-3 bg-yellow-400 text-black font-medium px-4 py-2 rounded-lg hover:bg-yellow-500 transition"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default Filters;
