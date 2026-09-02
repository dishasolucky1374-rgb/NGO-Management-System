function Media() {
  const mediaItems = [
    {
      title: "Tree Plantation Drive",
      category: "Environment",
      image:
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80",
    },
    {
      title: "Food Distribution Program",
      category: "Community Service",
      image:
        "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?auto=format&fit=crop&w=1000&q=80",
    },
    {
      title: "Volunteer Team Activity",
      category: "Volunteers",
      image:
        "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1000&q=80",
    },
    {
      title: "Children Community Activity",
      category: "Children",
      image:
        "https://images.unsplash.com/photo-1489493585363-d69421e0edd3?auto=format&fit=crop&w=1000&q=80",
    },
    {
      title: "Women Empowerment Meet",
      category: "Women Empowerment",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80",
    },
    {
      title: "Community Cleanliness Drive",
      category: "Environment",
      image:
        "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=1000&q=80",
    },
    {
      title: "Fundraising & Charity Event",
      category: "Fundraising",
      image:
        "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=1000&q=80",
    },
    {
      title: "Community Gathering",
      category: "Community",
      image:
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1000&q=80",
    },
  ];

  return (
    <main>
      {/* ================= HERO ================= */}
      <section className="page-hero">
        <div>
          <p>OUR MEDIA</p>

          <h1>Media & Gallery</h1>

          <span>
            Explore moments, activities and stories from our journey of
            creating meaningful change.
          </span>
        </div>
      </section>

      {/* ================= INTRODUCTION ================= */}
      <section className="projects-intro">
        <p className="section-label">OUR JOURNEY</p>

        <h2>Moments that inspire change.</h2>

        <p>
          Take a look at some of our community activities, awareness
          initiatives, workshops and programs that bring people together and
          create lasting impact.
        </p>
      </section>

      {/* ================= MEDIA GALLERY ================= */}
      <section className="projects-section media-gallery">
        {mediaItems.map((item, index) => (
          <article className="project-card media-card" key={index}>
            <div className="project-image media-image">
              <img
                src={item.image}
                alt={item.title}
              />

              <div className="project-category">
                {item.category}
              </div>
            </div>

            <div className="project-content">
              <h2>{item.title}</h2>

              <p>
                Capturing the efforts of our volunteers, communities and
                beneficiaries as we work towards building a better future.
              </p>

              <button className="project-btn">
                View Photo
              </button>
            </div>
          </article>
        ))}
      </section>

      {/* ================= MEDIA HIGHLIGHTS ================= */}
      <section className="project-impact">
        <div className="section-heading">
          <p>MEDIA HIGHLIGHTS</p>

          <h2>Our work is powered by people and community.</h2>
        </div>

        <div className="project-stats">
          <div>
            <strong>50+</strong>
            <span>Activities</span>
          </div>

          <div>
            <strong>25+</strong>
            <span>Projects</span>
          </div>

          <div>
            <strong>100+</strong>
            <span>Volunteers</span>
          </div>

          <div>
            <strong>10K+</strong>
            <span>People Reached</span>
          </div>
        </div>
      </section>

      {/* ================= STORY SECTION ================= */}
      <section className="projects-intro">
        <p className="section-label">OUR STORIES</p>

        <h2>Every picture tells a story.</h2>

        <p>
          Behind every activity is a community, a volunteer and a story of
          hope. Our media captures these moments and helps share the impact of
          our work with a wider audience.
        </p>
      </section>

      {/* ================= CTA ================= */}
      <section className="about-cta">
        <h2>Be a part of our journey.</h2>

        <p>
          Join us in creating more moments of change and making a difference
          in the lives of communities.
        </p>

        <a href="/get-involved" className="primary-btn">
          Get Involved
        </a>
      </section>
    </main>
  );
}

export default Media;
