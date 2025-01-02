import { useNavigate } from "react-router-dom";
import Table from "../components/Table";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <div className="relative">
            <div className="flex items-center gap-4">
              <div className="">{user.username}</div>
              <img src="person.png" alt="" className="w-9 h-9" />
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
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold">Welcome, {user.username}!</h2>
        <Table />
      </div>
    </div>
  );
};
export default Dashboard;
