// src/services/userService.js (with updateUser function added)
const LOCAL_STORAGE_KEY = "app_users";

// Helper to generate unique IDs
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Get all users from local storage
export const getUsers = () => {
  try {
    const usersJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    return usersJSON ? JSON.parse(usersJSON) : [];
  } catch (error) {
    console.error("Error getting users from local storage", error);
    return [];
  }
};

// Create a new user and save to local storage
export const createUser = async (userData) => {
  try {
    const users = getUsers();
    const newUser = {
      id: generateId(),
      name: userData.name,
      password: userData.password, // In a real app, you'd hash this password
      createdAt: new Date().toISOString(),
    };
    const updatedUsers = [...users, newUser];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedUsers));
    return newUser;
  } catch (error) {
    console.error("Error creating user in local storage", error);
    throw new Error("Failed to create user");
  }
};

// Update an existing user
export const updateUser = async (userId, userData) => {
  try {
    const users = getUsers();
    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      throw new Error("User not found");
    }

    // Create updated user object
    const updatedUser = {
      ...users[userIndex],
      ...userData,
      updatedAt: new Date().toISOString(),
    };

    // Replace the old user with the updated one
    const updatedUsers = [...users];
    updatedUsers[userIndex] = updatedUser;

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedUsers));
    return updatedUser;
  } catch (error) {
    console.error("Error updating user in local storage", error);
    throw new Error("Failed to update user");
  }
};

// Delete a user from local storage
export const deleteUser = async (userId) => {
  try {
    const users = getUsers();
    const updatedUsers = users.filter((user) => user.id !== userId);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedUsers));
    return true;
  } catch (error) {
    console.error("Error deleting user from local storage", error);
    throw new Error("Failed to delete user");
  }
};

// Clear all users from local storage
export const clearUsers = async () => {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    return true;
  } catch (error) {
    console.error("Error clearing users from local storage", error);
    throw new Error("Failed to clear users");
  }
};
