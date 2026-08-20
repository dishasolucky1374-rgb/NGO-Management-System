import { Link } from "react-router-dom";

function Home() {
  return (
    <main>

      {/* Hero Section */}
      <section className="hero">

        <div className="hero-content">

          <p className="hero-label">
            TOGETHER, WE CAN MAKE A DIFFERENCE
          </p>

          <h1>
            Empowering Lives.
            <br />
            Building Futures.
          </h1>

          <p>
            We work with children, women, and communities to create
            opportunities through education, healthcare, and livelihood
            programs.
          </p>

          <div className="hero-buttons">

            <Link to="/donate" className="primary-btn">
              Donate Now
            </Link>

            <Link to="/our-work" className="secondary-btn">
              Explore Our Work
            </Link>

          </div>

        </div>

      </section>


      {/* Impact Statistics */}
      <section className="stats-section">

        <div className="section-heading">
          <p>OUR IMPACT</p>
          <h2>Making a Difference Together</h2>
        </div>

        <div className="stats-grid">

          <div className="stat-card">
            <h3>10,000+</h3>
            <p>Children Reached</p>
          </div>

          <div className="stat-card">
            <h3>5,000+</h3>
            <p>Women Empowered</p>
          </div>

          <div className="stat-card">
            <h3>50+</h3>
            <p>Communities Served</p>
          </div>

          <div className="stat-card">
            <h3>100+</h3>
            <p>Active Volunteers</p>
          </div>

        </div>

      </section>


      {/* Mission */}
      <section className="mission-section">

        <div>
          <p className="section-label">OUR MISSION</p>

          <h2>
            Creating lasting impact in communities that need it most.
          </h2>
        </div>

        <div>
          <p>
            Our mission is to create a lasting impact in the lives of
            underprivileged children and communities by providing
            education, women empowerment, and livelihood opportunities.
          </p>

          <Link to="/about" className="text-link">
            Learn More →
          </Link>
        </div>

      </section>


      {/* Programs */}
      <section className="program-section">

        <div className="section-heading">
          <p>WHAT WE DO</p>
          <h2>Our Key Programs</h2>
        </div>

        <div className="program-grid">

          <div className="program-card">
            <h3>Education</h3>
            <p>
              Providing quality education and learning opportunities
              to underprivileged children.
            </p>
            <Link to="/our-work">Learn More →</Link>
          </div>

          <div className="program-card">
            <h3>Healthcare</h3>
            <p>
              Improving access to healthcare through health camps
              and community-based interventions.
            </p>
            <Link to="/our-work">Learn More →</Link>
          </div>

          <div className="program-card">
            <h3>Livelihood</h3>
            <p>
              Creating sustainable livelihood opportunities through
              vocational training and skill development.
            </p>
            <Link to="/our-work">Learn More →</Link>
          </div>

        </div>

      </section>

    </main>
  );
}

export default Home;



