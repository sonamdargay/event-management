import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosConfig";

export default function Login1() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axiosInstance.post("/api/auth/login", formData);
      login(resp.data);

      // Redirect based on role
      const userRole = resp.data?.user?.role;
      if (userRole === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/events");
      }
    } catch {
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 1. top dark bar */}
      <div className="w-full h-14" style={{ backgroundColor: "#333" }} />

      {/* 2. Event Management header with line */}
      <div className="w-full pl-12 pr-6 py-6">
        <h1 className="text-3xl font-bold leading-tight">
          Event<br />Management
        </h1>
        <div className="border-t border-gray-300 mt-2" />
      </div>

      {/* 3. LOG IN form */}
      <div className="max-w-md mx-auto px-6">
        <h2 className="text-center text-4xl font-extrabold mb-8">LOG IN</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
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
            <label className="block text-sm font-medium mb-1">
              Password
            </label>
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

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-black text-white w-32 py-3 rounded-md hover:opacity-90"
            >
              Log in
            </button>
            <button
              type="button"
              className="text-sm text-gray-600 hover:underline"
            >
              Forgot password?
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-700 mt-6">
          Don’t have an account?{" "}
          <a
            href="/register1"
            className="font-medium text-black hover:underline"
          >
            Sign up
          </a>
        </p>

        <div className="mt-6 space-y-3">
          <button className="w-full flex items-center justify-center p-3 bg-gray-100 rounded-md hover:bg-gray-200">
            <img
              src="https://img.icons8.com/color/16/google-logo.png"
              alt="Google"
              className="mr-2"
            />
            Sign up with Google
          </button>
          <button className="w-full flex items-center justify-center p-3 bg-gray-100 rounded-md hover:bg-gray-200">
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
        <div className="h-20" />
      </div>
    </div>
  );
}
