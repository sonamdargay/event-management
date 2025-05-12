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
      const userData = await axiosInstance.post("/api/auth/login", formData);
      login(userData.data); // Save token/user data using context
    
      // from the response data, we need to decide whether to redirect to admin or user

      console.log(userData);
      console.log(userData.data.role);

      
      if (userData?.data.role == 'admin') {
        console.log('this user is an admin, redirecting to admin dashboard..');
        navigate("/admin/dashboard"); // Redirect to events page
      } else {
        console.log('this user is not an admin, redirecting to user page..');
        navigate("/userpage")
      }
    } catch (error) {
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 1. top dark bar */}
      <div className="w-full h-14" style={{ backgroundColor: "#333" }} />

      {/* 2. Event Management header with line */}
      <div className="w-full py-6 pl-12 pr-6">
        <h1 className="text-3xl font-bold leading-tight">
          Event
          <br />
          Management
        </h1>
        <div className="mt-2 border-t border-gray-300" />
      </div>

      {/* 3. LOG IN form */}
      <div className="max-w-md px-6 mx-auto">
        <h2 className="mb-8 text-4xl font-extrabold text-center">LOG IN</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full p-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full p-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-32 py-3 text-white bg-black rounded-md hover:opacity-90"
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

        <p className="mt-6 text-sm text-center text-gray-700">
          Don’t have an account?{" "}
          <a
            href="/register1"
            className="font-medium text-black hover:underline"
          >
            Sign up
          </a>
        </p>

        <div className="mt-6 space-y-3">
          <button className="flex items-center justify-center w-full p-3 bg-gray-100 rounded-md hover:bg-gray-200">
            <img
              src="https://img.icons8.com/color/16/google-logo.png"
              alt="Google"
              className="mr-2"
            />
            Sign up with Google
          </button>
          <button className="flex items-center justify-center w-full p-3 bg-gray-100 rounded-md hover:bg-gray-200">
            <img
              src="https://img.icons8.com/ios-filled/16/mac-os.png"
              alt="Apple"
              className="mr-2"
            />
            Sign up with Apple
          </button>
          <button
            type="button"
            className="flex items-center justify-center w-full p-3 bg-gray-100 rounded-md hover:bg-gray-200"
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
