import { useNavigate } from "react-router-dom";
import Table from "../components/Table";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className=" bg-gray-100 dark:bg-gray-900 p-6 transition-colors duration-200">
      <div className="container mx-auto py-4">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Dashboard
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
