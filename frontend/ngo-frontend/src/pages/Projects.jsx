import { useState } from "react";
import "./projects.css";

function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");

  const projects = [
    {
      title: "Education for Every Child",
      category: "Education",
      location: "Nashik, Maharashtra",
      status: "Ongoing",
      description:
        "Supporting children from underserved communities with educational resources, learning support, and opportunities for a better future.",
      image:
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80",
    },

    {
      title: "Community Health Initiative",
      category: "Healthcare",
      location: "Maharashtra",
      status: "Ongoing",
      description:
        "Providing community-based healthcare support, awareness programs, and health camps for underserved communities.",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80",
    },

    {
      title: "Women Skill Development",
      category: "Women Empowerment",
      location: "Nashik, Maharashtra",
      status: "Completed",
      description:
        "Helping women develop practical skills and access livelihood opportunities to become financially independent.",
      image:
        "https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&w=900&q=80",
    },

    {
      title: "Digital Learning Program",
      category: "Education",
      location: "Rural Maharashtra",
      status: "Ongoing",
      description:
        "Promoting digital learning and improving access to educational technology for students in rural communities.",
      image:
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80",
    },

    {
      title: "Livelihood Development",
      category: "Livelihood",
      location: "Maharashtra",
      status: "Ongoing",
      description:
        "Supporting marginalized communities through vocational training, skill development, and livelihood generation.",
      image:
        "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80",
    },

    {
      title: "Community Awareness Drive",
      category: "Community",
      location: "Maharashtra",
      status: "Completed",
      description:
        "Creating awareness about education, healthcare, women's rights, and community development.",
      image:
        "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=900&q=80",
    },
  ];

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
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <article className="project-card" key={index}>
              {/* PROJECT IMAGE */}
              <div className="project-image">
                <img src={project.image} alt={project.title} />

                <div className="project-category">
                  {project.category}
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

                <button className="project-btn">
                  View Project
                </button>
              </div>
            </article>
          ))
        ) : (
          <div className="no-projects">
            <h3>No Upcoming Projects</h3>
            <p>
              New initiatives will be added here soon.
            </p>
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
