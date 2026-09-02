import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./About.css";

function About() {
  const [story, setStory] = useState(null);
  const [coreValues, setCoreValues] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const [visionMission, setVisionMission] = useState(null);

  const defaultStory = {
    content:
      "Our journey began with a simple belief — every individual deserves an opportunity to live a dignified and fulfilling life. What started as an effort to support children through education gradually expanded into a broader community-focused initiative. Over the years, our work has grown to include healthcare, women empowerment, livelihood development, and community support programs. With the support of volunteers, donors, partners, and local communities, we continue to work towards creating meaningful and sustainable change.",
  };

  const defaultCoreValues = [
    {
      id: 1,
      value: "Integrity",
      description:
        "We work with honesty, responsibility, and commitment in everything we do.",
    },
    {
      id: 2,
      value: "Inclusivity",
      description:
        "We believe everyone deserves equal opportunities, dignity, and respect.",
    },
    {
      id: 3,
      value: "Empathy",
      description:
        "We understand community needs and work with compassion to create meaningful change.",
    },
    {
      id: 4,
      value: "Transparency",
      description:
        "We remain accountable to our communities, volunteers, donors, and partners.",
    },
  ];

  const defaultPrograms = [
    {
      id: 1,
      name: "Child Education",
      description:
        "Providing educational opportunities, learning resources, and support to children.",
    },
    {
      id: 2,
      name: "Women Empowerment",
      description:
        "Supporting women through skill development, opportunities, and livelihood programs.",
    },
    {
      id: 3,
      name: "Healthcare Support",
      description:
        "Working towards better access to healthcare and health awareness in underserved communities.",
    },
    {
      id: 4,
      name: "Community Development",
      description:
        "Supporting communities through sustainable initiatives and meaningful development programs.",
    },
  ];

  const defaultTeamMembers = [
    {
      id: 1,
      name: "Founder",
      role: "Founder & Director",
      image_url:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a",
      bio:
        "Leading the organization with a vision of creating opportunities and building stronger communities.",
    },
    {
      id: 2,
      name: "Program Coordinator",
      role: "Program Coordinator",
      image_url:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
      bio:
        "Coordinating community programs and working closely with volunteers and beneficiaries.",
    },
    {
      id: 3,
      name: "Community Manager",
      role: "Community Manager",
      image_url:
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
      bio:
        "Building meaningful relationships with communities and supporting grassroots initiatives.",
    },
  ];

  useEffect(() => {
    fetch("https://ngo-management-backend.onrender.com/api/about/story")
      .then((res) => res.json())
      .then((data) => setStory(data[0] || defaultStory))
      .catch(() => setStory(defaultStory));

    fetch("https://ngo-management-backend.onrender.com/api/about/core-values")
      .then((res) => res.json())
      .then((data) =>
        setCoreValues(data.length ? data : defaultCoreValues)
      )
      .catch(() => setCoreValues(defaultCoreValues));

    fetch("https://ngo-management-backend.onrender.com/api/about/programs")
      .then((res) => res.json())
      .then((data) => setPrograms(data.length ? data : defaultPrograms))
      .catch(() => setPrograms(defaultPrograms));

    fetch("https://ngo-management-backend.onrender.com/api/about/team-members")
      .then((res) => res.json())
      .then((data) =>
        setTeamMembers(data.length ? data : defaultTeamMembers)
      )
      .catch(() => setTeamMembers(defaultTeamMembers));

    fetch("https://ngo-management-backend.onrender.com/api/statistics")
      .then((res) => res.json())
      .then((data) => setStatistics(data))
      .catch(() => {});

    fetch("https://ngo-management-backend.onrender.com/api/vision-mission")
      .then((res) => res.json())
      .then((data) => setVisionMission(data[0] || null))
      .catch(() => {});
  }, []);

  return (
    <main className="about-page">

      {/* ================= HERO ================= */}
      <section className="about-hero">
        <div className="about-hero-overlay">
          <div className="about-container">
            <p className="about-label">WHO WE ARE</p>

            <h1>About Us</h1>

            <p>
              Creating opportunities. Empowering communities. Changing lives.
            </p>
          </div>
        </div>
      </section>


      {/* ================= INTRODUCTION ================= */}
      <section className="about-introduction">
        <div className="about-container about-intro-grid">

          <div className="about-intro-text">
            <p className="about-label">WHO WE ARE</p>

            <h2>Together, We Can Create a Better Future</h2>

            <p>
              We are committed to creating opportunities for individuals and
              communities and supporting them in building a better and more
              dignified future.
            </p>

            <p>
              Through education, healthcare, women empowerment, livelihood
              opportunities, and community development initiatives, we work
              towards creating meaningful and sustainable social change.
            </p>

            <Link to="/our-work" className="about-link">
              Explore Our Work →
            </Link>
          </div>

          <div className="about-purpose-card">
            <div className="purpose-icon">✦</div>

            <p className="about-label">OUR PURPOSE</p>

            <h3>
              Empowering people and strengthening communities.
            </h3>

            <p>
              To empower people, strengthen communities, and create
              opportunities for a better quality of life.
            </p>
          </div>

        </div>
      </section>


      {/* ================= VISION & MISSION ================= */}
      <section className="about-vision-section">
        <div className="about-container">

          <div className="about-section-heading">
            <p className="about-label">OUR DIRECTION</p>
            <h2>Vision & Mission</h2>
            <p>
              Our vision guides where we want to go, while our mission defines
              how we work towards creating meaningful change.
            </p>
          </div>

          <div className="vision-mission-grid">

            <div className="vision-mission-card">
              <span className="card-number">01</span>

              <p className="about-label">OUR VISION</p>

              <h3>
                {visionMission?.vision_title ||
                  "A society where every individual can live with dignity and hope."}
              </h3>

              <p>
                {visionMission?.vision_description ||
                  "We envision an inclusive and empowered society where children, women, and communities have access to opportunities, support, education, and a better quality of life."}
              </p>
            </div>

            <div className="vision-mission-card">
              <span className="card-number">02</span>

              <p className="about-label">OUR MISSION</p>

              <h3>
                {visionMission?.mission_title ||
                  "Creating lasting impact in people's lives."}
              </h3>

              <p>
                {visionMission?.mission_description ||
                  "Our mission is to create a lasting impact through education, women empowerment, healthcare, livelihood opportunities, and community development."}
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* ================= OUR STORY ================= */}
  <section className="about-story-section">
  <div className="about-container story-grid">

    <div className="story-image">
      <img
        src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c"
        alt="Community support and NGO activities"
      />
    </div>

    <div className="story-text">
      <p className="about-label">OUR STORY</p>

      <h2>From a small initiative to a growing movement.</h2>

      <p>
        {story?.content || defaultStory.content}
      </p>

      <div className="story-highlight">
        <strong>Our belief</strong>
        <span>
          Every individual deserves an opportunity to live a dignified
          and fulfilling life.
        </span>
      </div>
    </div>

  </div>
</section>

      {/* ================= JOURNEY ================= */}
      <section className="about-journey-section">
        <div className="about-container">

          <div className="about-section-heading">
            <p className="about-label">OUR JOURNEY</p>
            <h2>Growing Through Every Step</h2>
            <p>
              Our journey continues to evolve through people, partnerships,
              and community support.
            </p>
          </div>

          <div className="journey-grid">

            <div className="journey-card">
              <span>01</span>
              <h3>Building a Foundation</h3>
              <p>
                We began with a simple commitment to create better
                opportunities for children and communities.
              </p>
            </div>

            <div className="journey-card">
              <span>02</span>
              <h3>Expanding Our Work</h3>
              <p>
                Our focus expanded into healthcare, women empowerment,
                livelihood development, and community initiatives.
              </p>
            </div>

            <div className="journey-card">
              <span>03</span>
              <h3>Strengthening Communities</h3>
              <p>
                Volunteers, donors, and community partners helped us extend
                our reach and strengthen our programs.
              </p>
            </div>

            <div className="journey-card">
              <span>04</span>
              <h3>Looking Ahead</h3>
              <p>
                We continue working towards sustainable and meaningful social
                change.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* ================= CORE VALUES ================= */}
      <section className="about-values-section">
        <div className="about-container">

          <div className="about-section-heading">
            <p className="about-label">WHAT GUIDES US</p>
            <h2>Our Core Values</h2>
            <p>
              The principles that guide our work, decisions, and relationships.
            </p>
          </div>

          <div className="values-grid">

            {coreValues.map((value, index) => (
              <div className="value-card" key={value.id}>

                <span className="value-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3>{value.value}</h3>

                <p>
                  {value.description ||
                    "We are committed to this principle in everything we do."}
                </p>

              </div>
            ))}

          </div>
        </div>
      </section>


      {/* ================= PROGRAMS ================= */}
      <section className="about-programs-section">
        <div className="about-container">

          <div className="about-section-heading">
            <p className="about-label">WHAT WE DO</p>
            <h2>Our Areas of Focus</h2>
            <p>
              We work across key areas to create opportunities and improve
              quality of life.
            </p>
          </div>

          <div className="about-program-grid">

            {programs.map((program, index) => (
              <div className="about-program-card" key={program.id}>

                <span className="program-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3>{program.name}</h3>

                <p>{program.description}</p>

                <Link to="/our-work">
                  Learn More →
                </Link>

              </div>
            ))}

          </div>
        </div>
      </section>


      {/* ================= TEAM ================= */}
      <section className="about-team-section">
        <div className="about-container">

          <div className="about-section-heading">
            <p className="about-label">OUR PEOPLE</p>
            <h2>Leadership & Team</h2>
            <p>
              Dedicated people working together to create meaningful change.
            </p>
          </div>

          <div className="about-team-grid">

            {teamMembers.map((member) => (
              <div className="about-team-card" key={member.id}>

                <div className="team-photo">
                  <img
                    src={member.image_url}
                    alt={member.name}
                  />
                </div>

                <div className="team-info">

                  <h3>{member.name}</h3>

                  <p className="team-role">
                    {member.role}
                  </p>

                  <p>
                    {member.bio ||
                      "Working towards creating opportunities and supporting communities."}
                  </p>

                </div>

              </div>
            ))}

          </div>
        </div>
      </section>


      {/* ================= IMPACT ================= */}
      <section className="about-impact-section">
        <div className="about-container">

          <div className="about-section-heading">
            <p className="about-label">OUR IMPACT</p>
            <h2>Creating Change Together</h2>
            <p>
              Every contribution and every initiative helps us reach more
              people and communities.
            </p>
          </div>

          <div className="about-impact-grid">

            {statistics.length > 0 ? (
              statistics.map((stat) => (
                <div className="impact-card" key={stat.id}>
                  <h3>{stat.value}</h3>
                  <p>{stat.label}</p>
                </div>
              ))
            ) : (
              <>
                <div className="impact-card">
                  <h3>5000+</h3>
                  <p>Lives Impacted</p>
                </div>

                <div className="impact-card">
                  <h3>250+</h3>
                  <p>Volunteers</p>
                </div>

                <div className="impact-card">
                  <h3>50+</h3>
                  <p>Projects Completed</p>
                </div>

                <div className="impact-card">
                  <h3>100+</h3>
                  <p>Communities Reached</p>
                </div>
              </>
            )}

          </div>
        </div>
      </section>


      {/* ================= SUCCESS STORIES ================= */}
      <section className="about-success-section">
        <div className="about-container">

          <div className="about-section-heading">
            <p className="about-label">SUCCESS STORIES</p>
            <h2>Changing Lives, Creating Hope</h2>
            <p>
              Our work is about creating real opportunities and positive
              experiences for people and communities.
            </p>
          </div>

          <div className="success-grid">

            <div className="success-card">
              <span>01</span>
              <h3>Education for a Better Future</h3>
              <p>
                Through education initiatives, children receive learning
                opportunities, resources, and support to build a brighter
                future.
              </p>
            </div>

            <div className="success-card">
              <span>02</span>
              <h3>Empowering Women</h3>
              <p>
                Our initiatives support women through skill development,
                independence, and sustainable livelihood opportunities.
              </p>
            </div>

            <div className="success-card">
              <span>03</span>
              <h3>Supporting Communities</h3>
              <p>
                Community initiatives and volunteer support help us create
                meaningful and positive social change.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* ================= CTA ================= */}
      <section className="about-cta-section">
        <div className="about-container">

          <p className="about-label">JOIN THE MOVEMENT</p>

          <h2>Be a Part of the Change</h2>

          <p>
            Together, we can create opportunities, empower communities, and
            build a better future.
          </p>

          <div className="about-cta-buttons">

            <Link to="/donate" className="primary-btn">
              Donate Now
            </Link>

            <Link to="/get-involved" className="secondary-btn">
              Get Involved
            </Link>

          </div>

        </div>
      </section>

    </main>
  );
}

export default About;
