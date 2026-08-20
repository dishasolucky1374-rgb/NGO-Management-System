import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed.");
        return;
      }

      alert("Account created successfully!");

      navigate("/login");
    } catch (error) {
      console.error(error);
      setError(
        "Unable to connect to the server. Please make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">

      {/* LEFT SIDE */}
      <div className="register-info">

        <Link to="/" className="register-logo">
          NGO<span>.</span>
        </Link>

        <div className="register-info-content">
          <span>JOIN OUR COMMUNITY</span>

          <h1>
            Be Part of
            <br />
            <strong>Something Bigger.</strong>
          </h1>

          <p>
            Create an account to stay connected with our work,
            volunteer opportunities, campaigns and community initiatives.
          </p>
        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="register-form-section">

        <div className="register-card">

          <span className="section-tag">CREATE ACCOUNT</span>

          <h2>Join Us</h2>

          <p className="register-subtitle">
            Create your account and become part of our community.
          </p>

          {error && (
            <div className="register-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* NAME */}
            <div className="form-group">
              <label>Full Name *</label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </div>

            {/* EMAIL */}
            <div className="form-group">
              <label>Email Address *</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>

            {/* PHONE */}
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

            {/* PASSWORD */}
            <div className="form-group">
              <label>Password *</label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
              />
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="form-group">
              <label>Confirm Password *</label>

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
              />
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="register-submit"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account →"}
            </button>

          </form>

          <div className="register-login">
            <p>
              Already have an account?{" "}
              <Link to="/login">
                Sign In
              </Link>
            </p>
          </div>

          <Link to="/" className="back-home">
            ← Back to Website
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Register;
