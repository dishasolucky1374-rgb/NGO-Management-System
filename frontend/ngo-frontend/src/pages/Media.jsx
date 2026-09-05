import { useEffect, useState } from "react";
import "./media.css";

function Media() {
 const API = "https://ngo-management-backend.onrender.com";

  // ================= MEDIA DATA =================

  const [pressReleases, setPressReleases] = useState([]);
  const [mediaCoverage, setMediaCoverage] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [videos, setVideos] = useState([]);

  // ================= FALLBACK GALLERY =================
  // These will be displayed only when no images are
  // available from the backend.

  const fallbackGallery = [
    {
      id: "fallback-1",
      image_path:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1000&q=80",
      description: "Education Support Program",
    },
    {
      id: "fallback-2",
      image_path:
        "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=1000&q=80",
      description: "Tree Plantation Drive",
    },
    {
      id: "fallback-3",
      image_path:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80",
      description: "Health & Wellness Camp",
    },
    {
      id: "fallback-4",
      image_path:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80",
      description: "Women Empowerment Workshop",
    },
    {
      id: "fallback-5",
      image_path:
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1000&q=80",
      description: "Food Distribution Program",
    },
    {
      id: "fallback-6",
      image_path:
        "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1000&q=80",
      description: "Clean Community Initiative",
    },
  ];

  // ================= FALLBACK VIDEOS =================
  // These are displayed only if no videos exist in backend.

  const fallbackVideos = [
    {
      id: "fallback-video-1",
      video_url: "https://www.youtube.com/watch?v=8jbecqCS3vM",
      description: "Community & Social Impact",
    },
    {
      id: "fallback-video-2",
      video_url: "https://www.youtube.com/watch?v=iF5HYHEkQbQ",
      description: "Community Development & Sustainability",
    },
  ];

  // ================= FETCH MEDIA DATA =================

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const [
          pressRes,
          coverageRes,
          galleryRes,
          videosRes,
        ] = await Promise.all([
          fetch(`${API}/api/media/press-releases`),
          fetch(`${API}/api/media/coverage`),
          fetch(`${API}/api/media/gallery`),
          fetch(`${API}/api/media/videos`),
        ]);

        if (pressRes.ok) {
          const data = await pressRes.json();
          setPressReleases(Array.isArray(data) ? data : []);
        }

        if (coverageRes.ok) {
          const data = await coverageRes.json();
          setMediaCoverage(Array.isArray(data) ? data : []);
        }

        if (galleryRes.ok) {
          const data = await galleryRes.json();
          setGalleryItems(Array.isArray(data) ? data : []);
        }

        if (videosRes.ok) {
          const data = await videosRes.json();
          setVideos(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Error fetching media:", error);
      }
    };

    fetchMedia();
  }, []);

  // Use backend gallery if available,
  // otherwise show the six fallback images.
  const displayedGallery =
    galleryItems.length > 0 ? galleryItems : fallbackGallery;

  // Use backend videos if available,
  // otherwise show fallback videos.
  const displayedVideos =
    videos.length > 0 ? videos : fallbackVideos;

  // ================= VIDEO EMBED HELPER =================

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return "";

    try {
      const parsedUrl = new URL(url);

      // youtube.com/watch?v=VIDEO_ID
      if (parsedUrl.hostname.includes("youtube.com")) {
        const videoId = parsedUrl.searchParams.get("v");

        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}`;
        }
      }

      // youtu.be/VIDEO_ID
      if (parsedUrl.hostname.includes("youtu.be")) {
        const videoId = parsedUrl.pathname.replace("/", "");

        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}`;
        }
      }

      // Already an embed URL
      if (url.includes("/embed/")) {
        return url;
      }

      return url;
    } catch {
      return url;
    }
  };

  return (
    <main>

      {/* =====================================================
          HERO SECTION
      ===================================================== */}

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


      {/* =====================================================
          INTRODUCTION
      ===================================================== */}

      <section className="projects-intro media-intro">

        <p className="section-label">
          OUR JOURNEY
        </p>

        <h2>
          Moments that inspire change.
        </h2>

        <p>
          Take a look at some of our community activities, awareness
          initiatives, workshops and programs that bring people together
          and create lasting impact.
        </p>

      </section>


      {/* =====================================================
          PRESS RELEASES
      ===================================================== */}

      <section className="media-content-section">

        <div className="media-section-heading">

          <p className="section-label">
            PRESS RELEASES
          </p>

          <h2>
            Latest updates from our organization.
          </h2>

          <p>
            Stay informed about our latest initiatives, programs,
            events and important announcements.
          </p>

        </div>


        <div className="media-list">

          {pressReleases.length > 0 ? (

            pressReleases.map((item) => (

              <article
                className="media-news-card"
                key={item.id}
              >

                <div className="media-date">

                  {item.release_date
                    ? new Date(
                        item.release_date
                      ).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        }
                      )
                    : ""}

                </div>


                <h3>
                  {item.title}
                </h3>


                <p>
                  {item.description}
                </p>


                <button
                  className="media-read-btn"
                  type="button"
                >
                  Read More
                </button>

              </article>

            ))

          ) : (

            <div className="media-empty-box">

              <p className="media-empty">
                No press releases available at the moment.
              </p>

            </div>

          )}

        </div>

      </section>


      {/* =====================================================
          MEDIA COVERAGE
      ===================================================== */}

      <section
        className="media-content-section media-coverage-section"
      >

        <div className="media-section-heading">

          <p className="section-label">
            MEDIA COVERAGE
          </p>

          <h2>
            Our work in the community.
          </h2>

          <p>
            Explore stories and coverage highlighting our
            initiatives, volunteers and community impact.
          </p>

        </div>


        <div className="media-list">

          {mediaCoverage.length > 0 ? (

            mediaCoverage.map((item) => (

              <article
                className="media-news-card"
                key={item.id}
              >

                <div className="media-news-icon">
                  📰
                </div>


                <h3>
                  {item.title}
                </h3>


                <p>
                  Discover more about our work and community
                  initiatives through this media coverage.
                </p>


                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="media-read-btn"
                >
                  View Coverage
                </a>

              </article>

            ))

          ) : (

            <div className="media-empty-box">

              <p className="media-empty">
                No media coverage available at the moment.
              </p>

            </div>

          )}

        </div>

      </section>


      {/* =====================================================
          IMAGE GALLERY
      ===================================================== */}

      <section className="media-gallery">

        <div className="media-section-heading">

          <p className="section-label">
            IMAGE GALLERY
          </p>

          <h2>
            Moments from our work.
          </h2>

          <p>
            A glimpse into the activities, people and communities
            that make our journey meaningful.
          </p>

        </div>


        <div className="media-gallery-grid">

          {displayedGallery.map((item) => (

            <article
              className="project-card media-card"
              key={item.id}
            >

              <div className="project-image media-image">

                <img
                  src={item.image_path}
                  alt={
                    item.description ||
                    "Community activity"
                  }
                  loading="lazy"
                />

                <div className="project-category">
                  MEDIA
                </div>

              </div>


              <div className="project-content">

                <h2>
                  {item.description ||
                    "Community Activity"}
                </h2>

                <p>
                  Capturing the efforts of our volunteers,
                  communities and beneficiaries as we work
                  towards building a better future.
                </p>

                <button
                  className="project-btn"
                  type="button"
                  onClick={() =>
                    window.open(
                      item.image_path,
                      "_blank"
                    )
                  }
                >
                  View Photo
                </button>

              </div>

            </article>

          ))}

        </div>

      </section>


      {/* =====================================================
          VIDEOS
      ===================================================== */}

      <section className="media-content-section media-video-section">

        <div className="media-section-heading">

          <p className="section-label">
            VIDEOS
          </p>

          <h2>
            See our impact in action.
          </h2>

          <p>
            Watch videos showcasing activities, campaigns
            and community initiatives.
          </p>

        </div>


        <div className="media-video-grid">

          {displayedVideos.map((video) => (

            <article
              className="media-video-card"
              key={video.id}
            >

              {/* VIDEO */}

              <div className="video-placeholder">

                <iframe
                  src={getYouTubeEmbedUrl(
                    video.video_url
                  )}
                  title={
                    video.description ||
                    "NGO Community Video"
                  }
                  width="100%"
                  height="260"
                  style={{
                    border: "none",
                    borderRadius: "10px",
                  }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />

              </div>


              <div className="video-content">

                <h3>
                  {video.description ||
                    "Our Community Activities"}
                </h3>

                <p>
                  Watch videos showcasing our activities,
                  campaigns and community initiatives.
                </p>


                <a
                  href={video.video_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="media-video-btn"
                >
                  Watch on YouTube
                </a>

              </div>

            </article>

          ))}

        </div>

      </section>


      {/* =====================================================
          MEDIA HIGHLIGHTS
      ===================================================== */}

      <section className="project-impact">

        <div className="section-heading">

          <p>
            MEDIA HIGHLIGHTS
          </p>

          <h2>
            Our work is powered by people and community.
          </h2>

        </div>


        <div className="project-stats">

          <div>
            <strong>
              50+
            </strong>

            <span>
              Activities
            </span>
          </div>


          <div>
            <strong>
              25+
            </strong>

            <span>
              Projects
            </span>
          </div>


          <div>
            <strong>
              100+
            </strong>

            <span>
              Volunteers
            </span>
          </div>


          <div>
            <strong>
              10K+
            </strong>

            <span>
              People Reached
            </span>
          </div>

        </div>

      </section>


      {/* =====================================================
          MEDIA CONTACT
      ===================================================== */}

      <section
        className="media-content-section media-contact-section"
      >

        <div className="media-contact-box">

          <div>

            <p className="section-label">
              MEDIA CONTACT
            </p>

            <h2>
              Want to know more about our work?
            </h2>

            <p>
              For media inquiries, interviews, press information
              or collaboration opportunities, get in touch with
              our team.
            </p>

          </div>


          <a
            href="/contact"
            className="primary-btn"
          >
            Contact Us
          </a>

        </div>

      </section>


      {/* =====================================================
          STORY SECTION
      ===================================================== */}

      <section className="projects-intro media-story">

        <p className="section-label">
          OUR STORIES
        </p>

        <h2>
          Every picture tells a story.
        </h2>

        <p>
          Behind every activity is a community, a volunteer and
          a story of hope. Our media captures these moments and
          helps share the impact of our work with a wider audience.
        </p>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="about-cta">

        <h2>
          Be a part of our journey.
        </h2>

        <p>
          Join us in creating more moments of change and making
          a difference in the lives of communities.
        </p>

        <a
          href="/get-involved"
          className="primary-btn"
        >
          Get Involved
        </a>

      </section>

    </main>
  );
}

export default Media;
