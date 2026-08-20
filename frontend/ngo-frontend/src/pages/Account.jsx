import { Link, useNavigate } from "react-router-dom";

function Account() {
  const navigate = useNavigate();

  const userName = localStorage.getItem("userName") || "User";
  const userEmail =
    localStorage.getItem("userEmail") || "user@example.com";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");

    navigate("/login");
  };

  return (
    <div className="account-page">

      <section className="account-hero">
        <span>MY ACCOUNT</span>

        <h1>
          Welcome,
          <br />
          <strong>{userName}</strong>
        </h1>

        <p>
          Manage your account and stay connected with our mission.
        </p>
      </section>

      <section className="account-content">

        <div className="account-card">

          <div className="account-avatar">
            {userName.charAt(0).toUpperCase()}
          </div>

          <div className="account-details">

            <span className="section-tag">
              ACCOUNT INFORMATION
            </span>

            <h2>{userName}</h2>

            <p>
              <strong>Email:</strong> {userEmail}
            </p>

            <p>
              <strong>Account Type:</strong> Community Member
            </p>

          </div>

        </div>

        <div className="account-actions">

          <Link to="/projects">
            Explore Projects →
          </Link>

          <Link to="/get-involved">
            Get Involved →
          </Link>

          <Link to="/donate">
            Support Our Mission →
          </Link>

          <button onClick={handleLogout}>
            Logout
          </button>

        </div>

      </section>

    </div>
  );
}

export default Account;
