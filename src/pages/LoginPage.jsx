import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RealEstateBg from "../assets/real-estate-bg.jpg";

const LoginPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false); // toggle for admin mode
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const url = isAdmin
        ? "https://real-estate-backend-z8aa.onrender.com/api/auth/admin/login"
        : "https://real-estate-backend-z8aa.onrender.com/api/auth/login";

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ Pass both token and user data to onLogin
        if (onLogin) onLogin(data.token, data.user);

        // ✅ Save auth data locally
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userData", JSON.stringify(data.user));

        // ✅ Navigate based on role
        const role = data.user?.role?.toLowerCase();
        navigate(role === "admin" ? "/admin-dashboard" : "/home", { replace: true });
      } else {
        setError(data.message || "Login failed. Check your credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please check your connection or try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${RealEstateBg})` }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between mb-6">
          <button
            onClick={() => setIsAdmin(false)}
            className={`px-3 py-2 w-1/2 rounded-l-md font-medium ${
              !isAdmin
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Switch to User
          </button>
         <button
            onClick={() => navigate("/admin-login")} // redirect to admin login
            className="px-3 py-2 w-1/2 rounded-r-md font-medium bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Switch to Admin
          </button>
        </div>

        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
          {isAdmin ? "Admin Login" : "User Login"}
        </h1>

        {error && <p className="text-red-600 mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading
              ? "Logging in..."
              : isAdmin
              ? "Login as Admin"
              : "Login as User"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-700">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
