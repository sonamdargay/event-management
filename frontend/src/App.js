import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
// import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import Events from "./pages/Events";
import AdminApp from "./admin/AdminRouter"; // Admin Router
import "./App.css";
import Home from "./pages/Home";
//import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import UserPage from "./pages/UserPage";

// Wrapper to conditionally show Navbar
function AppWrapper() {
  const location = useLocation();

  // Check if the current route is under /admin
  // const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {/* Only show Navbar on non-admin routes */}
      {/* {!isAdminRoute && <Navbar />} */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userpage" element={<UserPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/events" element={<Events />} />
        <Route path="/admin/*" element={<AdminApp />} />
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
