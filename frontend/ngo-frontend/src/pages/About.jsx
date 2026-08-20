function About() {
  return (
    <main>

      {/* Page Hero */}
      <section className="page-hero">
        <div>
          <p>WHO WE ARE</p>
          <h1>About Us</h1>
          <span>
            Creating opportunities. Empowering communities. Changing lives.
          </span>
        </div>
      </section>


      {/* Mission & Vision */}
      <section className="about-intro">

        <div className="about-box">
          <p className="section-label">OUR MISSION</p>

          <h2>Creating lasting impact in people's lives.</h2>

          <p>
            Our mission is to create a lasting impact in the lives of
            underprivileged children and communities by providing education,
            women empowerment, and livelihood opportunities.
          </p>
        </div>


        <div className="about-box">
          <p className="section-label">OUR VISION</p>

          <h2>A better future for every child and community.</h2>

          <p>
            A world where every child has access to quality education,
            healthcare, and the opportunity to achieve their full potential.
          </p>
        </div>

      </section>


      {/* Our Story */}
      <section className="story-section">

        <div className="story-content">

          <p className="section-label">OUR JOURNEY</p>

          <h2>From a small initiative to a growing movement.</h2>

          <p>
            Our journey began with a simple belief — every individual
            deserves an opportunity to live a dignified and fulfilling life.
          </p>

          <p>
            Over the years, our work has expanded across education,
            healthcare, women empowerment, and livelihood development.
            With the support of volunteers, partners, donors, and
            communities, we continue to create meaningful and sustainable
            change.
          </p>

        </div>

      </section>


      {/* Milestones */}
      <section className="timeline-section">

        <div className="section-heading">
          <p>OUR HISTORY</p>
          <h2>Key Milestones</h2>
        </div>


        <div className="timeline">

          <div className="timeline-item">
            <div className="timeline-year">2018</div>
            <div>
              <h3>Foundation</h3>
              <p>
                Our NGO began its journey with a focus on supporting
                children through education.
              </p>
            </div>
          </div>


          <div className="timeline-item">
            <div className="timeline-year">2020</div>
            <div>
              <h3>Community Healthcare</h3>
              <p>
                Healthcare initiatives and community health camps were
                introduced to reach underserved communities.
              </p>
            </div>
          </div>


          <div className="timeline-item">
            <div className="timeline-year">2022</div>
            <div>
              <h3>Women Empowerment</h3>
              <p>
                Skill development and livelihood programs were launched
                to support women and marginalized communities.
              </p>
            </div>
          </div>


          <div className="timeline-item">
            <div className="timeline-year">2025</div>
            <div>
              <h3>Expanding Our Impact</h3>
              <p>
                Our programs expanded to more communities with the
                support of volunteers and partner organizations.
              </p>
            </div>
          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="about-cta">

        <h2>Be a part of the change.</h2>

        <p>
          Together, we can create opportunities and build a better future.
        </p>

        <a href="/get-involved" className="primary-btn">
          Get Involved
        </a>

      </section>

    </main>
  );
}

export default About;
