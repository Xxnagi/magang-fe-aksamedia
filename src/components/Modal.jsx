import React, { useEffect, useState } from "react";

const Modal = ({ isOpen, onClose, onSave, initialData = null }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    year: "",
  });

  const resetFormData = () => {
    setFormData({
      title: "",
      author: "",
      year: "",
    });
  };

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      resetFormData();
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.author || !formData.year) {
      alert("Please fill all the fields");
      return;
    }
    onSave(formData);
    onClose();
  };

  const handleCancel = () => {
    resetFormData();
    onClose();
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-1/3 p-6">
        <h2 className="text-lg font-bold mb-4">
          {initialData ? "Edit Data" : "Add New Data"}
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2"
            placeholder="Enter title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2"
            placeholder="Enter author"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Year</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2"
            placeholder="Enter year"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
