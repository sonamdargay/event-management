import { Link, useLocation } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname.startsWith(path)
      ? "bg-primary text-white rounded-pill px-3 py-2"
      : "text-secondary";

  return (
    <div
      className="d-flex flex-column p-3 vh-100 position-relative"
      style={{ width: "250px", backgroundColor: "#FFFFFF" }}
    >
      <div className="mb-4">
        <h4>
          <i className="bi bi-asterisk text-primary me-2"></i> EventMS
        </h4>
      </div>

      <small className="text-muted mb-2">Home</small>
      <ul className="nav nav-pills flex-column mb-3">
        <li>
          <Link
            to="/admin/dashboard"
            className={`nav-link ${isActive("/admin/dashboard")}`}
          >
            <i className="bi bi-grid-fill me-2"></i> Dashboard
          </Link>
        </li>
      </ul>

      <small className="text-muted mb-2">Events Management</small>
      <ul className="nav flex-column">
        <li>
          <Link
            to="/admin/events"
            className={`nav-link ${isActive("/admin/events")}`}
          >
            <i className="bi bi-geo-alt me-2"></i> Events
          </Link>
        </li>
        <li>
          <Link
            to="/admin/attendees"
            className={`nav-link ${isActive("/admin/attendees")}`}
          >
            <i className="bi bi-shield-check me-2"></i> Attendees
          </Link>
        </li>
        <li>
          <Link
            to="/admin/notifications"
            className={`nav-link ${isActive("/admin/notifications")}`}
          >
            <i className="bi bi-journal-text me-2"></i> Notifications
          </Link>
        </li>
      </ul>

      {/* Watermark graphic at bottom right */}
      <div className="position-absolute bottom-0 end-0 opacity-10 pe-2 pb-2">
        <i
          className="bi bi-x-lg"
          style={{ fontSize: "100px", color: "#f8f9fa" }}
        ></i>
      </div>
    </div>
  );
};

export default Sidebar;
