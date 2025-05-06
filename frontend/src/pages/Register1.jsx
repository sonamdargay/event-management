// src/pages/Register1.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../axiosConfig";

export default function Register1() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/api/auth/register", formData);
      alert("Registration successful. Please log in.");
      navigate("/login1");
    } catch {
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 1. top dark bar matching Home page */}
      <div className="w-full h-14" style={{ backgroundColor: "#333" }} />

      {/* 2. Event Management header with underline */}
      <div className="w-full pl-12 pr-6 py-6">
        <h1 className="text-3xl font-bold leading-tight">
          Event
          <br />
          Management
        </h1>
        <div className="border-t border-gray-300 mt-2" />
      </div>

      {/* 3. SIGN UP form */}
      <div className="max-w-md mx-auto px-6">
        <h2 className="text-center text-4xl font-extrabold mb-8">SIGN UP</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-3 bg-gray-100 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full p-3 bg-gray-100 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full p-3 bg-gray-100 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-md hover:opacity-90"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">Or,</p>

        <div className="mt-6 space-y-3">
          {/* ← Google button now navigates to /userpage */}
          <button
            type="button"
            onClick={() => navigate("/userpage")}
            className="w-full flex items-center justify-center p-3 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            <img
              src="https://img.icons8.com/color/16/google-logo.png"
              alt="Google"
              className="mr-2"
            />
            Sign up with Google
          </button>
          <button
            type="button"
            className="w-full flex items-center justify-center p-3 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            <img
              src="https://img.icons8.com/ios-filled/16/mac-os.png"
              alt="Apple"
              className="mr-2"
            />
            Sign up with Apple
          </button>
          <button
            type="button"
            className="w-full flex items-center justify-center p-3 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            <img
              src="https://img.icons8.com/color/16/facebook-new.png"
              alt="Facebook"
              className="mr-2"
            />
            Sign up with Facebook
          </button>
        </div>

        <p className="text-center text-gray-600 text-sm mt-6">
          By clicking “Sign up”, you agree to EventBookings Terms &amp;
          Conditions and have read the Privacy Policy
        </p>

        <p className="text-center text-gray-600 text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login1" className="text-green-600 hover:underline">
            Log In
          </Link>
        </p>

        {/* spacer to push footer down */}
        <div className="h-20" />
      </div>
    </div>
  );
}
