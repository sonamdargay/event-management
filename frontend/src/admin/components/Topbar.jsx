import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Topbar = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  const handleNameClick = () => {
    setShowLogout((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    navigate("/login1");
  };

  return (
    <div className="p-3 bg-white topbar d-flex justify-content-between align-items-center border-bottom">
      <div className="d-flex align-items-center">
        <button
          onClick={onToggleSidebar}
          className="btn btn-primary rounded-circle me-3"
          style={{ width: "40px", height: "40px" }}
        >
          <i className="text-white bi bi-arrow-left"></i>
        </button>
        {/* Removed Search Input */}
      </div>

      <div className="d-flex align-items-center position-relative">
        <i className="bi bi-person-circle fs-3"></i>
        <div
          className="ms-2"
          onClick={handleNameClick}
          style={{ cursor: "pointer" }}
        >
          {user?.name || "Guest"}
          <br />
          <small>{user?.role === "admin" ? "Events Manager" : "User"}</small>
        </div>

        {showLogout && (
          <div
            className="p-2 bg-white border rounded shadow-sm position-absolute top-100 end-0"
            style={{ zIndex: 1000 }}
          >
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;
