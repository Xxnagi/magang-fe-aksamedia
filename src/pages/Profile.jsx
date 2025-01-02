import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

const Profile = () => {
  const { user, updateUser } = useContext(UserContext);
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedUser = { ...user, fullName };
      await updateUser(updatedUser);
      setMessage({ text: "Profile updated successfully!", type: "success" });
    } catch (error) {
      setMessage({
        text: "Failed to update profile. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Edit Profile</h2>
          <p className="mt-2 text-sm text-gray-600">
            Update your personal information
          </p>
        </div>

        {message.text && (
          <div
            className={`mb-4 p-3 rounded text-sm ${
              message.type === "success"
                ? "bg-green-100 text-green-700 border border-green-400"
                : "bg-red-100 text-red-700 border border-red-400"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your full name"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } transition-colors duration-200`}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Profile Information
              </span>
            </div>
          </div>

          <div className="mt-6 text-sm text-gray-500">
            <p>Email: {user?.email}</p>
            <p>
              Member since: {new Date(user?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
