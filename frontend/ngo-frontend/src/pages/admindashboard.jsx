import React, { useEffect, useState } from "react";

const API = "http://localhost:5000";


// ======================================================
// MAIN ADMIN DASHBOARD
// ======================================================

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Admin protection
  if (!user) {
    return (
      <div
        style={{
          padding: "100px 20px",
          textAlign: "center",
        }}
      >
        <h2>Please login first.</h2>
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div
        style={{
          padding: "100px 20px",
          textAlign: "center",
        }}
      >
        <h2>Access Denied</h2>
        <p>You do not have permission to access the admin dashboard.</p>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");

    window.location.href = "/login";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f4f6",
        display: "flex",
      }}
    >

      {/* ==================================================
          SIDEBAR
      ================================================== */}

      <aside
        style={{
          width: "270px",
          background: "#1f2937",
          color: "#fff",
          minHeight: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          display: "flex",
          flexDirection: "column",
          zIndex: 1000,
        }}
      >

        {/* Logo */}

        <div
          style={{
            padding: "25px 22px",
            borderBottom: "1px solid #374151",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "21px",
            }}
          >
            NGO.
          </h2>

          <p
            style={{
              margin: "6px 0 0",
              color: "#cbd5e1",
              fontSize: "13px",
            }}
          >
            Management Dashboard
          </p>
        </div>


        {/* Navigation */}

        <div
          style={{
            padding: "25px 15px",
            flex: 1,
          }}
        >

          <SidebarButton
            icon="📊"
            text="Dashboard"
            active={activeSection === "dashboard"}
            onClick={() => setActiveSection("dashboard")}
          />

          <SidebarButton
            icon="📖"
            text="Our Story"
            active={activeSection === "story"}
            onClick={() => setActiveSection("story")}
          />

          <SidebarButton
            icon="⭐"
            text="Core Values"
            active={activeSection === "values"}
            onClick={() => setActiveSection("values")}
          />

          <SidebarButton
            icon="📋"
            text="Programs"
            active={activeSection === "programs"}
            onClick={() => setActiveSection("programs")}
          />

          <SidebarButton
            icon="👥"
            text="Team Members"
            active={activeSection === "team"}
            onClick={() => setActiveSection("team")}
          />

        </div>


        {/* Logout */}

        <div
          style={{
            padding: "15px",
          }}
        >
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              padding: "15px",
              border: "none",
              borderRadius: "10px",
              background: "#ef2929",
              color: "#fff",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            🚪 Logout
          </button>
        </div>

      </aside>


      {/* ==================================================
          MAIN CONTENT
      ================================================== */}

      <main
        style={{
          marginLeft: "270px",
          width: "calc(100% - 270px)",
          minHeight: "100vh",
        }}
      >

        {/* Top Header */}

        <header
          style={{
            background: "#fff",
            padding: "22px 40px",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >

          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "28px",
                color: "#111827",
              }}
            >
              {activeSection === "dashboard" && "Dashboard"}
              {activeSection === "story" && "Our Story"}
              {activeSection === "values" && "Core Values"}
              {activeSection === "programs" && "Programs"}
              {activeSection === "team" && "Team Members"}
            </h1>

            <p
              style={{
                margin: "6px 0 0",
                color: "#6b7280",
              }}
            >
              Welcome back, {user.name}!
            </p>
          </div>


          <div
            style={{
              background: "#111827",
              color: "#fff",
              padding: "10px 18px",
              borderRadius: "25px",
              fontWeight: "700",
              fontSize: "13px",
            }}
          >
            ADMIN
          </div>

        </header>


        {/* Content */}

        <div
          style={{
            padding: "40px",
          }}
        >

          {activeSection === "dashboard" && (
            <DashboardHome
              setActiveSection={setActiveSection}
              user={user}
            />
          )}

          {activeSection === "story" && (
            <StorySection />
          )}

          {activeSection === "values" && (
            <ValuesSection />
          )}

          {activeSection === "programs" && (
            <ProgramsSection />
          )}

          {activeSection === "team" && (
            <TeamSection />
          )}

        </div>

      </main>

    </div>
  );
}


// ======================================================
// SIDEBAR BUTTON
// ======================================================

function SidebarButton({
  icon,
  text,
  active,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        border: "none",
        padding: "15px 18px",
        marginBottom: "8px",
        borderRadius: "9px",
        background: active
          ? "#374151"
          : "transparent",
        color: "#fff",
        textAlign: "left",
        fontSize: "15px",
        cursor: "pointer",
      }}
    >
      <span
        style={{
          marginRight: "10px",
        }}
      >
        {icon}
      </span>

      {text}
    </button>
  );
}


// ======================================================
// DASHBOARD HOME
// ======================================================

function DashboardHome({
  setActiveSection,
  user,
}) {
  return (
    <div>

      {/* Welcome Card */}

      <div
        style={{
          background: "#fff",
          borderRadius: "15px",
          padding: "35px",
          marginBottom: "35px",
          boxShadow:
            "0 5px 20px rgba(0,0,0,0.06)",
        }}
      >

        <h2
          style={{
            marginTop: 0,
            fontSize: "28px",
          }}
        >
          Welcome to NGO Admin Dashboard 👋
        </h2>

        <p
          style={{
            color: "#666",
            fontSize: "16px",
          }}
        >
          Manage your NGO website content from one place.
        </p>

        <p
          style={{
            color: "#555",
          }}
        >
          Logged in as: <strong>{user.email}</strong>
        </p>

      </div>


      {/* Management Cards */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "30px",
        }}
      >

        <ManagementCard
          icon="📖"
          title="Our Story"
          description="Manage the story and introduction of your NGO."
          onClick={() => setActiveSection("story")}
        />

        <ManagementCard
          icon="⭐"
          title="Core Values"
          description="Add, edit and remove your organization's values."
          onClick={() => setActiveSection("values")}
        />

        <ManagementCard
          icon="📋"
          title="Programs"
          description="Manage the programs and initiatives of your NGO."
          onClick={() => setActiveSection("programs")}
        />

        <ManagementCard
          icon="👥"
          title="Team Members"
          description="Manage your NGO leadership and team members."
          onClick={() => setActiveSection("team")}
        />

      </div>

    </div>
  );
}


// ======================================================
// MANAGEMENT CARD
// ======================================================

function ManagementCard({
  icon,
  title,
  description,
  onClick,
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "15px",
        padding: "32px",
        boxShadow:
          "0 5px 20px rgba(0,0,0,0.06)",
      }}
    >

      <div
        style={{
          fontSize: "38px",
          marginBottom: "20px",
        }}
      >
        {icon}
      </div>

      <h3
        style={{
          fontSize: "22px",
          marginBottom: "10px",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          color: "#666",
          lineHeight: "1.6",
          marginBottom: "20px",
        }}
      >
        {description}
      </p>

      <button
        onClick={onClick}
        style={primaryButton}
      >
        Manage
      </button>

    </div>
  );
}


// ======================================================
// OUR STORY
// ======================================================

function StorySection() {

  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");


  useEffect(() => {

    fetch(`${API}/api/about/story`)
      .then((res) => res.json())
      .then((data) => {

        if (Array.isArray(data) && data.length > 0) {
          setStory(data[0].content || "");
        }

        setLoading(false);

      })
      .catch((error) => {

        console.error(
          "Error fetching story:",
          error
        );

        setMessage(
          "Unable to load story."
        );

        setLoading(false);
      });

  }, []);


  const handleSave = async () => {

    if (!story.trim()) {
      setMessage(
        "Please enter the story."
      );
      return;
    }

    setSaving(true);
    setMessage("");

    try {

      const response = await fetch(
        `${API}/api/about/story/1`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: story,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {

        setMessage(
          "Our Story updated successfully! ✅"
        );

      } else {

        setMessage(
          data.message ||
          "Failed to update story."
        );

      }

    } catch (error) {

      console.error(
        "Error updating story:",
        error
      );

      setMessage(
        "Server error. Please try again."
      );

    }

    setSaving(false);
  };


  if (loading) {
    return <Loading />;
  }


  return (
    <SectionWrapper>

      <h2>Our Story</h2>

      <p style={descriptionStyle}>
        Edit the story displayed on the About Us page.
      </p>

      <label style={labelStyle}>
        Story Content
      </label>

      <textarea
        value={story}
        onChange={(e) =>
          setStory(e.target.value)
        }
        rows="12"
        placeholder="Enter your NGO story..."
        style={textareaStyle}
      />

      <button
        onClick={handleSave}
        disabled={saving}
        style={{
          ...primaryButton,
          marginTop: "20px",
          opacity: saving ? 0.7 : 1,
        }}
      >
        {saving
          ? "Saving..."
          : "Save Changes"}
      </button>

      {message && (
        <Message text={message} />
      )}

    </SectionWrapper>
  );
}


// ======================================================
// CORE VALUES
// ======================================================

function ValuesSection() {

  const [values, setValues] = useState([]);
  const [newValue, setNewValue] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState("");
  const [loading, setLoading] = useState(true);


  const fetchValues = () => {

    fetch(`${API}/api/about/core-values`)
      .then((res) => res.json())
      .then((data) => {

        setValues(
          Array.isArray(data)
            ? data
            : []
        );

        setLoading(false);

      })
      .catch((error) => {

        console.error(
          "Error fetching values:",
          error
        );

        setLoading(false);
      });

  };


  useEffect(() => {
    fetchValues();
  }, []);


  const addValue = async () => {

    if (!newValue.trim()) {
      return;
    }

    try {

      const response = await fetch(
        `${API}/api/about/core-values`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            value: newValue,
          }),
        }
      );

      if (response.ok) {

        setNewValue("");
        fetchValues();

      }

    } catch (error) {

      console.error(
        "Error adding value:",
        error
      );

    }

  };


  const updateValue = async (id) => {

    if (!editingValue.trim()) {
      return;
    }

    try {

      const response = await fetch(
        `${API}/api/about/core-values/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            value: editingValue,
          }),
        }
      );

      if (response.ok) {

        setEditingId(null);
        setEditingValue("");
        fetchValues();

      }

    } catch (error) {

      console.error(
        "Error updating value:",
        error
      );

    }

  };


  const deleteValue = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this value?"
      );

    if (!confirmDelete) {
      return;
    }

    try {

      const response = await fetch(
        `${API}/api/about/core-values/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        fetchValues();
      }

    } catch (error) {

      console.error(
        "Error deleting value:",
        error
      );

    }

  };


  if (loading) {
    return <Loading />;
  }


  return (
    <SectionWrapper>

      <h2>Core Values</h2>

      <p style={descriptionStyle}>
        Add, edit or delete your organization's core values.
      </p>


      {/* Add */}

      <div style={formRow}>

        <input
          type="text"
          value={newValue}
          onChange={(e) =>
            setNewValue(e.target.value)
          }
          placeholder="Enter a new core value"
          style={inputStyle}
        />

        <button
          onClick={addValue}
          style={primaryButton}
        >
          + Add Value
        </button>

      </div>


      {/* Existing Values */}

      <div style={{ marginTop: "30px" }}>

        {values.length === 0 ? (
          <p>No core values found.</p>
        ) : (

          values.map((item) => (

            <div
              key={item.id}
              style={listItem}
            >

              {editingId === item.id ? (

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    width: "100%",
                  }}
                >

                  <input
                    value={editingValue}
                    onChange={(e) =>
                      setEditingValue(
                        e.target.value
                      )
                    }
                    style={inputStyle}
                  />

                  <button
                    onClick={() =>
                      updateValue(item.id)
                    }
                    style={smallGreenButton}
                  >
                    Save
                  </button>

                  <button
                    onClick={() => {
                      setEditingId(null);
                      setEditingValue("");
                    }}
                    style={smallGrayButton}
                  >
                    Cancel
                  </button>

                </div>

              ) : (

                <>
                  <span
                    style={{
                      fontWeight: "600",
                      flex: 1,
                    }}
                  >
                    {item.value}
                  </span>

                  <button
                    onClick={() => {
                      setEditingId(item.id);
                      setEditingValue(
                        item.value
                      );
                    }}
                    style={smallBlueButton}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteValue(item.id)
                    }
                    style={smallRedButton}
                  >
                    Delete
                  </button>
                </>

              )}

            </div>

          ))

        )}

      </div>

    </SectionWrapper>
  );
}


// ======================================================
// PROGRAMS
// ======================================================

function ProgramsSection() {

  const [programs, setPrograms] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");

  const [editingId, setEditingId] =
    useState(null);

  const [editingName, setEditingName] =
    useState("");

  const [editingDescription, setEditingDescription] =
    useState("");

  const [loading, setLoading] =
    useState(true);


  const fetchPrograms = () => {

    fetch(`${API}/api/about/programs`)
      .then((res) => res.json())
      .then((data) => {

        setPrograms(
          Array.isArray(data)
            ? data
            : []
        );

        setLoading(false);

      })
      .catch((error) => {

        console.error(
          "Error fetching programs:",
          error
        );

        setLoading(false);
      });

  };


  useEffect(() => {
    fetchPrograms();
  }, []);


  const addProgram = async () => {

    if (!name.trim() ||
        !description.trim()) {
      return;
    }

    try {

      const response = await fetch(
        `${API}/api/about/programs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            description,
          }),
        }
      );

      if (response.ok) {

        setName("");
        setDescription("");

        fetchPrograms();

      }

    } catch (error) {

      console.error(
        "Error adding program:",
        error
      );

    }

  };


  const updateProgram = async (id) => {

    if (!editingName.trim() ||
        !editingDescription.trim()) {
      return;
    }

    try {

      const response = await fetch(
        `${API}/api/about/programs/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: editingName,
            description:
              editingDescription,
          }),
        }
      );

      if (response.ok) {

        setEditingId(null);

        setEditingName("");
        setEditingDescription("");

        fetchPrograms();

      }

    } catch (error) {

      console.error(
        "Error updating program:",
        error
      );

    }

  };


  const deleteProgram = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this program?"
      );

    if (!confirmDelete) {
      return;
    }

    try {

      const response = await fetch(
        `${API}/api/about/programs/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        fetchPrograms();
      }

    } catch (error) {

      console.error(
        "Error deleting program:",
        error
      );

    }

  };


  if (loading) {
    return <Loading />;
  }


  return (
    <SectionWrapper>

      <h2>Programs</h2>

      <p style={descriptionStyle}>
        Add, edit and delete NGO programs.
      </p>


      {/* Add Program */}

      <div
        style={{
          background: "#f9fafb",
          padding: "25px",
          borderRadius: "12px",
          marginBottom: "30px",
        }}
      >

        <input
          type="text"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          placeholder="Program name"
          style={inputStyle}
        />

        <textarea
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          placeholder="Program description"
          rows="4"
          style={{
            ...textareaStyle,
            marginTop: "12px",
          }}
        />

        <button
          onClick={addProgram}
          style={{
            ...primaryButton,
            marginTop: "15px",
          }}
        >
          + Add Program
        </button>

      </div>


      {/* Programs */}

      {programs.length === 0 ? (

        <p>No programs found.</p>

      ) : (

        programs.map((program) => (

          <div
            key={program.id}
            style={{
              ...listItem,
              display: "block",
            }}
          >

            {editingId === program.id ? (

              <>

                <input
                  value={editingName}
                  onChange={(e) =>
                    setEditingName(
                      e.target.value
                    )
                  }
                  style={inputStyle}
                />

                <textarea
                  value={editingDescription}
                  onChange={(e) =>
                    setEditingDescription(
                      e.target.value
                    )
                  }
                  rows="4"
                  style={{
                    ...textareaStyle,
                    marginTop: "12px",
                  }}
                />

                <div
                  style={{
                    marginTop: "12px",
                    display: "flex",
                    gap: "10px",
                  }}
                >

                  <button
                    onClick={() =>
                      updateProgram(
                        program.id
                      )
                    }
                    style={smallGreenButton}
                  >
                    Save
                  </button>

                  <button
                    onClick={() => {
                      setEditingId(null);
                      setEditingName("");
                      setEditingDescription("");
                    }}
                    style={smallGrayButton}
                  >
                    Cancel
                  </button>

                </div>

              </>

            ) : (

              <>

                <h3
                  style={{
                    marginTop: 0,
                  }}
                >
                  {program.name}
                </h3>

                <p
                  style={{
                    color: "#666",
                    lineHeight: "1.6",
                  }}
                >
                  {program.description}
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                  }}
                >

                  <button
                    onClick={() => {
                      setEditingId(
                        program.id
                      );

                      setEditingName(
                        program.name
                      );

                      setEditingDescription(
                        program.description
                      );
                    }}
                    style={smallBlueButton}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteProgram(
                        program.id
                      )
                    }
                    style={smallRedButton}
                  >
                    Delete
                  </button>

                </div>

              </>

            )}

          </div>

        ))

      )}

    </SectionWrapper>
  );
}


// ======================================================
// TEAM MEMBERS
// ======================================================

function TeamSection() {

  const [members, setMembers] =
    useState([]);

  const [name, setName] =
    useState("");

  const [role, setRole] =
    useState("");

  const [imageUrl, setImageUrl] =
    useState("");

  const [editingId, setEditingId] =
    useState(null);

  const [editingName, setEditingName] =
    useState("");

  const [editingRole, setEditingRole] =
    useState("");

  const [editingImageUrl, setEditingImageUrl] =
    useState("");

  const [loading, setLoading] =
    useState(true);


  const fetchMembers = () => {

    fetch(
      `${API}/api/about/team-members`
    )
      .then((res) => res.json())
      .then((data) => {

        setMembers(
          Array.isArray(data)
            ? data
            : []
        );

        setLoading(false);

      })
      .catch((error) => {

        console.error(
          "Error fetching team members:",
          error
        );

        setLoading(false);
      });

  };


  useEffect(() => {
    fetchMembers();
  }, []);


  const addMember = async () => {

    if (
      !name.trim() ||
      !role.trim()
    ) {
      return;
    }

    try {

      const response = await fetch(
        `${API}/api/about/team-members`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            role,
            image_url:
              imageUrl || null,
          }),
        }
      );

      if (response.ok) {

        setName("");
        setRole("");
        setImageUrl("");

        fetchMembers();

      }

    } catch (error) {

      console.error(
        "Error adding team member:",
        error
      );

    }

  };


  const updateMember = async (id) => {

    if (
      !editingName.trim() ||
      !editingRole.trim()
    ) {
      return;
    }

    try {

      const response = await fetch(
        `${API}/api/about/team-members/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: editingName,
            role: editingRole,
            image_url:
              editingImageUrl || null,
          }),
        }
      );

      if (response.ok) {

        setEditingId(null);

        setEditingName("");
        setEditingRole("");
        setEditingImageUrl("");

        fetchMembers();

      }

    } catch (error) {

      console.error(
        "Error updating team member:",
        error
      );

    }

  };


  const deleteMember = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this team member?"
      );

    if (!confirmDelete) {
      return;
    }

    try {

      const response = await fetch(
        `${API}/api/about/team-members/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        fetchMembers();
      }

    } catch (error) {

      console.error(
        "Error deleting team member:",
        error
      );

    }

  };


  if (loading) {
    return <Loading />;
  }


  return (
    <SectionWrapper>

      <h2>Team Members</h2>

      <p style={descriptionStyle}>
        Manage your NGO leadership and team members.
      </p>


      {/* Add Member */}

      <div
        style={{
          background: "#f9fafb",
          padding: "25px",
          borderRadius: "12px",
          marginBottom: "30px",
        }}
      >

        <input
          type="text"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          placeholder="Member name"
          style={inputStyle}
        />

        <input
          type="text"
          value={role}
          onChange={(e) =>
            setRole(e.target.value)
          }
          placeholder="Member role"
          style={{
            ...inputStyle,
            marginTop: "12px",
          }}
        />

        <input
          type="text"
          value={imageUrl}
          onChange={(e) =>
            setImageUrl(e.target.value)
          }
          placeholder="Image URL (optional)"
          style={{
            ...inputStyle,
            marginTop: "12px",
          }}
        />

        <button
          onClick={addMember}
          style={{
            ...primaryButton,
            marginTop: "15px",
          }}
        >
          + Add Team Member
        </button>

      </div>


      {/* Members */}

      {members.length === 0 ? (

        <p>No team members found.</p>

      ) : (

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "25px",
          }}
        >

          {members.map((member) => (

            <div
              key={member.id}
              style={{
                background: "#fff",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow:
                  "0 4px 15px rgba(0,0,0,0.07)",
              }}
            >

              {editingId === member.id ? (

                <div
                  style={{
                    padding: "25px",
                  }}
                >

                  <input
                    value={editingName}
                    onChange={(e) =>
                      setEditingName(
                        e.target.value
                      )
                    }
                    style={inputStyle}
                  />

                  <input
                    value={editingRole}
                    onChange={(e) =>
                      setEditingRole(
                        e.target.value
                      )
                    }
                    style={{
                      ...inputStyle,
                      marginTop: "12px",
                    }}
                  />

                  <input
                    value={editingImageUrl}
                    onChange={(e) =>
                      setEditingImageUrl(
                        e.target.value
                      )
                    }
                    style={{
                      ...inputStyle,
                      marginTop: "12px",
                    }}
                    placeholder="Image URL"
                  />

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginTop: "15px",
                    }}
                  >

                    <button
                      onClick={() =>
                        updateMember(
                          member.id
                        )
                      }
                      style={smallGreenButton}
                    >
                      Save
                    </button>

                    <button
                      onClick={() => {
                        setEditingId(null);
                        setEditingName("");
                        setEditingRole("");
                        setEditingImageUrl("");
                      }}
                      style={smallGrayButton}
                    >
                      Cancel
                    </button>

                  </div>

                </div>

              ) : (

                <>

                  {member.image_url && (
                    <img
                      src={member.image_url}
                      alt={member.name}
                      style={{
                        width: "100%",
                        height: "220px",
                        objectFit: "cover",
                      }}
                    />
                  )}

                  <div
                    style={{
                      padding: "22px",
                    }}
                  >

                    <h3
                      style={{
                        marginTop: 0,
                        marginBottom: "7px",
                      }}
                    >
                      {member.name}
                    </h3>

                    <p
                      style={{
                        color: "#666",
                        marginTop: 0,
                      }}
                    >
                      {member.role}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        marginTop: "15px",
                      }}
                    >

                      <button
                        onClick={() => {

                          setEditingId(
                            member.id
                          );

                          setEditingName(
                            member.name
                          );

                          setEditingRole(
                            member.role
                          );

                          setEditingImageUrl(
                            member.image_url || ""
                          );

                        }}
                        style={smallBlueButton}
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteMember(
                            member.id
                          )
                        }
                        style={smallRedButton}
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </>

              )}

            </div>

          ))}

        </div>

      )}

    </SectionWrapper>
  );
}


// ======================================================
// COMMON COMPONENTS
// ======================================================

function SectionWrapper({ children }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "15px",
        padding: "35px",
        boxShadow:
          "0 5px 20px rgba(0,0,0,0.06)",
      }}
    >
      {children}
    </div>
  );
}


function Loading() {
  return (
    <div
      style={{
        background: "#fff",
        padding: "40px",
        borderRadius: "15px",
        textAlign: "center",
      }}
    >
      <p>Loading...</p>
    </div>
  );
}


function Message({ text }) {
  return (
    <p
      style={{
        marginTop: "15px",
        padding: "12px",
        background: "#ecfdf5",
        color: "#047857",
        borderRadius: "7px",
        fontWeight: "600",
      }}
    >
      {text}
    </p>
  );
}


// ======================================================
// STYLES
// ======================================================

const primaryButton = {
  background: "#111827",
  color: "#fff",
  border: "none",
  borderRadius: "7px",
  padding: "12px 22px",
  fontSize: "14px",
  fontWeight: "600",
  cursor: "pointer",
};


const inputStyle = {
  width: "100%",
  padding: "13px 15px",
  border: "1px solid #d1d5db",
  borderRadius: "7px",
  fontSize: "15px",
  boxSizing: "border-box",
};


const textareaStyle = {
  width: "100%",
  padding: "15px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  fontSize: "15px",
  lineHeight: "1.6",
  resize: "vertical",
  boxSizing: "border-box",
};


const labelStyle = {
  display: "block",
  fontWeight: "600",
  marginBottom: "10px",
};


const descriptionStyle = {
  color: "#6b7280",
  marginBottom: "25px",
};


const formRow = {
  display: "flex",
  gap: "12px",
  alignItems: "center",
};


const listItem = {
  background: "#f9fafb",
  border: "1px solid #e5e7eb",
  borderRadius: "10px",
  padding: "18px",
  marginBottom: "12px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
};


const smallBlueButton = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  padding: "8px 14px",
  cursor: "pointer",
  fontWeight: "600",
};


const smallRedButton = {
  background: "#dc2626",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  padding: "8px 14px",
  cursor: "pointer",
  fontWeight: "600",
};


const smallGreenButton = {
  background: "#059669",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  padding: "8px 14px",
  cursor: "pointer",
  fontWeight: "600",
};


const smallGrayButton = {
  background: "#6b7280",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  padding: "8px 14px",
  cursor: "pointer",
  fontWeight: "600",
};


export default AdminDashboard;
