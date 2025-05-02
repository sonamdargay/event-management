import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import GreetingCard from "../components/GreetingCard";
import FilterBar from "../components/FilterBar";
import EventTable from "../components/EventTable";
import Footer from "../components/Footer";

const Dashboard = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  return (
    <div className="d-flex">
      {sidebarVisible && <Sidebar />}
      <div className="flex-grow-1">
        <Topbar onToggleSidebar={() => setSidebarVisible(!sidebarVisible)} />
        <div className="p-4 bg-light" style={{ minHeight: "100vh" }}>
          <GreetingCard />
          <FilterBar />
          <EventTable />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
