import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Home, PlusCircle, Users, FileText, Menu, X, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("adminEmail");
    navigate("/login");
  };

  const links = [
    { name: "Dashboard", path: "/admin", icon: <Home size={18} /> },
    { name: "Add Property", path: "/add-property", icon: <PlusCircle size={18} /> },
    { name: "User Management", path: "/admin/users", icon: <Users size={18} /> },
    { name: "Inquiries & Messages", path: "/admin/inquiries", icon: <FileText size={18} /> },
  ];

  return (
    <div className="relative">
      {/* Toggle button for mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-4 left-4 z-50 p-2 bg-white border rounded-md shadow md:hidden"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar container */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            exit={{ x: -250 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 h-screen w-64 bg-white border-r shadow-sm flex flex-col z-40 overflow-y-auto"
          >
            {/* Admin Panel Header */}
            <div className="p-6 border-b text-2xl font-bold text-blue-700">
              Admin Panel
            </div>

            {/* Nav links */}
            <nav className="flex-1 p-4 space-y-2">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 p-2 rounded hover:bg-blue-50 ${
                    location.pathname === link.path
                      ? "bg-blue-100 text-blue-700 font-semibold"
                      : "text-gray-700"
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              ))}
            </nav>

            {/* Logout button */}
            <div className="p-4 border-t mt-auto">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Sidebar;
