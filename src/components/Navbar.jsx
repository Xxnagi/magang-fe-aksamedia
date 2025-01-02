import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const displayName = user?.fullName || user?.username;

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="flex gap-2 items-center">
          <img src="logo.png" alt="" className="w-10" />
          <h1 className="text-lg font-bold">AKSA LIBRARY</h1>
        </Link>
        <div className="relative">
          <div className="flex items-center gap-4">
            <div className="">{displayName}</div>
            <Link to="/profile">
              <img src="person.png" alt="" className="w-9 h-9" />
            </Link>
          </div>
          <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow">
            <button
              onClick={handleLogout}
              className="block w-full px-4 py-2 text-left hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
