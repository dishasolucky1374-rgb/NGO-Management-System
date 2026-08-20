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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
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

      if (!response.ok) {
        setError(data.message);
        return;
      }

      // Save login information
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userName", data.user.name);
      localStorage.setItem("userEmail", data.user.email);
      localStorage.setItem("userId", data.user.id);

      alert("Login successful!");

      navigate("/");
    } catch (error) {
      console.error(error);
      setError("Unable to connect to the server.");
    }
  };

  return (
    <div className="login-page">

      {/* LEFT SIDE */}
      <div className="login-info">

        <Link to="/" className="login-logo">
          NGO<span>.</span>
        </Link>

        <div className="login-info-content">
          <span>WELCOME BACK</span>

          <h1>
            Together,
            <br />
            <strong>We Create Change.</strong>
          </h1>

          <p>
            Sign in to stay connected with our initiatives,
            volunteer opportunities, campaigns and impact.
          </p>
        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="login-form-section">

        <div className="login-card">

          <span className="section-tag">ACCOUNT LOGIN</span>

          <h2>Welcome Back</h2>

          <p className="login-subtitle">
            Sign in to your account to continue.
          </p>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* EMAIL */}
            <div className="form-group">

              <label htmlFor="email">
                Email Address
              </label>

              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />

            </div>

            {/* PASSWORD */}
            <div className="form-group">

              <label htmlFor="password">
                Password
              </label>

              <div className="password-wrapper">

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />

                <button
                  type="button"
                  className="show-password"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

            </div>

            {/* OPTIONS */}
            <div className="login-options">

              <label>
                <input type="checkbox" />
                Remember me
              </label>

              <Link to="/forgot-password">
                Forgot Password?
              </Link>

            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="login-submit"
            >
              Sign In →
            </button>

          </form>

          {/* REGISTER */}
          <div className="login-register">

            <p>
              Don't have an account?{" "}
              <Link to="/register">
                Create an account
              </Link>
            </p>

          </div>

          {/* BACK HOME */}
          <Link to="/" className="back-home">
            ← Back to Website
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;
