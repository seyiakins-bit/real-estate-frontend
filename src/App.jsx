// src/App.jsx
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Layout
import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages
import HomePage from "./pages/HomePage";
import AddPropertyPage from "./pages/AddPropertyPage";
import EditPropertyPage from "./pages/EditPropertyPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import PropertiesPage from "./pages/PropertiesPage";
import AdminDashboard from "./pages/AdminDashboard";

// Property Pages
import LuxuryApartment from "./pages/LuxuryApartment";
import BeachHouse from "./pages/BeachHouse";
import ModernDuplex from "./pages/ModernDuplex";
import LuxWater from "./pages/LuxWater";
import RoomBung from "./pages/RoomBung";
import LuxSmart from "./pages/Luxsmart";
import PrimeP from "./pages/PrimeP";
import BeachHouse1 from "./pages/BeachHouse1";
import BeachHouse2 from "./pages/BeachHouse2";
import ModernDuplex1 from "./pages/ModernDuplex1";
import ModernDuplex2 from "./pages/ModernDuplex2";
import CozyBungalow from "./pages/CozyBungalow";
import CozyBungalow1 from "./pages/CozyBungalow1";
import CozyBungalow2 from "./pages/CozyBungalow2";
import UrbanPenthouse from "./pages/UrbanPenthouse";
import UrbanPenthouse1 from "./pages/UrbanPenthouse1";
import UrbanPenthouse2 from "./pages/UrbanPenthouse2";
import UrbanPenthouse3 from "./pages/UrbanPenthouse3";
import UrbanPenthouse4 from "./pages/UrbanPenthouse4";
import FamilyDuplex from "./pages/FamilyDuplex";
import FamilyDuplex1 from "./pages/FamilyDuplex1";
import FamilyDuplex2 from "./pages/FamilyDuplex2";
import SuburbanVilla from "./pages/SuburbanVilla";
import SuburbanVilla1 from "./pages/SuburbanVilla1";
import SuburbanVilla2 from "./pages/SuburbanVilla2";
import CityApartment from "./pages/CityApartment";
import CityApartment1 from "./pages/CityApartment1";
import CityApartment2 from "./pages/CityApartment2";
import EstateMansion from "./pages/EstateMansion";
import EstateMansion1 from "./pages/EstateMansion1";
import EstateMansion2 from "./pages/EstateMansion2";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Question from "./pages/Question";
import PrivatePolicy from "./pages/PrivatePolicy";
import TermsConditions from "./pages/TermsConditions";

function App() {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);

  // ✅ Safe JSON parse
  const safeParse = (data) => {
    try {
      return data && data !== "undefined" ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  };

  // ✅ Load saved auth info on start
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = safeParse(localStorage.getItem("userData"));
    if (storedToken) setToken(storedToken);
    if (storedUser) setUserData(storedUser);
  }, []);

  // ✅ Handle login (redirect accordingly)
  const handleLogin = (token, user) => {
    setToken(token);
    setUserData(user);
    localStorage.setItem("authToken", token);
    localStorage.setItem("userData", JSON.stringify(user));

    // Redirect based on role
    if (user?.role === "admin") {
      window.location.href = "/admin-dashboard";
    } else {
      window.location.href = "/";
    }
  };

  // ✅ Handle logout (redirect to homepage)
  const handleLogout = () => {
    setToken(null);
    setUserData(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    window.location.href = "/";
  };

  return (
    <Router>
      <Header token={token} userData={userData} onLogout={handleLogout} />

      <main className="min-h-screen pt-20">
        <Routes>
          {/* 🏠 Everyone sees homepage */}
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />

          {/* 🔐 Authentication */}
          <Route
            path="/login"
            element={
              !token ? (
                <LoginPage onLogin={handleLogin} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/register"
            element={!token ? <RegisterPage /> : <Navigate to="/" replace />}
          />
          <Route
            path="/admin-login"
            element={
              !token ? (
                <AdminLoginPage onLogin={handleLogin} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          {/* 📄 Public pages */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<Question />} />
          <Route path="/privacy-policy" element={<PrivatePolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/properties" element={<PropertiesPage />} />

          {/* 🏘️ Property details */}
          <Route path="/LuxuryApartment" element={<LuxuryApartment />} />
          <Route path="/BeachHouse" element={<BeachHouse />} />
          <Route path="/ModernDuplex" element={<ModernDuplex />} />
          <Route path="/LuxWater" element={<LuxWater />} />
          <Route path="/RoomBung" element={<RoomBung />} />
          <Route path="/LuxSmart" element={<LuxSmart />} />
          <Route path="/PrimeP" element={<PrimeP />} />
          <Route path="/BeachHouse1" element={<BeachHouse1 />} />
          <Route path="/BeachHouse2" element={<BeachHouse2 />} />
          <Route path="/ModernDuplex1" element={<ModernDuplex1 />} />
          <Route path="/ModernDuplex2" element={<ModernDuplex2 />} />
          <Route path="/CozyBungalow" element={<CozyBungalow />} />
          <Route path="/CozyBungalow1" element={<CozyBungalow1 />} />
          <Route path="/CozyBungalow2" element={<CozyBungalow2 />} />
          <Route path="/UrbanPenthouse" element={<UrbanPenthouse />} />
          <Route path="/UrbanPenthouse1" element={<UrbanPenthouse1 />} />
          <Route path="/UrbanPenthouse2" element={<UrbanPenthouse2 />} />
          <Route path="/UrbanPenthouse3" element={<UrbanPenthouse3 />} />
          <Route path="/UrbanPenthouse4" element={<UrbanPenthouse4 />} />
          <Route path="/FamilyDuplex" element={<FamilyDuplex />} />
          <Route path="/FamilyDuplex1" element={<FamilyDuplex1 />} />
          <Route path="/FamilyDuplex2" element={<FamilyDuplex2 />} />
          <Route path="/SuburbanVilla" element={<SuburbanVilla />} />
          <Route path="/SuburbanVilla1" element={<SuburbanVilla1 />} />
          <Route path="/SuburbanVilla2" element={<SuburbanVilla2 />} />
          <Route path="/CityApartment" element={<CityApartment />} />
          <Route path="/CityApartment1" element={<CityApartment1 />} />
          <Route path="/CityApartment2" element={<CityApartment2 />} />
          <Route path="/EstateMansion" element={<EstateMansion />} />
          <Route path="/EstateMansion1" element={<EstateMansion1 />} />
          <Route path="/EstateMansion2" element={<EstateMansion2 />} />

          {/* 🧑‍💼 Admin Dashboard */}
          <Route
            path="/admin-dashboard"
            element={
              token && userData?.role === "admin" ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          {/* 🏗️ Property Management (Admin only) */}
          <Route
            path="/add-property"
            element={
              token && userData?.role === "admin" ? (
                <AddPropertyPage />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/edit-property/:id"
            element={
              token && userData?.role === "admin" ? (
                <EditPropertyPage />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          {/* 404 fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
