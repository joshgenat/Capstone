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

// Function to toggle the LED state
export const toggleFloorLight = async (toggleState) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/toggleFloorLight`, {
      toggle: toggleState,
    });
    return response.data; // Handle the response as needed
  } catch (error) {
    console.error("Error toggling LED:", error);
    throw error; // Re-throw the error for handling in the component
  }
};

// Function to create a routine
export const createRoutine = async (routineDetails) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/routines`,
      routineDetails
    );
    return response.data; // Handle the response as needed
  } catch (error) {
    console.error("Error creating routine:", error);
    throw error; // Re-throw the error for handling in the component
  }
};

// Function to get model data by ID
export const getModelData = async (modelId) => {
  try {
    // Use the modelId in the query parameter of the URL
    const response = await axios.get(
      `${API_BASE_URL}/getModel?modelID=${modelId}`
    );
    return response.data; // Contains the model data
  } catch (error) {
    console.error("Error fetching model by ID:", error);
    throw error; // Re-throw the error for handling in the component
  }
};

// Function to toggle the flame device
export const toggleFlame = async (toggleState) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/toggleFlame`, {
      toggle: toggleState,
    });
    return response.data; // Contains the response from the server
  } catch (error) {
    console.error("Error toggling flame:", error);
    throw error; // Re-throw the error for handling in the component
  }
};
