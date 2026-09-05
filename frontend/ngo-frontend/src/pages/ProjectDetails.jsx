import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./projects.css";

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [projectImages, setProjectImages] = useState([]);
  const [projectTeam, setProjectTeam] = useState([]);
  const [projectStories, setProjectStories] = useState([]);
  const [projectStats, setProjectStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch project details
    fetch(`http://localhost:5000/api/projects/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Project not found");
        }
        return response.json();
      })
      .then((data) => {
        setProject(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Project error:", err);
        setError("Unable to load project.");
        setLoading(false);
      });

    // Fetch project gallery images
    fetch(`http://localhost:5000/api/projects/${id}/images`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch project images");
        }
        return response.json();
      })
      .then((data) => {
        setProjectImages(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Project images error:", err);
        setProjectImages([]);
      });

    // Fetch project team and partners
    fetch(`http://localhost:5000/api/projects/${id}/team`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch project team");
        }
        return response.json();
      })
      .then((data) => {
        setProjectTeam(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Project team error:", err);
        setProjectTeam([]);
      });

    // Fetch project success stories
    fetch(`http://localhost:5000/api/projects/${id}/success-stories`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch success stories");
        }
        return response.json();
      })
      .then((data) => {
        setProjectStories(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Project success stories error:", err);
        setProjectStories([]);
      });

    // Fetch project statistics
    fetch(`http://localhost:5000/api/projects/${id}/statistics`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch project statistics");
        }
        return response.json();
      })
      .then((data) => {
        setProjectStats(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Project statistics error:", err);
        setProjectStats([]);
      });
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <main className="project-details-page">
        <div className="project-loading">
          <h2>Loading project...</h2>
        </div>
      </main>
    );
  }

  // Error state
  if (error || !project) {
    return (
      <main className="project-details-page">
        <div className="project-error">
          <h2>{error || "Project not found."}</h2>

          <button
            className="primary-btn"
            onClick={() => navigate("/projects")}
          >
            Back to Projects
          </button>
        </div>
      </main>
    );
  }

  // Separate team members and partners
  const teamMembers = projectTeam.filter(
    (member) => member.type === "Team Member"
  );

  const communityPartners = projectTeam.filter(
    (member) => member.type === "Community Partner"
  );

  const supportingOrganizations = projectTeam.filter(
    (member) => member.type === "Supporting Organization"
  );

  return (
    <main className="project-details-page">

      {/* =========================================
          PROJECT HERO
      ========================================= */}
      <section
        className="project-details-hero"
        style={{
          backgroundImage: `linear-gradient(
            rgba(0, 0, 0, 0.55),
            rgba(0, 0, 0, 0.55)
          ), url(${project.image})`,
        }}
      >
        <div className="project-details-hero-content">
          <p>OUR PROJECT</p>

          <h1>{project.title}</h1>

          <span className="details-status">
            {project.status}
          </span>
        </div>
      </section>


      {/* =========================================
          PROJECT OVERVIEW
      ========================================= */}
      <section className="project-details-section">
        <div className="project-details-container">

          <button
            className="back-project-btn"
            onClick={() => navigate("/projects")}
          >
            ← Back to Projects
          </button>

          <div className="project-details-grid">

            {/* Project Image */}
            <div className="project-details-image">
              <img
                src={project.image}
                alt={project.title}
              />
            </div>

            {/* Project Content */}
            <div className="project-details-content">

              <p className="section-label">
                PROJECT OVERVIEW
              </p>

              <h2>{project.title}</h2>

              <p className="project-description">
                {project.description}
              </p>

              {/* Project Information */}
              <div className="project-info-box">

                <div className="project-info-item">
                  <span>STATUS</span>
                  <strong>{project.status}</strong>
                </div>

                <div className="project-info-item">
                  <span>LOCATION</span>
                  <strong>
                    {project.location || "Maharashtra"}
                  </strong>
                </div>

                <div className="project-info-item">
                  <span>START DATE</span>
                  <strong>
                    {project.start_date
                      ? new Date(
                          project.start_date
                        ).toLocaleDateString("en-IN")
                      : "Not specified"}
                  </strong>
                </div>

                <div className="project-info-item">
                  <span>END DATE</span>
                  <strong>
                    {project.end_date
                      ? new Date(
                          project.end_date
                        ).toLocaleDateString("en-IN")
                      : "Ongoing"}
                  </strong>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================
          PROJECT IMPACT
      ========================================= */}
      
<section className="project-detail-impact">

  <div className="section-heading">
    <p>OUR IMPACT</p>

    <h2>Making a difference together.</h2>

    <span>
      Every project creates meaningful change in
      the communities we serve.
    </span>
  </div>

  <div className="impact-stats-grid">

    {projectStats.length > 0 ? (
      projectStats.slice(0, 4).map((stat) => (
        <div
          className="impact-stat-card"
          key={stat.id}
        >
          <h3>
            {stat.metric_value}+
          </h3>

          <p>
            {stat.metric_name}
          </p>
        </div>
      ))
    ) : (
      <>
        <div className="impact-stat-card">
          <h3>—</h3>
          <p>Impact Data</p>
        </div>

        <div className="impact-stat-card">
          <h3>—</h3>
          <p>Impact Data</p>
        </div>

        <div className="impact-stat-card">
          <h3>—</h3>
          <p>Impact Data</p>
        </div>

        <div className="impact-stat-card">
          <h3>—</h3>
          <p>Impact Data</p>
        </div>
      </>
    )}

  </div>
</section>

      {/* =========================================
          PROJECT GOALS / BENEFICIARIES / OUTCOMES
      ========================================= */}
      <section className="project-purpose-section">

        <div className="project-purpose-container">

          <div className="project-purpose-heading">

            <p className="section-label">
              PROJECT FOCUS
            </p>

            <h2>
              Creating meaningful change.
            </h2>

            <span>
              Every project is designed with clear goals,
              focused beneficiaries, and measurable outcomes.
            </span>

          </div>


          <div className="project-purpose-grid">

            {/* PROJECT GOALS */}
            <div className="project-purpose-card">

              <div className="purpose-number">
                01
              </div>

              <h3>
                Project Goals
              </h3>

              <p>
                {project.goals ||
                  "Goals for this project have not been specified yet."}
              </p>

            </div>


            {/* BENEFICIARIES */}
            <div className="project-purpose-card">

              <div className="purpose-number">
                02
              </div>

              <h3>
                Who We Serve
              </h3>

              <p>
                {project.beneficiaries ||
                  "Beneficiaries for this project have not been specified yet."}
              </p>

            </div>


            {/* EXPECTED OUTCOMES */}
            <div className="project-purpose-card">

              <div className="purpose-number">
                03
              </div>

              <h3>
                Expected Outcomes
              </h3>

              <p>
                {project.expected_outcomes ||
                  "Expected outcomes for this project have not been specified yet."}
              </p>

            </div>

          </div>

        </div>
      </section>


      {/* =========================================
          PROJECT TIMELINE
      ========================================= */}
      <section className="project-timeline-section">

        <div className="section-heading">

          <p>PROJECT JOURNEY</p>

          <h2>
            From vision to impact.
          </h2>

          <span>
            A look at the key stages of this project.
          </span>

        </div>


        <div className="project-timeline">

          <div className="timeline-item">

            <div className="timeline-number">
              01
            </div>

            <div className="timeline-content">

              <h3>
                Project Planning
              </h3>

              <p>
                Understanding community needs and
                planning activities to create meaningful
                and sustainable impact.
              </p>

            </div>

          </div>


          <div className="timeline-item">

            <div className="timeline-number">
              02
            </div>

            <div className="timeline-content">

              <h3>
                Implementation
              </h3>

              <p>
                Working with communities, volunteers,
                and partners to implement the planned
                activities.
              </p>

            </div>

          </div>


          <div className="timeline-item">

            <div className="timeline-number">
              03
            </div>

            <div className="timeline-content">

              <h3>
                Creating Impact
              </h3>

              <p>
                Measuring outcomes and creating lasting
                positive change within the community.
              </p>

            </div>

          </div>

        </div>
      </section>


      {/* =========================================
          TEAM & PARTNERS
      ========================================= */}
      {projectTeam.length > 0 && (
        <section className="project-team-section">

          <div className="section-heading">

            <p>
              OUR TEAM & PARTNERS
            </p>

            <h2>
              Working together for greater impact.
            </h2>

            <span>
              Our projects are strengthened by dedicated
              team members, community partners, and
              supporting organizations.
            </span>

          </div>


          <div className="project-team-grid">

            {/* TEAM MEMBERS */}
            {teamMembers.length > 0 && (
              <div className="project-team-group">

                <div className="team-group-number">
                  01
                </div>

                <h3>
                  Team Members
                </h3>

                <div className="team-member-list">

                  {teamMembers.map((member) => (
                    <div
                      className="team-member-card"
                      key={member.id}
                    >

                      <div className="team-member-icon">
                        👤
                      </div>

                      <div>
                        <h4>
                          {member.name}
                        </h4>

                        <p>
                          {member.role}
                        </p>
                      </div>

                    </div>
                  ))}

                </div>

              </div>
            )}


            {/* COMMUNITY PARTNERS */}
            {communityPartners.length > 0 && (
              <div className="project-team-group">

                <div className="team-group-number">
                  02
                </div>

                <h3>
                  Community Partners
                </h3>

                <div className="team-member-list">

                  {communityPartners.map((member) => (
                    <div
                      className="team-member-card"
                      key={member.id}
                    >

                      <div className="team-member-icon">
                        🤝
                      </div>

                      <div>
                        <h4>
                          {member.name}
                        </h4>

                        <p>
                          {member.role}
                        </p>
                      </div>

                    </div>
                  ))}

                </div>

              </div>
            )}


            {/* SUPPORTING ORGANIZATIONS */}
            {supportingOrganizations.length > 0 && (
              <div className="project-team-group">

                <div className="team-group-number">
                  03
                </div>

                <h3>
                  Supporting Organizations
                </h3>

                <div className="team-member-list">

                  {supportingOrganizations.map((member) => (
                    <div
                      className="team-member-card"
                      key={member.id}
                    >

                      <div className="team-member-icon">
                        🏢
                      </div>

                      <div>
                        <h4>
                          {member.name}
                        </h4>

                        <p>
                          {member.role}
                        </p>
                      </div>

                    </div>
                  ))}

                </div>

              </div>
            )}

          </div>

        </section>
      )}


      {/* =========================================
          SUCCESS STORIES
      ========================================= */}
      {projectStories.length > 0 && (
        <section className="project-success-section">

          <div className="section-heading">

            <p>
              SUCCESS STORIES
            </p>

            <h2>
              Real stories. Real impact.
            </h2>

            <span>
              The impact of our work is reflected in the
              experiences of the communities we serve.
            </span>

          </div>


          <div className="project-success-grid">

            {projectStories.map((story) => (

              <div
                className="project-success-card"
                key={story.id}
              >

                <div className="success-quote">
                  “
                </div>

                <h3>
                  {story.title}
                </h3>

                <p className="success-story-text">
                  {story.story}
                </p>

                {story.person_name && (
                  <div className="success-person">

                    <div className="success-person-icon">
                      👤
                    </div>

                    <div>
                      <strong>
                        {story.person_name}
                      </strong>

                      <span>
                        Project Beneficiary
                      </span>
                    </div>

                  </div>
                )}

              </div>

            ))}

          </div>

        </section>
      )}


      {/* =========================================
          PROJECT IMPACT STATISTICS
      ========================================= */}
      {projectStats.length > 0 && (
        <section className="project-stats-section">

          <div className="section-heading">

            <p>
              PROJECT IMPACT
            </p>

            <h2>
              Measuring the difference we make.
            </h2>

            <span>
              A snapshot of the people reached, activities
              conducted, and community support generated
              through this project.
            </span>

          </div>


          <div className="project-stats-grid">

            {projectStats.map((stat) => (

              <div
                className="project-stat-card"
                key={stat.id}
              >

                <div className="project-stat-number">
                  {stat.metric_value}
                </div>

                <h3>
                  {stat.metric_name}
                </h3>

                {stat.metric_unit && (
                  <span>
                    {stat.metric_unit}
                  </span>
                )}

                <div className="project-stat-bar">

                  <div
                    className="project-stat-bar-fill"
                    style={{
                      width: `${Math.min(
                        stat.metric_value,
                        100
                      )}%`,
                    }}
                  ></div>

                </div>

              </div>

            ))}

          </div>

        </section>
      )}


      {/* =========================================
          PROJECT MEDIA GALLERY
      ========================================= */}
      {projectImages.length > 0 && (
        <section className="project-media-section">

          <div className="section-heading">

            <p>
              PROJECT GALLERY
            </p>

            <h2>
              Moments from our work.
            </h2>

            <span>
              A glimpse into the activities, people,
              and communities involved in this project.
            </span>

          </div>


          <div className="project-media-grid">

            {projectImages.map((image) => (

              <div
                className="project-media-card"
                key={image.id}
              >

                <img
                  src={image.image_url}
                  alt={`${project.title} project`}
                />

              </div>

            ))}

          </div>

        </section>
      )}


      {/* =========================================
          DONATION / SUPPORT CTA
      ========================================= */}
      <section className="about-cta">

        <h2>
          Want to support this project?
        </h2>

        <p>
          Your contribution can help us reach more
          people and create greater impact.
        </p>

        <button
          className="primary-btn"
          onClick={() => navigate("/donate")}
        >
          Support This Project
        </button>

      </section>

    </main>
  );
}

export default ProjectDetails;
