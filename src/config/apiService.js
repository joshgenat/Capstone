// apiService.js
import axios from "axios";

const API_BASE_URL = "http://143.198.41.186/IoTApp";

// Function to get the model (probability of light being on for each hour)
export const getModel = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getModel`);
    return response.data; // Contains the probability data
  } catch (error) {
    console.error("Error fetching model data:", error);
    throw error; // Re-throw the error for handling in the component
  }
};

// Function to toggle the LED state
export const toggleLed = async (toggleState) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/toggleLed`, {
      toggle: toggleState,
    });
    return response.data; // Handle the response as needed
  } catch (error) {
    console.error("Error toggling LED:", error);
    throw error; // Re-throw the error for handling in the component
  }
};
