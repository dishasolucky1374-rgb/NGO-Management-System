
import { useState } from "react";

function Media() {
  const [activeTab, setActiveTab] = useState("photos");

  const photos = [
    {
      title: "Education Program",
      image: "/images/education.jpg",
    },
    {
      title: "Community Health Camp",
      image: "/images/health.jpg",
    },
    {
      title: "Women Empowerment Workshop",
      image: "/images/women.jpg",
    },
    {
      title: "Community Outreach",
      image: "/images/community.jpg",
    },
  ];

  const videos = [
    {
      title: "Our Impact Story",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      title: "Education Initiative",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
  ];

  return (
    <div className="media-page">

      {/* Hero */}
      <section className="media-hero">
        <div>
          <span className="section-tag">OUR MEDIA</span>

          <h1>
            Stories of <span>Change & Impact</span>
          </h1>

          <p>
            Explore our work, community stories, events and the people
            whose lives are being transformed through our initiatives.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="media-section">

        <div className="media-tabs">
          <button
            className={activeTab === "photos" ? "active" : ""}
            onClick={() => setActiveTab("photos")}
          >
            Photos
          </button>

          <button
            className={activeTab === "videos" ? "active" : ""}
            onClick={() => setActiveTab("videos")}
          >
            Videos
          </button>

          <button
            className={activeTab === "press" ? "active" : ""}
            onClick={() => setActiveTab("press")}
          >
            Press Releases
          </button>

          <button
            className={activeTab === "electronic" ? "active" : ""}
            onClick={() => setActiveTab("electronic")}
          >
            Electronic Media
          </button>
        </div>

        {/* Photos */}
        {activeTab === "photos" && (
          <div className="media-grid">

            {photos.map((photo, index) => (
              <div className="media-card" key={index}>

                <img
                  src={photo.image}
                  alt={photo.title}
                />

                <div className="media-card-content">
                  <h3>{photo.title}</h3>
                  <p>View our work and community impact.</p>
                </div>

              </div>
            ))}

          </div>
        )}

        {/* Videos */}
        {activeTab === "videos" && (
          <div className="video-grid">

            {videos.map((item, index) => (
              <div className="video-card" key={index}>

                <iframe
                  src={item.video}
                  title={item.title}
                  allowFullScreen
                />

                <h3>{item.title}</h3>

              </div>
            ))}

          </div>
        )}

        {/* Press Releases */}
        {activeTab === "press" && (
          <div className="press-list">

            <article className="press-card">
              <span>PRESS RELEASE</span>
              <h3>
                NGO launches new education initiative for
                underprivileged children
              </h3>
              <p>
                Our latest initiative aims to provide quality
                educational opportunities to children in underserved
                communities.
              </p>
              <button>Read More →</button>
            </article>

            <article className="press-card">
              <span>PRESS RELEASE</span>
              <h3>
                Community healthcare program reaches new villages
              </h3>
              <p>
                Mobile health camps are helping communities access
                essential healthcare services.
              </p>
              <button>Read More →</button>
            </article>

          </div>
        )}

        {/* Electronic Media */}
        {activeTab === "electronic" && (
          <div className="press-list">

            <article className="press-card">
              <span>MEDIA COVERAGE</span>

              <h3>
                Our community impact featured in local media
              </h3>

              <p>
                Read about our initiatives and the impact created
                across communities.
              </p>

              <a href="#" target="_blank" rel="noreferrer">
                View Coverage →
              </a>
            </article>

            <article className="press-card">
              <span>MEDIA COVERAGE</span>

              <h3>
                Women empowerment initiative receives recognition
              </h3>

              <p>
                Our livelihood program has helped women develop
                skills and create sustainable income opportunities.
              </p>

              <a href="#" target="_blank" rel="noreferrer">
                Read Article →
              </a>
            </article>

          </div>
        )}

      </section>

    </div>
  );
}

export default Media;
