import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import GreetingCard from "../components/GreetingCard";
import EventTable from "../components/EventTable";
import Footer from "../components/Footer";

const Dashboard = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [filterStatus, setFilterStatus] = useState(""); // "Paid" or "Free"
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilterChange = (value) => {
    setFilterStatus(value);
  };

  const handleReset = () => {
    setFilterStatus("");
    setSearchTerm("");
  };

  return (
    <div className="d-flex">
      {sidebarVisible && <Sidebar />}
      <div className="flex-grow-1">
        <Topbar onToggleSidebar={() => setSidebarVisible(!sidebarVisible)} />
        <div className="p-4 bg-light" style={{ minHeight: "100vh" }}>
          <GreetingCard />

          {/* Filters: search + dropdown + reset */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <input
              type="text"
              className="form-control w-25"
              placeholder="Filter by Events name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="d-flex align-items-center gap-3">
              <div className="dropdown">
                <button
                  className="btn btn-outline-secondary dropdown-toggle"
                  type="button"
                  id="sortByDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Sort By
                </button>
                <ul className="dropdown-menu" aria-labelledby="sortByDropdown">
                  <li>
                    <button className="dropdown-item" onClick={() => handleFilterChange("Paid")}>
                      Paid
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={() => handleFilterChange("Free")}>
                      Free
                    </button>
                  </li>
                </ul>
              </div>

              <button className="btn btn-outline-dark" onClick={handleReset}>
                <i className="bi bi-arrow-clockwise me-1"></i> Reset
              </button>
            </div>
          </div>

          <EventTable filterStatus={filterStatus} searchTerm={searchTerm} />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
