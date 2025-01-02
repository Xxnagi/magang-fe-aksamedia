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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);
  const itemsPerPage = 4;

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("books")) || [];
    setData(storedData);
  }, []);

  useEffect(() => {
    const filtered = data.filter(
      (item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.author.toLowerCase().includes(search.toLowerCase()) ||
        item.year.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filtered);
    setSearchParams({ q: search, page: currentPage });
  }, [data, search, currentPage, setSearchParams]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPageData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleDelete = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
    localStorage.setItem("books", JSON.stringify(updatedData));
  };

  return (
    <div>
      <div className="my-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-4 py-2 w-full"
        />
      </div>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Author</th>
            <th className="border px-4 py-2">Year</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((item) => (
            <tr key={item.id}>
              <td className="border px-4 py-2">{item.title}</td>
              <td className="border px-4 py-2">{item.author}</td>
              <td className="border px-4 py-2">{item.year}</td>
              <td className="border flex gap-4 px-4 py-2">
                <button
                  onClick={() => {
                    setCurrentEdit(item); // Set data untuk Edit
                    setIsModalOpen(true);
                  }}
                  className="bg-green-400 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(filteredData.length / itemsPerPage)}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, Math.ceil(filteredData.length / itemsPerPage))
            )
          }
          disabled={
            currentPage === Math.ceil(filteredData.length / itemsPerPage)
          }
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Next
        </button>
      </div>
      <button
        onClick={() => {
          setIsModalOpen(true);
          setCurrentEdit(null);
        }}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add New
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={currentEdit} // Data untuk edit
        onSave={(book) => {
          if (book.id) {
            // Update existing book
            const updatedData = data.map((item) =>
              item.id === book.id ? book : item
            );
            setData(updatedData);
            localStorage.setItem("books", JSON.stringify(updatedData));
          } else {
            // Create new book
            const newBook = { ...book, id: Date.now() };
            const newData = [...data, newBook];
            setData(newData);
            localStorage.setItem("books", JSON.stringify(newData));
          }
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};
export default Table;
