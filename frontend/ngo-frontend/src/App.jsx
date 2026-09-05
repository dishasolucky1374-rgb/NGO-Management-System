import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import OurWork from "./pages/Ourwork.jsx";
import Projects from "./pages/Projects.jsx";
import ProjectDetails from "./pages/ProjectDetails.jsx";
import Media from "./pages/Media.jsx";
import GetInvolved from "./pages/GetInvolved.jsx";
import Blog from "./pages/Blog.jsx";
import Contact from "./pages/Contact.jsx";
import Donate from "./pages/Donate.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Account from "./pages/Account.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/our-work" element={<OurWork />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/media" element={<Media />} />
        <Route path="/get-involved" element={<GetInvolved />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/donate" element={<Donate />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />

        {/* Admin Dashboard */}
        <Route
          path="/admin-dashboard"
          element={<AdminDashboard />}
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
