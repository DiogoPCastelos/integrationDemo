import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers, deleteUser } from "../services/userService";

const UserList = ({ userAdded, showDelete = false, showEdit = false }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, [userAdded]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const userList = await getUsers();
      setUsers(userList);
    } catch (error) {
      console.error("Error fetching users", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      // Refresh the list after deletion
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-2xl px-8 pt-6 pb-8 m-6">
      <h3 className="text-2xl font-bold mb-4 text-gray-700">User List</h3>
      <ul className="divide-y divide-gray-300 py-2">
        {loading ? (
          <li className="py-2 text-center text-gray-500">Loading...</li>
        ) : users && users.length > 0 ? (
          users.map((user) => (
            <li
              key={user.id}
              className="py-2 flex justify-between items-center"
            >
              <span className="text-gray-800">{user.name}</span>
              <div className="flex space-x-2">
                {showEdit && (
                  <Link
                    to={`/edit/${user.id}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium py-1 px-3 rounded-lg transition duration-300"
                  >
                    Edit
                  </Link>
                )}
                {showDelete && (
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="bg-red-500 hover:bg-red-700 text-white text-sm font-medium py-1 px-3 rounded-lg transition duration-300"
                  >
                    Delete
                  </button>
                )}
              </div>
            </li>
          ))
        ) : (
          <li className="py-2 text-center text-gray-500">No users found</li>
        )}
      </ul>
      {users && users.length > 0 && (
        <div className="text-gray-500 text-sm mt-2">
          Total users: {users.length}
        </div>
      )}
    </div>
  );
};

export default UserList;
