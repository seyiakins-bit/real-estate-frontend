import { Link, useNavigate } from "react-router-dom";
import { Home, PlusCircle, LogOut } from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="w-64 bg-white border-r shadow-sm flex flex-col">
      <div className="p-6 border-b text-2xl font-bold text-blue-700">
        Admin Panel
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <Link to="/admin" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
          <Home size={18} /> Dashboard
        </Link>

        <Link
          to="/add-property"
          className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
        >
          <PlusCircle size={18} /> Add Property
        </Link>
      </nav>

      <button
        onClick={handleLogout}
        className="m-4 p-2 flex items-center justify-center bg-red-500 text-white rounded hover:bg-red-600"
      >
        <LogOut size={18} className="mr-2" /> Logout
      </button>
    </div>
  );
};

export default Sidebar;
