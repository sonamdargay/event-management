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
    <div className="topbar d-flex justify-content-between align-items-center p-3 bg-white border-bottom">
      <div className="d-flex align-items-center">
        <button
          onClick={onToggleSidebar}
          className="btn btn-primary rounded-circle me-3"
          style={{ width: "40px", height: "40px" }}
        >
          <i className="bi bi-arrow-left text-white"></i>
        </button>

        <div className="input-group" style={{ width: "250px" }}>
          <span className="input-group-text bg-white border-end-0">
            <i className="bi bi-search text-muted"></i>
          </span>
          <input
            type="text"
            className="form-control border-start-0"
            placeholder="Search..."
          />
        </div>
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
          <small>Events Manager</small>
        </div>

        {showLogout && (
          <div
            className="position-absolute top-100 end-0 bg-white border rounded p-2 shadow-sm"
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
