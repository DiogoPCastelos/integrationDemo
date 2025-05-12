import axios from "axios";

const API_BASE_URL = "/api/rest/users";

// Get all users from the API
export const getUsers = async () => {
  // TODO
  // Atention! You should add the following header -> "ngrok-skip-browser-warning": "69420"
};

// Create a new user via the API
export const createUser = async (userData) => {
  // TODO
};

// Optionally: Update an existing user via the API
export const updateUser = async (userId, userData) => {
  // TODO
};

// Optionally: Delete a user via the API
export const deleteUser = async (userId) => {
  try {
    await axios.delete(`${API_BASE_URL}/${userId}`);
    return true;
  } catch (error) {
    console.error("Error deleting user via API", error);
    throw new Error("Failed to delete user");
  }
};