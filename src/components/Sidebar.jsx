import { useState } from "react";
import { Home, PlusCircle, Users, FileText, Box, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(true);

  const links = [
    { name: "Dashboard", tab: "dashboard", icon: <Home size={18} /> },
    { name: "Add Property", tab: "add-property", icon: <PlusCircle size={18} /> },
    { name: "Property Management", tab: "property-management", icon: <Box size={18} /> },
    { name: "User Management", tab: "user-management", icon: <Users size={18} /> },
    { name: "Inquiries & Messages", tab: "inquiries", icon: <FileText size={18} /> },
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

            {/* Navigation Links */}
            <nav className="flex-1 p-4 space-y-2">
              {links.map((link) => {
                const isActive = activeTab === link.tab;
                return (
                  <button
                    key={link.name}
                    onClick={() => setActiveTab(link.tab)}
                    className={`w-full flex items-center gap-3 p-2 rounded hover:bg-blue-50 text-left ${
                      isActive ? "bg-blue-100 text-blue-700 font-semibold" : "text-gray-700"
                    }`}
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </button>
                );
              })}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Sidebar;
