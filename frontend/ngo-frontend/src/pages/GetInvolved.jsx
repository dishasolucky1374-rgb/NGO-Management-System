import { Link } from "react-router-dom";

function GetInvolved() {
  return (
    <div className="get-involved-page">

      {/* HERO SECTION */}
      <section className="get-involved-hero">
        <div className="get-involved-hero-content">
          <span>MAKE A DIFFERENCE</span>

          <h1>
            Together, We Can
            <br />
            <strong>Create Change.</strong>
          </h1>

          <p>
            There are many ways you can support our mission and help
            create better opportunities for children, women and
            communities.
          </p>

          <Link to="/donate" className="primary-btn">
            Support Our Work →
          </Link>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="get-involved-intro">
        <span className="section-tag">GET INVOLVED</span>

        <h2>
          Your Support Can
          <br />
          <span>Change a Life</span>
        </h2>

        <p>
          Whether you volunteer your time, partner with us, raise funds,
          participate in campaigns or make a donation, your contribution
          helps us reach more people and create sustainable change.
        </p>
      </section>

      {/* INVOLVEMENT OPTIONS */}
      <section className="involvement-options">

        {/* VOLUNTEER */}
        <div className="involvement-card">
          <div className="involvement-icon">🤝</div>

          <span>01</span>

          <h3>Volunteer</h3>

          <p>
            Share your skills, time and passion by volunteering in our
            education, healthcare, livelihood and community programs.
          </p>

          <button>Become a Volunteer →</button>
        </div>

        {/* PARTNER */}
        <div className="involvement-card">
          <div className="involvement-icon">🏢</div>

          <span>02</span>

          <h3>Partner With Us</h3>

          <p>
            Collaborate with us through corporate partnerships,
            sponsorships and meaningful community initiatives.
          </p>

          <button>Partner With Us →</button>
        </div>

        {/* FUNDRAISE */}
        <div className="involvement-card">
          <div className="involvement-icon">💰</div>

          <span>03</span>

          <h3>Fundraise</h3>

          <p>
            Start your own fundraising initiative and help us support
            more children and families in need.
          </p>

          <button>Start Fundraising →</button>
        </div>

        {/* CAMPAIGNS */}
        <div className="involvement-card">
          <div className="involvement-icon">📢</div>

          <span>04</span>

          <h3>Campaigns</h3>

          <p>
            Join our advocacy campaigns and help spread awareness about
            important social issues affecting communities.
          </p>

          <button>Join a Campaign →</button>
        </div>

        {/* COMMUNITY */}
        <div className="involvement-card">
          <div className="involvement-icon">👥</div>

          <span>05</span>

          <h3>Join the Community</h3>

          <p>
            Subscribe to our newsletter, attend events and become part
            of our growing community of changemakers.
          </p>

          <button>Join Our Community →</button>
        </div>

        {/* DONATE */}
        <div className="involvement-card donate-card">
          <div className="involvement-icon">❤️</div>

          <span>06</span>

          <h3>Donate</h3>

          <p>
            Your donation can provide education, healthcare and
            livelihood opportunities to people who need them most.
          </p>

          <Link to="/donate" className="card-donate-btn">
            Donate Now →
          </Link>
        </div>

      </section>

      {/* CTA */}
      <section className="involvement-cta">

        <div>
          <span>EVERY ACTION COUNTS</span>

          <h2>
            Be the reason
            <br />
            <strong>someone's life changes.</strong>
          </h2>

          <p>
            Small actions can create a lasting impact when we work
            together.
          </p>
        </div>

        <Link to="/donate" className="cta-button">
          Make an Impact →
        </Link>

      </section>

    </div>
  );
}

export default GetInvolved;
