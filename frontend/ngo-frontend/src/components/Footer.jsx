
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-brand">
          <h2>
            NGO<span>.</span>
          </h2>

          <p>
            Creating lasting impact through education,
            healthcare, women empowerment and livelihood
            opportunities.
          </p>

          <div className="footer-social">
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="Instagram">◎</a>
            <a href="#" aria-label="LinkedIn">in</a>
            <a href="#" aria-label="YouTube">▶</a>
          </div>
        </div>


        <div className="footer-column">
          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/our-work">Our Work</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/media">Media</Link>
        </div>


        <div className="footer-column">
          <h3>Get Involved</h3>

          <Link to="/get-involved">Volunteer</Link>
          <Link to="/get-involved">Partner With Us</Link>
          <Link to="/get-involved">Fundraise</Link>
          <Link to="/get-involved">Campaigns</Link>
          <Link to="/donate">Donate</Link>
        </div>


        <div className="footer-column footer-contact">
          <h3>Contact</h3>

          <p>📍 Nashik, Maharashtra, India</p>
          <p>📞 +91 XXXXX XXXXX</p>
          <p>✉️ info@ngo.org</p>
        </div>

      </div>


      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} NGO. All rights reserved.
        </p>

        <div>
          <span>Privacy Policy</span>
          <span>Terms & Conditions</span>
        </div>
      </div>

    </footer>
  );
}

export default Footer;
