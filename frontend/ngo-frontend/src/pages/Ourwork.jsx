function OurWork() {
  return (
    <main>

      {/* Hero */}
      <section className="page-hero">
        <div>
          <p>WHAT WE DO</p>
          <h1>Our Work</h1>
          <span>
            Building stronger communities through education, healthcare,
            and livelihood opportunities.
          </span>
        </div>
      </section>


      {/* Introduction */}
      <section className="work-intro">
        <p className="section-label">OUR PROGRAMS</p>

        <h2>Creating meaningful and sustainable change.</h2>

        <p>
          We work with communities to identify their needs and develop
          programs that create long-term opportunities and improve
          quality of life.
        </p>
      </section>


      {/* Programs */}
      <section className="programs-section">

        <div className="program-card">
          <div className="program-number">01</div>

          <h2>Education Programs</h2>

          <p>
            We provide educational opportunities to underprivileged
            children through learning support, educational resources,
            scholarships, and community-based education initiatives.
          </p>

          <ul>
            <li>Learning support</li>
            <li>Educational resources</li>
            <li>Scholarship support</li>
            <li>Digital learning opportunities</li>
          </ul>
        </div>


        <div className="program-card">
          <div className="program-number">02</div>

          <h2>Healthcare Initiatives</h2>

          <p>
            Our healthcare initiatives focus on making essential health
            services accessible to underserved communities.
          </p>

          <ul>
            <li>Health camps</li>
            <li>Community health awareness</li>
            <li>Mobile health support</li>
            <li>Preventive healthcare</li>
          </ul>
        </div>


        <div className="program-card">
          <div className="program-number">03</div>

          <h2>Livelihood Programs</h2>

          <p>
            We help marginalized communities develop skills and create
            sustainable livelihood opportunities.
          </p>

          <ul>
            <li>Vocational training</li>
            <li>Skill development</li>
            <li>Women empowerment</li>
            <li>Income generation opportunities</li>
          </ul>
        </div>

      </section>


      {/* Impact */}
      <section className="work-impact">

        <div className="section-heading">
          <p>OUR IMPACT</p>
          <h2>Making a difference where it matters.</h2>
        </div>

        <div className="impact-grid">

          <div>
            <strong>10K+</strong>
            <span>Lives Impacted</span>
          </div>

          <div>
            <strong>50+</strong>
            <span>Communities Reached</span>
          </div>

          <div>
            <strong>100+</strong>
            <span>Volunteers</span>
          </div>

          <div>
            <strong>25+</strong>
            <span>Active Programs</span>
          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="about-cta">

        <h2>Help us create greater impact.</h2>

        <p>
          Your time, skills, and support can help us reach more communities.
        </p>

        <a href="/get-involved" className="primary-btn">
          Get Involved
        </a>

      </section>

    </main>
  );
}

export default OurWork;
