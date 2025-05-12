import React, { useState } from "react";
import { Navbar } from "../components";
import UserList from "../components/UserList";

const UpdatePage = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

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
              Here you can update or delete individual users from the system.
            </p>
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
