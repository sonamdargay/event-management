import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Events from "./pages/Events";
import AdminApp from "./admin/AdminRouter"; // Admin Router

// Wrapper to conditionally show Navbar
function AppWrapper() {
  const location = useLocation();

  // Check if the current route is under /admin
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {/* Only show Navbar on non-admin routes */}
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
