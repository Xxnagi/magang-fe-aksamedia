import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Modal from "./Modal";

const Table = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page"), 10) || 1
  );
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const storedData = JSON.parse(localStorage.getItem("books")) || [];
    setData(storedData);
    setLoading(false);
  }, []);

  useEffect(() => {
    let filtered = data.filter(
      (item) =>
        item.title?.toLowerCase().includes(search.toLowerCase()) ||
        item.author?.toLowerCase().includes(search.toLowerCase()) ||
        item.year?.toLowerCase().includes(search.toLowerCase())
    );

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key]?.toLowerCase() || "";
        const bValue = b[sortConfig.key]?.toLowerCase() || "";
        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    setFilteredData(filtered);
    setSearchParams({ q: search, page: currentPage });
  }, [data, search, currentPage, setSearchParams, sortConfig]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPageData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleSort = (key) => {
    setSortConfig((prevSort) => ({
      key,
      direction:
        prevSort.key === key && prevSort.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      const updatedData = data.filter((item) => item.id !== id);
      setData(updatedData);
      localStorage.setItem("books", JSON.stringify(updatedData));
    }
  };

  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column) {
      return <span className="ml-1 text-gray-400 dark:text-gray-500">↕</span>;
    }
    return (
      <span className="ml-1">{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
    );
  };

  return (
    <div className="p-4 mx-auto bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow">
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start justify-between">
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-all bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
          />
        </div>
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          className="px-3 py-2 border rounded-lg   outline-none bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
        </select>
      </div>

      <div className="overflow-x-auto w-full -mx-4 sm:mx-0 px-4 sm:px-0">
        <table className="w-full border-collapse bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {["Title", "Author", "Year"].map((header, index) => (
                <th
                  key={index}
                  onClick={() => handleSort(header.toLowerCase())}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <div className="flex items-center">
                    {header}
                    <SortIcon column={header.toLowerCase()} />
                  </div>
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : currentPageData.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                >
                  No books found
                </td>
              </tr>
            ) : (
              currentPageData.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">{item.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.author}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.year}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setCurrentEdit(item);
                          setIsModalOpen(true);
                        }}
                        className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white px-3 py-1 rounded transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700 text-white px-3 py-1 rounded transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex flex-col sm:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            Previous
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-400  transition-colors"
          >
            Next
          </button>
        </div>
        <span className="text-sm text-gray-600 dark:text-gray-100  transition-colors">
          Page {currentPage} of {totalPages || 1}
        </span>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setCurrentEdit(null);
          }}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
        >
          Add New Book
        </button>
      </div>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialData={currentEdit}
          onSave={(book) => {
            if (book.id) {
              const updatedData = data.map((item) =>
                item.id === book.id ? book : item
              );
              setData(updatedData);
              localStorage.setItem("books", JSON.stringify(updatedData));
            } else {
              const newBook = { ...book, id: Date.now() };
              const newData = [...data, newBook];
              setData(newData);
              localStorage.setItem("books", JSON.stringify(newData));
            }
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Table;
