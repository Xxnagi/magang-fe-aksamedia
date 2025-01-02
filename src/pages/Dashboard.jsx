import { Link, useNavigate } from "react-router-dom";
import Table from "../components/Table";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold">Welcome, {user.username}!</h2>
        <Table />
      </div>
    </div>
  );
};
export default Dashboard;
