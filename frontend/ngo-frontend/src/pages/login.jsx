import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ===============================
  // HANDLE INPUT CHANGE
  // ===============================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  // ===============================
  // HANDLE LOGIN
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.email || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // LIVE BACKEND
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      // Login failed
      if (!response.ok) {
        setError(data.message || "Login failed.");
        return;
      }

      // Save login information
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login successful!");

      // ===============================
      // ADMIN / NORMAL USER REDIRECT
      // ===============================
      if (data.user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/account");
      }

    } catch (error) {
      console.error("Login error:", error);

      setError(
        "Unable to connect to the server. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* ===============================
          LEFT SECTION
      =============================== */}
      <div className="login-left">

        <div className="login-left-content">
          <h1>Welcome Back!</h1>

          <p>
            Login to stay connected with our mission and
            continue making a difference in the community.
          </p>
        </div>

      </div>


      {/* ===============================
          RIGHT SECTION
      =============================== */}
      <div className="login-right">

        <div className="login-card">

          <div className="login-header">

            <h2>Login</h2>

            <p>
              Welcome back! Please enter your details.
            </p>

          </div>


          {/* ERROR MESSAGE */}
          {error && (
            <div className="login-error">
              {error}
            </div>
          )}


          {/* ===============================
              LOGIN FORM
          =============================== */}
          <form onSubmit={handleSubmit}>

            {/* EMAIL */}
            <div className="form-group">

              <label htmlFor="email">
                Email Address
              </label>

              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
              />

            </div>


            {/* PASSWORD */}
            <div className="form-group">

              <label htmlFor="password">
                Password
              </label>

              <div className="password-wrapper">

                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="show-password-btn"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

            </div>


            {/* FORGOT PASSWORD */}
            <div className="login-options">

              <Link to="/forgot-password">
                Forgot Password?
              </Link>

            </div>


            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>


          {/* REGISTER */}
          <div className="register-link">

            <p>
              Don't have an account?{" "}

              <Link to="/register">
                Register
              </Link>
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;
