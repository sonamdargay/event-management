import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import GreetingCard from "../components/GreetingCard";
import Footer from "../components/Footer";
import axios from "axios";

const Notifications = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/logs`)
      .then((res) => {
        setLogs(res.data.logs);
      })
      .catch((err) => console.error("Error fetching logs:", err));
  }, []);

  const filteredLogs = logs.filter((log) =>
    log.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="d-flex">
      {sidebarVisible && <Sidebar />}
      <div className="flex-grow-1">
        <Topbar onToggleSidebar={() => setSidebarVisible(!sidebarVisible)} />
        <div className="p-4 bg-light" style={{ minHeight: "100vh" }}>
          <GreetingCard
            title="System Logs"
            subtitle="View the full latest system logs and notifications on server."
          />

          <div className="bg-white rounded p-4 shadow-sm">
            <h5>System Logs</h5>

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Search logs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="row">
              {filteredLogs.length > 0 ? (
                <ul className="list-group">
                  {filteredLogs.map((log, index) => (
                    <li className="list-group-item" key={index}>
                      <small>{log}</small>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">No logs found!</p>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Notifications;
