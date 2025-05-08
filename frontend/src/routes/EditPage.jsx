import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "../components";
import { getUsers, updateUser } from "../services/userService";

const EditPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const users = await getUsers();
        const foundUser = users.find((user) => user.id === userId);

        if (foundUser) {
          setUser(foundUser);
          setName(foundUser.name);
          // We don't populate the password field for security reasons
          setPassword("");
        } else {
          setError("User not found");
        }
      } catch (err) {
        setError("Error loading user data");
        console.error("Error fetching user", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create update data object
      const updateData = { name };
      // Only include password if it was changed
      if (password) {
        updateData.password = password;
      }

      // Update the user
      await updateUser(userId, updateData);

      // Navigate back (either to home or delete page based on where they came from)
      navigate("/");
    } catch (err) {
      setError("Failed to update user");
      console.error("Error updating user", err);
    }
  };

  if (loading) {
    return (
      <div className="w-full">
        <Navbar />
        <div className="bg-gradient-to-br from-50% from-peachz to-greenz text-white min-h-screen flex items-center justify-center">
          <div className="bg-white shadow-md rounded-2xl px-8 pt-6 pb-8 m-6 text-gray-700">
            Loading user data...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full">
        <Navbar />
        <div className="bg-gradient-to-br from-50% from-peachz to-greenz text-white min-h-screen flex items-center justify-center">
          <div className="bg-white shadow-md rounded-2xl px-8 pt-6 pb-8 m-6 text-gray-700">
            <div className="text-red-500">{error}</div>
            <button
              onClick={() => navigate(-1)}
              className="mt-4 bg-peachz hover:bg-greenz hover:opacity-50 text-sm text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline transition duration-500"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Navbar />
      <div className="bg-gradient-to-br from-50% from-peachz to-greenz text-white min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-2xl px-10 pt-8 pb-8 m-6"
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-700 pb-2">
              Edit User
            </h3>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                New Password (leave blank to keep current)
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-peachz hover:bg-greenz hover:opacity-50 text-sm text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline transition duration-500"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="bg-gray-300 hover:bg-gray-400 text-sm text-gray-700 font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline transition duration-500"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
