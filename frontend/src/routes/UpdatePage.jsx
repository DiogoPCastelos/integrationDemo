import React, { useState } from "react";
import { Navbar } from "../components";
import UserList from "../components/UserList";
import { clearUsers } from "../services/userService";

const UpdatePage = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleClearAll = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete all users? This action cannot be undone."
      )
    ) {
      try {
        await clearUsers();
        setRefreshTrigger((prev) => prev + 1);
      } catch (error) {
        console.error("Error clearing users", error);
      }
    }
  };

  return (
    <div className="w-full">
      <Navbar />
      <div className="bg-gradient-to-br from-50% from-peachz to-greenz text-white min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-md rounded-2xl px-8 pt-6 pb-8 m-6">
            <h3 className="text-2xl font-bold mb-4 text-gray-700">
              User Management
            </h3>
            <p className="text-gray-600 mb-4">
              Here you can delete individual users or clear all users from the
              system.
            </p>
            <button
              onClick={handleClearAll}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline transition duration-500"
            >
              Clear All Users
            </button>
          </div>

          <UserList
            userAdded={refreshTrigger}
            showDelete={true}
            showEdit={true}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdatePage;
