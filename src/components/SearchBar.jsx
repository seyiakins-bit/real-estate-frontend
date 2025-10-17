// src/components/SearchBar.jsx
import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query); // send search text to HomePage
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center space-x-2 mb-4"
    >
      <input
        type="text"
        placeholder="Search by title or location..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
