import { Link } from "react-router-dom";

function Blog() {
  const posts = [
    {
      category: "Education",
      title: "Creating Better Learning Opportunities for Every Child",
      date: "August 2026",
      description:
        "Discover how our education initiatives are helping children access quality learning and build a brighter future.",
      image: "/images/blog-education.jpg",
    },
    {
      category: "Community",
      title: "Building Stronger Communities Through Collective Action",
      date: "August 2026",
      description:
        "Learn how our community programs are creating sustainable change at the grassroots level.",
      image: "/images/blog-community.jpg",
    },
    {
      category: "Women Empowerment",
      title: "Empowering Women Through Skills and Livelihood",
      date: "July 2026",
      description:
        "Explore how vocational training and livelihood opportunities are helping women become financially independent.",
      image: "/images/blog-women.jpg",
    },
  ];

  return (
    <div className="blog-page">

      {/* HERO */}
      <section className="blog-hero">
        <div className="blog-hero-content">
          <span>OUR STORIES</span>

          <h1>
            Stories That
            <br />
            <strong>Inspire Change.</strong>
          </h1>

          <p>
            Read stories, updates and insights from our work with
            children, women and communities.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="blog-intro">
        <span className="section-tag">FROM THE FIELD</span>

        <h2>
          Latest Stories &
          <br />
          <span>Updates</span>
        </h2>

        <p>
          Stay connected with our projects, success stories, interviews
          and important social initiatives.
        </p>
      </section>

      {/* BLOG CARDS */}
      <section className="blog-grid">

        {posts.map((post, index) => (
          <article className="blog-card" key={index}>

            <div className="blog-image">
              <img
                src={post.image}
                alt={post.title}
              />
            </div>

            <div className="blog-content">

              <div className="blog-meta">
                <span>{post.category}</span>
                <small>{post.date}</small>
              </div>

              <h3>{post.title}</h3>

              <p>{post.description}</p>

              <button className="read-more">
                Read Story →
              </button>

            </div>

          </article>
        ))}

      </section>

      {/* NEWSLETTER */}
      <section className="newsletter">

        <div>
          <span>STAY CONNECTED</span>

          <h2>
            Get stories of
            <br />
            <strong>change in your inbox.</strong>
          </h2>

          <p>
            Subscribe to our newsletter for project updates,
            community stories and opportunities to get involved.
          </p>
        </div>

        <form className="newsletter-form">
          <input
            type="email"
            placeholder="Enter your email address"
            required
          />

          <button type="submit">
            Subscribe →
          </button>
        </form>

      </section>

      {/* CTA */}
      <section className="blog-cta">

        <h2>
          Want to be part of
          <br />
          the change?
        </h2>

        <p>
          Explore our programs and discover how you can contribute.
        </p>

        <Link to="/get-involved">
          Get Involved →
        </Link>

      </section>

    </div>
  );
}

export default Blog;
