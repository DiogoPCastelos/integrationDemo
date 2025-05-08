import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/image.png";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-peachz text-white shadow-md">
      <div
        className="w-40 flex items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="logo" />
      </div>
      <div className="flex space-x-4">
        <button
          onClick={() => navigate("/")}
          className="hover:text-greenz cursor-pointer transition-colors duration-200"
        >
          Home
        </button>
        <button
          onClick={() => navigate("/update")}
          className="hover:text-greenz cursor-pointer transition-colors duration-200"
        >
          Update
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
