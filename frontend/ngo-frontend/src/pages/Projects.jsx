import { useEffect, useState } from "react";
import "./projects.css";

function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/projects")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        return response.json();
      })
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching projects:", err);
        setError("Unable to load projects.");
        setLoading(false);
      });
  }, []);

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.status === activeFilter);

  return (
    <main>
      {/* ================= HERO ================= */}
      <section className="page-hero">
        <div>
          <p>OUR INITIATIVES</p>
          <h1>Projects</h1>
          <span>
            Discover the initiatives creating meaningful change across
            communities.
          </span>
        </div>
      </section>

      {/* ================= INTRODUCTION ================= */}
      <section className="projects-intro">
        <p className="section-label">OUR PROJECTS</p>

        <h2>Turning ideas into measurable impact.</h2>

        <p>
          From education and healthcare to women empowerment and livelihood
          development, our projects focus on creating sustainable
          opportunities for communities.
        </p>
      </section>

      {/* ================= PROJECT FILTERS ================= */}
      <section className="project-filters">
        <button
          className={activeFilter === "All" ? "active" : ""}
          onClick={() => setActiveFilter("All")}
        >
          All Projects
        </button>

        <button
          className={activeFilter === "Ongoing" ? "active" : ""}
          onClick={() => setActiveFilter("Ongoing")}
        >
          Ongoing
        </button>

        <button
          className={activeFilter === "Completed" ? "active" : ""}
          onClick={() => setActiveFilter("Completed")}
        >
          Completed
        </button>

        <button
          className={activeFilter === "Upcoming" ? "active" : ""}
          onClick={() => setActiveFilter("Upcoming")}
        >
          Upcoming
        </button>
      </section>

      {/* ================= PROJECT GRID ================= */}
      <section className="projects-section">
        {loading ? (
          <div className="no-projects">
            <h3>Loading Projects...</h3>
          </div>
        ) : error ? (
          <div className="no-projects">
            <h3>{error}</h3>
            <p>Please try again later.</p>
          </div>
        ) : filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <article className="project-card" key={project.id}>
              {/* PROJECT IMAGE */}
              <div className="project-image">
                <img
                  src={
                    project.image ||
                    "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80"
                  }
                  alt={project.title}
                />

                <div className="project-category">
                  {project.category || "Community Development"}
                </div>
              </div>

              {/* PROJECT CONTENT */}
              <div className="project-content">
                <div className="project-status">
                  {project.status}
                </div>

                <h2>{project.title}</h2>

                <p>{project.description}</p>

                <div className="project-location">
                  📍 {project.location}
                </div>

                <button
                  className="project-btn"
                  onClick={() =>
                    (window.location.href = `/projects/${project.id}`)
                  }
                >
                  View Project
                </button>
              </div>
            </article>
          ))
        ) : (
          <div className="no-projects">
            <h3>No {activeFilter} Projects</h3>
            <p>New initiatives will be added here soon.</p>
          </div>
        )}
      </section>

      {/* ================= PROJECT IMPACT ================= */}
      <section className="project-impact">
        <div className="section-heading">
          <p>PROJECT IMPACT</p>

          <h2>Every project starts with a purpose.</h2>
        </div>

        <div className="project-stats">
          <div>
            <strong>25+</strong>
            <span>Projects</span>
          </div>

          <div>
            <strong>10K+</strong>
            <span>Beneficiaries</span>
          </div>

          <div>
            <strong>50+</strong>
            <span>Communities</span>
          </div>

          <div>
            <strong>100+</strong>
            <span>Volunteers</span>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="about-cta">
        <h2>Want to support a project?</h2>

        <p>
          Your contribution can help us expand our impact.
        </p>

        <a href="/donate" className="primary-btn">
          Support Our Work
        </a>
      </section>
    </main>
  );
}

export default Projects;
