import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import ThemeSwitcher from "./ThemeSwitcher";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const displayName = user?.fullName || user?.username;

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700 p-4 transition-colors duration-200">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="flex gap-2 items-center">
          <img src="logo.png" alt="" className="w-10" />
          <h1 className="text-lg font-bold text-gray-800 dark:text-white hidden sm:block">
            AKSA LIBRARY
          </h1>
        </Link>
        <div className="relative" ref={dropdownRef}>
          <div className="flex items-center gap-4">
            <ThemeSwitcher />
            <div className="text-gray-700 dark:text-gray-200">
              {displayName}
            </div>
            <div className="bg-white rounded-full">
              <img
                src="person.png"
                alt=""
                className="w-9 h-9 cursor-pointer rounded-full border-2 border-transparent "
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              />
            </div>
          </div>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setIsDropdownOpen(false)}
              >
                <div className="flex items-center gap-2">Profile</div>
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center gap-2">Logout</div>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
