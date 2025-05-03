import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
//import Navbar from "./components/Navbar";

import Login1 from "./pages/Login1";
import Register1 from "./pages/Register1";
import UserPage  from "./pages/UserPage";
import Profile from "./pages/Profile";
import Events from "./pages/Events";

function App() {
  return (
    <Router>
      {/*<Navbar />*/}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login1" element={<Login1 />} />
        <Route path="/register1" element={<Register1 />} />
        <Route path="/userpage"   element={<UserPage  />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/events" element={<Events />} />
      </Routes>
    </Router>
  );
}

export default App;
