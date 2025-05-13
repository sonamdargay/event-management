import {
  BrowserRouter as Router,
  Routes,
  Route,
  // useLocation,
} from "react-router-dom";
// import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";

import AdminApp from "./admin/AdminRouter"; // Admin Router
import "./App.css";
import Home from "./pages/Home";
//import Navbar from "./components/Navbar";

import Login1 from "./pages/Login1";
import Register1 from "./pages/Register1";
import UserPage from "./pages/UserPage";
import EventsDetails from "./pages/EventsDetails";
import EventBroadCastListener from "./admin/components/EventBroadcastListener";
import Funding from "./pages/Funding";


// Wrapper to conditionally show Navbar
function AppWrapper() {
  // const location = useLocation();

  // Check if the current route is under /admin
  // const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {/* Only show Navbar on non-admin routes */}
      {/* {!isAdminRoute && <Navbar />} */}
      <EventBroadCastListener/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login1" element={<Login1 />} />
        <Route path="/register1" element={<Register1 />} />
        <Route path="/userpage" element={<UserPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/funding" element={<Funding />} />
       
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="/event/:id" element={<EventsDetails />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
