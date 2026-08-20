import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
  localStorage.getItem("isLoggedIn") === "true"
);

useEffect(() => {
  const checkLogin = () => {
    setIsLoggedIn(
      localStorage.getItem("isLoggedIn") === "true"
    );
  };

  checkLogin();

  window.addEventListener("storage", checkLogin);

  return () => {
    window.removeEventListener("storage", checkLogin);
  };
}, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          NGO<span>.</span>
        </Link>

        {/* Desktop / Mobile Navigation */}
        <nav className={`navbar-links ${menuOpen ? "active" : ""}`}>

          <NavLink to="/" onClick={closeMenu}>
            Home
          </NavLink>

          <NavLink to="/about" onClick={closeMenu}>
            About Us
          </NavLink>

          <NavLink to="/our-work" onClick={closeMenu}>
            Our Work
          </NavLink>

          <NavLink to="/projects" onClick={closeMenu}>
            Projects
          </NavLink>

          <NavLink to="/media" onClick={closeMenu}>
            Media
          </NavLink>

          <NavLink to="/get-involved" onClick={closeMenu}>
            Get Involved
          </NavLink>

          <NavLink to="/blog" onClick={closeMenu}>
            Blog
          </NavLink>

          <NavLink to="/contact" onClick={closeMenu}>
            Contact
          </NavLink>
{isLoggedIn ? (
  <>
    <NavLink to="/account" onClick={closeMenu}>
      Account
    </NavLink>

    <button
      className="navbar-logout"
      onClick={() => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");

        setIsLoggedIn(false);
        closeMenu();
      }}
    >
      Logout
    </button>
  </>
) : (
  <NavLink to="/login" onClick={closeMenu}>
    Login
  </NavLink>
)}
          <Link
            to="/donate"
            className="donate-button"
            onClick={closeMenu}
          >
            Donate
          </Link>

        </nav>

        {/* Mobile Menu Button */}
        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

      </div>
    </header>
  );
}

export default Navbar;
