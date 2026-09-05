import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./home.css";

function Home() {
  const [banners, setBanners] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const [visionMission, setVisionMission] = useState(null);
  const [initiatives, setInitiatives] = useState([]);

  useEffect(() => {
    fetch("https://ngo-management-backend.onrender.com/api/banners")
      .then((res) => res.json())
      .then((data) => setBanners(data))
      .catch((err) => console.error("Banner error:", err));

    fetch("https://ngo-management-backend.onrender.com/api/statistics")
      .then((res) => res.json())
      .then((data) => setStatistics(data))
      .catch((err) => console.error("Statistics error:", err));

    fetch("https://ngo-management-backend.onrender.com/api/vision-mission")
      .then((res) => res.json())
      .then((data) => setVisionMission(data[0] || null))
      .catch((err) => console.error("Vision/Mission error:", err));

    fetch("https://ngo-management-backend.onrender.com/api/initiatives")
      .then((res) => res.json())
      .then((data) => setInitiatives(data))
      .catch((err) => console.error("Initiatives error:", err));
  }, []);

  return (
    <main>

      {/* Hero Section */}
      <section
        className="hero"
        style={
          banners[0]?.image_url
            ? {
                backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${banners[0].image_url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : {}
        }
      >
        <div className="hero-content">

          <p className="hero-label">
  CREATING CHANGE TOGETHER
</p>

          <h1>
  Empowering Communities.
  <br />
  Creating Lasting Impact.
</h1>
          <p>
            {banners[0]?.description ||
              "We work with children, women, and communities to create opportunities through education, healthcare, and livelihood programs."}
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
          {statistics.map((stat) => (
            <div className="stat-card" key={stat.id}>
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>

      </section>


      {/* Vision and Mission */}
      <section className="vision-mission-section">

        <div className="vision-card">

          <p className="section-label">
            OUR VISION
          </p>

          <h2>
            {visionMission?.vision_title}
          </h2>

          <p>
            {visionMission?.vision_description}
          </p>

        </div>


        <div className="mission-card">

          <p className="section-label">
            OUR MISSION
          </p>

          <h2>
            {visionMission?.mission_title}
          </h2>

          <p>
            {visionMission?.mission_description}
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

          {initiatives.map((initiative) => (
            <div
              className="program-card"
              key={initiative.id}
            >
              <h3>
                {initiative.title}
              </h3>

              <p>
                {initiative.description}
              </p>

              <Link to="/our-work">
                Learn More →
              </Link>
            </div>
          ))}

        </div>

      </section>


      {/* Success Stories */}
      <section className="success-stories">

        <div className="section-heading">
          <p>SUCCESS STORIES</p>
          <h2>Changing Lives, Creating Hope</h2>
        </div>

        <div className="story-container">

          <div className="story-card">
            <h3>
              Education for a Better Future
            </h3>

            <p>
              Through our education initiatives, children receive
              learning opportunities, resources, and support to
              continue building a brighter future.
            </p>
          </div>


          <div className="story-card">
            <h3>
              Empowering Women
            </h3>

            <p>
              Our women empowerment programs provide opportunities
              for skill development, independence, and sustainable
              livelihoods.
            </p>
          </div>


          <div className="story-card">
            <h3>
              Supporting Communities
            </h3>

            <p>
              Through community initiatives and the support of
              volunteers, we continue to create meaningful and
              positive social change.
            </p>
          </div>

        </div>

      </section>


      {/* News and Events */}
      <section className="news-events">

        <div className="section-heading">
          <p>NEWS & EVENTS</p>
          <h2>Latest Updates</h2>
        </div>

        <div className="news-container">

          <div className="news-card">
            <h3>
              Community Awareness Campaign
            </h3>

            <p>
              Join our awareness initiatives and help us spread
              knowledge and create positive social change.
            </p>
          </div>


          <div className="news-card">
            <h3>
              Volunteer Drive
            </h3>

            <p>
              We are welcoming passionate volunteers who want to
              contribute their time and skills to meaningful causes.
            </p>
          </div>


          <div className="news-card">
            <h3>
              Community Development Program
            </h3>

            <p>
              Our latest initiatives focus on supporting communities
              and creating opportunities for sustainable development.
            </p>
          </div>

        </div>

      </section>


      {/* Partners */}
      <section className="partners">

        <div className="section-heading">
          <p>OUR PARTNERS</p>
          <h2>Our Partners & Supporters</h2>
        </div>

        <p className="partners-description">
          Together with our supporters and community partners,
          we work towards creating a positive and lasting impact.
        </p>

        <div className="partners-container">

          <div className="partner-card">
            Community Partners
          </div>

          <div className="partner-card">
            Social Supporters
          </div>

          <div className="partner-card">
            Volunteer Network
          </div>

          <div className="partner-card">
            Development Partners
          </div>

        </div>

      </section>


      {/* Call to Action */}
      <section className="cta-section">

        <div>

          <h2>
            Together, We Can Make a Difference
          </h2>

          <p>
            Join us in creating positive change and building
            a better future for communities.
          </p>

          <div className="hero-buttons">

            <Link
              to="/donate"
              className="primary-btn"
            >
              Donate Now
            </Link>

            <Link
              to="/get-involved"
              className="secondary-btn"
            >
              Get Involved
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Home;
