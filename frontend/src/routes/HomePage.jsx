import React, { useState } from "react";
import { Navbar } from "../components";
import UserForm from "../components/UserForm";
import UserList from "../components/UserList";

const HomePage = () => {
  const [userAdded, setUserAdded] = useState(null);

  const handleUserAdded = (newUser) => {
    setUserAdded(newUser);
  };

  return (
    <div className="w-full">
      <Navbar />
      <div className="bg-gradient-to-br from-50% from-peachz to-greenz text-white min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md">
          <UserForm onUserAdded={handleUserAdded} />
          <UserList userAdded={userAdded} showDelete={false} showEdit={false} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
