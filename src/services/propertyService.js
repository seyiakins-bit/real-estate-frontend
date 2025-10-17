// src/services/propertyService.js
import axios from "axios";

// Replace with your backend API URL
const BASE_URL = "http://localhost:5000/api";

// Add a new property
export const addProperty = async (propertyData) => {
  const response = await axios.post(`${BASE_URL}/properties`, propertyData);
  return response.data;
};

// Get all properties
export const getProperties = async () => {
  const response = await axios.get(`${BASE_URL}/properties`);
  return response.data;
};

// Get property by ID
export const getPropertyById = async (id) => {
  const response = await axios.get(`${BASE_URL}/properties/${id}`);
  return response.data;
};

// ✅ Update/Edit property by ID
export const updateProperty = async (id, propertyData) => {
  const response = await axios.put(`${BASE_URL}/properties/${id}`, propertyData);
  return response.data;
};
