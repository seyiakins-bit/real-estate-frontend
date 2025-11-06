import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import DashboardOverview from "../components/DashboardOverview";
import AddPropertyForm from "../components/AddPropertyForm";
import UserManagement from "../components/UserManagement";
import InquiriesMessages from "../components/InquiriesMessages";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [properties, setProperties] = useState([]);
  const [users, setUsers] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) return;

        // Fetch properties
        const propRes = await fetch(
          "https://real-estate-backend-z8aa.onrender.com/api/properties",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const propData = await propRes.json();
        setProperties(Array.isArray(propData) ? propData : []);

        // Fetch users
        const userRes = await fetch(
          "https://real-estate-backend-z8aa.onrender.com/api/users",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const userData = await userRes.json();
        setUsers(Array.isArray(userData) ? userData : []);

        // Fetch inquiries (assuming endpoint exists)
        const inquiriesRes = await fetch(
          "https://real-estate-backend-z8aa.onrender.com/api/inquiries",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const inquiriesData = await inquiriesRes.json();
        setInquiries(Array.isArray(inquiriesData) ? inquiriesData : []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-auto md:ml-64">
        <TopBar />

        <div className="p-6">
          {activeTab === "dashboard" && <DashboardOverview properties={properties} users={users} />}
          {activeTab === "add-property" && <AddPropertyForm />}
          {activeTab === "user-management" && <UserManagement users={users} />}
          {activeTab === "inquiries" && <InquiriesMessages inquiries={inquiries} />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
