function Projects() {
  const projects = [
    {
      title: "Education for Every Child",
      category: "Education",
      location: "Nashik, Maharashtra",
      status: "Ongoing",
      description:
        "Supporting children from underserved communities with educational resources, learning support, and opportunities for a better future.",
    },
    {
      title: "Community Health Initiative",
      category: "Healthcare",
      location: "Maharashtra",
      status: "Ongoing",
      description:
        "Providing community-based healthcare support, awareness programs, and health camps for underserved communities.",
    },
    {
      title: "Women Skill Development",
      category: "Women Empowerment",
      location: "Nashik, Maharashtra",
      status: "Completed",
      description:
        "Helping women develop practical skills and access livelihood opportunities to become financially independent.",
    },
    {
      title: "Digital Learning Program",
      category: "Education",
      location: "Rural Maharashtra",
      status: "Ongoing",
      description:
        "Promoting digital learning and improving access to educational technology for students in rural communities.",
    },
    {
      title: "Livelihood Development",
      category: "Livelihood",
      location: "Maharashtra",
      status: "Ongoing",
      description:
        "Supporting marginalized communities through vocational training, skill development, and livelihood generation.",
    },
    {
      title: "Community Awareness Drive",
      category: "Community",
      location: "Maharashtra",
      status: "Completed",
      description:
        "Creating awareness about education, healthcare, women's rights, and community development.",
    },
  ];

  return (
    <main>

      {/* Hero */}
      <section className="page-hero">
        <div>
          <p>OUR INITIATIVES</p>

          <h1>Projects</h1>

          <span>
            Discover the initiatives creating meaningful change
            across communities.
          </span>
        </div>
      </section>


      {/* Introduction */}
      <section className="projects-intro">

        <p className="section-label">OUR PROJECTS</p>

        <h2>Turning ideas into measurable impact.</h2>

        <p>
          From education and healthcare to women empowerment and
          livelihood development, our projects focus on creating
          sustainable opportunities for communities.
        </p>

      </section>


      {/* Project Grid */}
      <section className="projects-section">

        {projects.map((project, index) => (

          <article className="project-card" key={index}>

            <div className="project-image">
              <div className="project-category">
                {project.category}
              </div>
            </div>

            <div className="project-content">

              <div className="project-status">
                {project.status}
              </div>

              <h2>{project.title}</h2>

              <p>
                {project.description}
              </p>

              <div className="project-location">
                📍 {project.location}
              </div>

              <button className="project-btn">
                View Project
              </button>

            </div>

          </article>

        ))}

      </section>


      {/* Project Impact */}
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


      {/* CTA */}
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
