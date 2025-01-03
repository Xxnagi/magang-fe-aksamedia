import React, { useEffect, useRef, useState } from "react";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState(
    () =>
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeChange = (selectedTheme) => {
    if (selectedTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      setTheme(systemTheme);
      localStorage.removeItem("theme");
    } else {
      setTheme(selectedTheme);
    }
    setIsDropdownOpen(false);
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
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="inline-flex bg-gray-200 justify-center items-center w-10 h-10 rounded-full border border-gray-300 shadow-sm  dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50"
      >
        {theme === "light" && (
          <span className="text-lg">
            <img src="sun.png" alt="" className="w-6" />
          </span>
        )}
        {theme === "dark" && (
          <span className="text-lg">
            {" "}
            <img src="moon.png" alt="" className="w-6" />
          </span>
        )}
        {theme === "system" && (
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 2a1 1 0 011 1v2a1 1 0 01-2 0V3a1 1 0 011-1zm0 15a4 4 0 100-8 4 4 0 000 8zm0 3a1 1 0 011 1v2a1 1 0 01-2 0v-2a1 1 0 011-1zm7.071-14.071a1 1 0 011.414 0l1.414 1.414a1 1 0 01-1.414 1.414L18.07 4.343a1 1 0 010-1.414zM4.343 18.071a1 1 0 010 1.414l-1.414 1.414a1 1 0 01-1.414-1.414l1.414-1.414a1 1 0 011.414 0zM21 11a1 1 0 011 1v2a1 1 0 01-2 0v-2a1 1 0 011-1zM3 12a1 1 0 011-1h2a1 1 0 010 2H4a1 1 0 01-1-1zm17.071 7.071a1 1 0 011.414 0l1.414 1.414a1 1 0 01-1.414 1.414L18.07 20.343a1 1 0 010-1.414zM4.343 5.929a1 1 0 011.414-1.414L7.071 5.93a1 1 0 01-1.414 1.414L4.343 5.929z" />
          </svg>
        )}
      </button>

      {isDropdownOpen && (
        <div
          className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg  bg-white border border-gray-200 dark:border-gray-700 dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            <button
              onClick={() => handleThemeChange("light")}
              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
              role="menuitem"
            >
              Light
            </button>
            <button
              onClick={() => handleThemeChange("dark")}
              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
              role="menuitem"
            >
              Dark
            </button>
            <button
              onClick={() => handleThemeChange("system")}
              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
              role="menuitem"
            >
              System
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
