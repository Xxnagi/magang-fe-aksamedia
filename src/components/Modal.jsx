import React, { useEffect, useState } from "react";

const Modal = ({ isOpen, onClose, onSave, initialData = null }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    year: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetFormData = () => {
    setFormData({
      title: "",
      author: "",
      year: "",
    });
    setErrors({});
  };

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      resetFormData();
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.author.trim()) {
      newErrors.author = "Author is required";
    }
    if (!formData.year) {
      newErrors.year = "Year is required";
    } else if (
      isNaN(formData.year) ||
      parseInt(formData.year) < 1000 ||
      parseInt(formData.year) > new Date().getFullYear()
    ) {
      newErrors.year = "Please enter a valid year";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await onSave(formData);
        onClose();
      } catch (error) {
        console.error("Error saving data:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleCancel = () => {
    resetFormData();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-center min-h-screen p-4 text-center sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75 transition-opacity"
          aria-hidden="true"
          onClick={handleCancel}
        ></div>

        <div className="relative inline-block bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg w-full">
          <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3  sm:mt-0 text-left w-full">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100 mb-4"
                  id="modal-title"
                >
                  {initialData ? "Edit Book" : "Add New Book"}
                </h3>
                <div className="mt-2 space-y-4">
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      value={formData.title}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md shadow-sm text-black 
                        ${
                          errors.title
                            ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        }
                        sm:text-sm p-2 border`}
                      placeholder="Enter book title"
                    />
                    {errors.title && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                        {errors.title}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="author"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Author
                    </label>
                    <input
                      type="text"
                      name="author"
                      id="author"
                      value={formData.author}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md shadow-sm text-black
                        ${
                          errors.author
                            ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        }
                        sm:text-sm p-2 border`}
                      placeholder="Enter author name"
                    />
                    {errors.author && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                        {errors.author}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="year"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Year
                    </label>
                    <input
                      type="number"
                      name="year"
                      id="year"
                      value={formData.year}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md shadow-sm text-black
                        ${
                          errors.year
                            ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        }
                        sm:text-sm p-2 border`}
                      placeholder="Enter publication year"
                      min="1000"
                      max={new Date().getFullYear()}
                    />
                    {errors.year && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                        {errors.year}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 dark:bg-blue-500 text-base font-medium text-white hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
