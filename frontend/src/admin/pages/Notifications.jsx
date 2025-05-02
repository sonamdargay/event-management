import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import GreetingCard from "../components/GreetingCard";
import FilterBar from "../components/FilterBar";
import Footer from "../components/Footer";

const Notifications = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Topbar />
        <div className="p-4 bg-light" style={{ minHeight: "100vh" }}>
          <GreetingCard
            title="Notifications"
            subtitle="We are on a mission to help developers like you to build beautiful projects for FREE."
          />
          <FilterBar />

          <div className="bg-white rounded p-4 shadow-sm">
            <h5>Your Notifications</h5>

            <div className="row">
              <p className="text-muted">No notifications!</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Notifications;
