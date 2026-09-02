import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "General Inquiry",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Contact Form:", formData);

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      phone: "",
      inquiryType: "General Inquiry",
      message: "",
    });
  };

  return (
    <div className="contact-page">

      {/* HERO */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <span>GET IN TOUCH</span>

          <h1>
            Let's Create
            <br />
            <strong>Change Together.</strong>
          </h1>

          <p>
            Have a question, partnership idea or want to learn more
            about our work? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* CONTACT INFORMATION */}
      <section className="contact-info-section">

        <div className="contact-info-intro">
          <span className="section-tag">CONTACT US</span>

          <h2>
            We'd Love to
            <br />
            <span>Hear From You</span>
          </h2>

          <p>
            Whether you want to support our mission, collaborate with us,
            volunteer or simply learn more about our work, reach out to
            our team.
          </p>
        </div>

        <div className="contact-info-grid">

          <div className="contact-info-card">
            <div className="contact-icon">📍</div>

            <h3>Our Office</h3>

            <p>
              NGO Management Office
              <br />
              Nashik, Maharashtra
              <br />
              India
            </p>
          </div>

          <div className="contact-info-card">
            <div className="contact-icon">📞</div>

            <h3>Call Us</h3>

            <p>
              +91 XXXXX XXXXX
              <br />
              Monday – Friday
              <br />
              9:00 AM – 6:00 PM
            </p>
          </div>

          <div className="contact-info-card">
            <div className="contact-icon">✉️</div>

            <h3>Email Us</h3>

            <p>
              info@ngo.org
              <br />
              support@ngo.org
              <br />
              partnerships@ngo.org
            </p>
          </div>

        </div>
      </section>

      {/* CONTACT FORM + MAP */}
      <section className="contact-main">

        {/* FORM */}
        <div className="contact-form-wrapper">

          <span className="section-tag">SEND US A MESSAGE</span>

          <h2>How Can We Help?</h2>

          {submitted && (
            <div className="success-message">
              Thank you! Your message has been submitted successfully.
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="form-row">

              <div className="form-group">
                <label>Full Name *</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address *</label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

            </div>

            <div className="form-row">

              <div className="form-group">
                <label>Phone Number</label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="form-group">
                <label>Inquiry Type</label>

                <select
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                >
                  <option>General Inquiry</option>
                  <option>Volunteer</option>
                  <option>Partnership</option>
                  <option>Media Request</option>
                  <option>Donation</option>
                  <option>Other</option>
                </select>
              </div>

            </div>

            <div className="form-group">
              <label>Message *</label>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us how we can help..."
                rows="6"
                required
              />
            </div>

            <button type="submit" className="contact-submit">
              Send Message →
            </button>

          </form>
        </div>

        {/* MAP */}
        <div className="contact-map">

          <div className="map-placeholder">

            <div className="map-pin">📍</div>

            <h3>Our Location</h3>

            <p>
              Nashik, Maharashtra, India
            </p>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Nashik%2C%20Maharashtra"
              target="_blank"
              rel="noreferrer"
            >
              Open in Google Maps →
            </a>

          </div>

        </div>

      </section>

      {/* SOCIAL CTA */}
      <section className="contact-social">

        <span>STAY CONNECTED</span>

        <h2>
          Follow our journey
          <br />
          <strong>and be part of the change.</strong>
        </h2>

        <div className="social-links">
          <a href="#" aria-label="Facebook">Facebook</a>
          <a href="#" aria-label="Instagram">Instagram</a>
          <a href="#" aria-label="LinkedIn">LinkedIn</a>
          <a href="#" aria-label="YouTube">YouTube</a>
        </div>

      </section>

    </div>
  );
}

export default Contact;
