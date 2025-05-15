import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import EventDetails from "./pages/EventDetails";
import Attendees from "./pages/Attendees";
import Notifications from "./pages/Notifications";

const AdminRouter = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/events" element={<EventDetails />} />
    <Route path="/events/:eventId" element={<EventDetails />} />
    <Route path="/attendees" element={<Attendees />} />
    <Route path="/logs" element={<Notifications />} />
    {/* Add more admin routes here */}
  </Routes>
);

export default AdminRouter;
