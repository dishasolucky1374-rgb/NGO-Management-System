import React from "react";
import { useParams, useNavigate } from "react-router-dom";

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const projects = [
    {
      title: "Education for Every Child",
      category: "Education",
      location: "Nashik, Maharashtra",
      status: "Ongoing",
      description:
        "Supporting children from underserved communities with educational resources, learning support, and opportunities for a better future.",
      details:
        "This initiative focuses on improving access to quality education for children from underserved communities. We provide educational resources, learning support, mentoring, and opportunities that help students build a stronger academic foundation.",
      impact:
        "The project aims to improve educational access, encourage regular learning, and create better opportunities for children.",
      timeline: "2025 - Present",
      image:
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
    },

    {
      title: "Community Health Initiative",
      category: "Healthcare",
      location: "Maharashtra",
      status: "Ongoing",
      description:
        "Providing community-based healthcare support, awareness programs, and health camps for underserved communities.",
      details:
        "The Community Health Initiative works to improve healthcare awareness and accessibility through health camps, awareness sessions, preventive healthcare activities, and community support.",
      impact:
        "The initiative helps communities understand preventive healthcare and improves access to basic health services.",
      timeline: "2025 - Present",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    },

    {
      title: "Women Skill Development",
      category: "Women Empowerment",
      location: "Nashik, Maharashtra",
      status: "Completed",
      description:
        "Helping women develop practical skills and access livelihood opportunities to become financially independent.",
      details:
        "This project focuses on empowering women through practical skill development, training opportunities, and awareness about livelihood options.",
      impact:
        "The project supports women in developing confidence, practical skills, and opportunities for financial independence.",
      timeline: "2024 - 2025",
      image:
        "https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&w=1200&q=80",
    },

    {
      title: "Digital Learning Program",
      category: "Education",
      location: "Rural Maharashtra",
      status: "Ongoing",
      description:
        "Promoting digital learning and improving access to educational technology for students in rural communities.",
      details:
        "The Digital Learning Program introduces students to digital learning resources and technology-based education to improve their learning experience.",
      impact:
        "The program helps students gain access to digital educational resources and develop essential digital learning skills.",
      timeline: "2025 - Present",
      image:
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    },

    {
      title: "Livelihood Development",
      category: "Livelihood",
      location: "Maharashtra",
      status: "Ongoing",
      description:
        "Supporting marginalized communities through vocational training, skill development, and livelihood generation.",
      details:
        "This initiative focuses on vocational training and skill development to help individuals build sustainable livelihood opportunities.",
      impact:
        "The project aims to improve employability, strengthen practical skills, and support sustainable income generation.",
      timeline: "2025 - Present",
      image:
        "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80",
    },

    {
      title: "Community Awareness Drive",
      category: "Community",
      location: "Maharashtra",
      status: "Completed",
      description:
        "Creating awareness about education, healthcare, women's rights, and community development.",
      details:
        "The Community Awareness Drive focuses on educating communities about important social issues including education, healthcare, women's rights, and community development.",
      impact:
        "The initiative encourages community participation and creates greater awareness of important social development issues.",
      timeline: "2024 - 2025",
      image:
        "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  const project = projects[Number(id) - 1];

  if (!project) {
    return (
      <main
        style={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "40px 20px",
        }}
      >
        <div>
          <h1 style={{ color: "#222" }}>Project Not Found</h1>

          <p style={{ color: "#666", marginBottom: "25px" }}>
            The project you are looking for does not exist.
          </p>

          <button
            onClick={() => navigate("/projects")}
            style={{
              background: "#333",
              color: "#fff",
              border: "none",
              padding: "12px 24px",
              cursor: "pointer",
            }}
          >
            Back to Projects
          </button>
        </div>
      </main>
    );
  }

  return (
    <main style={{ background: "#fff" }}>

      {/* ================= HERO ================= */}
      <section
        style={{
          background: "#333",
          color: "#fff",
          padding: "80px 8%",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "13px",
            letterSpacing: "2px",
            color: "#ddd",
            marginBottom: "15px",
          }}
        >
          {project.category.toUpperCase()}
        </p>

        <h1
          style={{
            fontSize: "46px",
            margin: "0 0 15px",
            fontWeight: "600",
          }}
        >
          {project.title}
        </h1>

        <p
          style={{
            color: "#ddd",
            fontSize: "16px",
            margin: 0,
          }}
        >
          📍 {project.location}
        </p>
      </section>

      {/* ================= PROJECT DETAILS ================= */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "70px 20px",
        }}
      >

        {/* IMAGE */}
        <div
          style={{
            width: "100%",
            height: "420px",
            overflow: "hidden",
            marginBottom: "45px",
          }}
        >
          <img
            src={project.image}
            alt={project.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        {/* STATUS */}
        <div
          style={{
            display: "inline-block",
            padding: "7px 14px",
            background: "#f7f7f7",
            border: "1px solid #eee",
            color: "#333",
            fontSize: "13px",
            marginBottom: "20px",
          }}
        >
          {project.status}
        </div>

        <h2
          style={{
            color: "#222",
            fontSize: "32px",
            marginBottom: "18px",
          }}
        >
          About This Project
        </h2>

        <p
          style={{
            color: "#666",
            fontSize: "16px",
            lineHeight: "1.8",
            marginBottom: "20px",
          }}
        >
          {project.details}
        </p>

        <p
          style={{
            color: "#666",
            fontSize: "16px",
            lineHeight: "1.8",
          }}
        >
          {project.description}
        </p>

        {/* ================= PROJECT INFORMATION ================= */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            marginTop: "45px",
            marginBottom: "55px",
          }}
        >
          <div
            style={{
              background: "#f7f7f7",
              border: "1px solid #eee",
              padding: "25px",
            }}
          >
            <h3 style={{ color: "#222", marginBottom: "10px" }}>
              Category
            </h3>

            <p style={{ color: "#666", margin: 0 }}>
              {project.category}
            </p>
          </div>

          <div
            style={{
              background: "#f7f7f7",
              border: "1px solid #eee",
              padding: "25px",
            }}
          >
            <h3 style={{ color: "#222", marginBottom: "10px" }}>
              Location
            </h3>

            <p style={{ color: "#666", margin: 0 }}>
              {project.location}
            </p>
          </div>

          <div
            style={{
              background: "#f7f7f7",
              border: "1px solid #eee",
              padding: "25px",
            }}
          >
            <h3 style={{ color: "#222", marginBottom: "10px" }}>
              Timeline
            </h3>

            <p style={{ color: "#666", margin: 0 }}>
              {project.timeline}
            </p>
          </div>
        </div>

        {/* ================= IMPACT ================= */}
        <section
          style={{
            background: "#f7f7f7",
            padding: "45px",
            marginBottom: "50px",
          }}
        >
          <p
            style={{
              color: "#666",
              fontSize: "13px",
              letterSpacing: "2px",
              marginBottom: "12px",
            }}
          >
            PROJECT IMPACT
          </p>

          <h2
            style={{
              color: "#222",
              fontSize: "30px",
              marginBottom: "18px",
            }}
          >
            Creating Meaningful Change
          </h2>

          <p
            style={{
              color: "#666",
              lineHeight: "1.8",
              margin: 0,
            }}
          >
            {project.impact}
          </p>
        </section>

        {/* ================= SUPPORT ================= */}
        <section
          style={{
            background: "#333",
            color: "#fff",
            padding: "50px 30px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              marginBottom: "12px",
              fontSize: "30px",
            }}
          >
            Want to support this project?
          </h2>

          <p
            style={{
              color: "#ddd",
              marginBottom: "25px",
            }}
          >
            Your contribution can help us expand our impact.
          </p>

          <button
            onClick={() => navigate("/donate")}
            style={{
              background: "#fff",
              color: "#333",
              border: "none",
              padding: "12px 25px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Support Our Work
          </button>
        </section>

        {/* ================= BACK BUTTON ================= */}
        <div
          style={{
            textAlign: "center",
            marginTop: "35px",
          }}
        >
          <button
            onClick={() => navigate("/projects")}
            style={{
              background: "transparent",
              color: "#333",
              border: "1px solid #333",
              padding: "11px 22px",
              cursor: "pointer",
            }}
          >
            ← Back to Projects
          </button>
        </div>

      </section>
    </main>
  );
}

export default ProjectDetails;
