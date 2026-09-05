import React, { useEffect, useState } from "react";

const API = "http://localhost:5000";

// ======================================================
// MAIN ADMIN DASHBOARD
// ======================================================

function AdminDashboard() {
  const [activeSection, setActiveSection] =
    useState("dashboard");

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Invalid user data:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  // ======================================================
  // ADMIN PROTECTION
  // ======================================================

  if (!user) {
    return (
      <div style={accessPage}>
        <div style={accessCard}>
          <div style={accessIcon}>🔐</div>
          <h2>Please Login First</h2>
          <p>
            You need to login with your admin credentials
            to access the management dashboard.
          </p>

          <button
            onClick={() => {
              window.location.href = "/login";
            }}
            style={primaryButton}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div style={accessPage}>
        <div style={accessCard}>
          <div style={accessIcon}>🚫</div>
          <h2>Access Denied</h2>
          <p>
            You do not have permission to access the
            admin dashboard.
          </p>

          <button
            onClick={() => {
              window.location.href = "/";
            }}
            style={primaryButton}
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  // ======================================================
  // LOGOUT
  // ======================================================

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");

    window.location.href = "/login";
  };

  // ======================================================
  // SECTION TITLES
  // ======================================================

  const sectionTitles = {
    dashboard: "Dashboard",
    story: "Our Story",
    values: "Core Values",
    programs: "Programs",
    team: "Team & Partners",
    projects: "Projects",
    successStories: "Success Stories",
    statistics: "Project Statistics",
    media: "Project Media",
  };

  // ======================================================
  // MAIN UI
  // ======================================================

  return (
    <div style={dashboardLayout}>

      {/* ==================================================
          SIDEBAR
      ================================================== */}

      <aside style={sidebar}>

        {/* LOGO */}

        <div style={sidebarLogo}>

          <h2 style={logoTitle}>
            NGO.
          </h2>

          <p style={logoSubtitle}>
            Management Dashboard
          </p>

        </div>


        {/* NAVIGATION */}

        <div style={sidebarNavigation}>

          <SidebarButton
            icon="📊"
            text="Dashboard"
            active={
              activeSection === "dashboard"
            }
            onClick={() =>
              setActiveSection("dashboard")
            }
          />


          <SidebarButton
            icon="📖"
            text="Our Story"
            active={
              activeSection === "story"
            }
            onClick={() =>
              setActiveSection("story")
            }
          />


          <SidebarButton
            icon="⭐"
            text="Core Values"
            active={
              activeSection === "values"
            }
            onClick={() =>
              setActiveSection("values")
            }
          />


          <SidebarButton
            icon="📋"
            text="Programs"
            active={
              activeSection === "programs"
            }
            onClick={() =>
              setActiveSection("programs")
            }
          />


          <SidebarButton
            icon="👥"
            text="Team & Partners"
            active={
              activeSection === "team"
            }
            onClick={() =>
              setActiveSection("team")
            }
          />


          <div style={sidebarDivider} />

          <p style={sidebarHeading}>
            OUR PROJECTS
          </p>


          <SidebarButton
            icon="📁"
            text="Projects"
            active={
              activeSection === "projects"
            }
            onClick={() =>
              setActiveSection("projects")
            }
          />


          <SidebarButton
            icon="💬"
            text="Success Stories"
            active={
              activeSection === "successStories"
            }
            onClick={() =>
              setActiveSection("successStories")
            }
          />


          <SidebarButton
            icon="📈"
            text="Project Statistics"
            active={
              activeSection === "statistics"
            }
            onClick={() =>
              setActiveSection("statistics")
            }
          />


          <SidebarButton
            icon="🖼️"
            text="Project Media"
            active={
              activeSection === "media"
            }
            onClick={() =>
              setActiveSection("media")
            }
          />

        </div>


        {/* LOGOUT */}

        <div style={logoutContainer}>

          <button
            onClick={handleLogout}
            style={logoutButton}
          >
            🚪 Logout
          </button>

        </div>

      </aside>


      {/* ==================================================
          MAIN CONTENT
      ================================================== */}

      <main style={mainContent}>

        {/* HEADER */}

        <header style={topHeader}>

          <div>

            <h1 style={headerTitle}>
              {sectionTitles[activeSection]}
            </h1>

            <p style={headerSubtitle}>
              Welcome back,{" "}
              <strong>
                {user.name || user.email}
              </strong>
            </p>

          </div>


          <div style={adminBadge}>
            ADMIN
          </div>

        </header>


        {/* CONTENT */}

        <div style={contentArea}>

          {activeSection === "dashboard" && (
            <DashboardHome
              setActiveSection={
                setActiveSection
              }
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


          {activeSection === "projects" && (
            <ProjectsSection />
          )}


          {activeSection === "successStories" && (
            <SuccessStoriesSection />
          )}


          {activeSection === "statistics" && (
            <StatisticsSection />
          )}


          {activeSection === "media" && (
            <ProjectMediaSection />
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
        ...sidebarButton,
        ...(active
          ? sidebarButtonActive
          : {}),
      }}
    >

      <span style={sidebarIcon}>
        {icon}
      </span>

      <span>
        {text}
      </span>

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

      {/* WELCOME */}

      <div style={welcomeCard}>

        <div>

          <p style={welcomeLabel}>
            ADMIN CONTROL PANEL
          </p>

          <h2 style={welcomeTitle}>
            Welcome to NGO Admin Dashboard 👋
          </h2>

          <p style={welcomeDescription}>
            Manage your NGO website content,
            projects, team members, impact,
            stories and media from one place.
          </p>

          <p style={loggedUser}>
            Logged in as:{" "}
            <strong>
              {user.email}
            </strong>
          </p>

        </div>

      </div>


      {/* GENERAL CONTENT */}

      <h2 style={dashboardSectionTitle}>
        Website Content
      </h2>

      <div style={managementGrid}>

        <ManagementCard
          icon="📖"
          title="Our Story"
          description="Manage the story and introduction of your NGO."
          onClick={() =>
            setActiveSection("story")
          }
        />

        <ManagementCard
          icon="⭐"
          title="Core Values"
          description="Add, edit and delete the organization's core values."
          onClick={() =>
            setActiveSection("values")
          }
        />

        <ManagementCard
          icon="📋"
          title="Programs"
          description="Manage NGO programs and initiatives."
          onClick={() =>
            setActiveSection("programs")
          }
        />

        <ManagementCard
          icon="👥"
          title="Team & Partners"
          description="Manage project team members, community partners and supporting organizations."
          onClick={() =>
            setActiveSection("team")
          }
        />

      </div>


      {/* PROJECT MANAGEMENT */}

      <h2
        style={{
          ...dashboardSectionTitle,
          marginTop: "45px",
        }}
      >
        Our Projects Management
      </h2>

      <div style={managementGrid}>

        <ManagementCard
          icon="📁"
          title="Projects"
          description="Create and manage project details, goals, beneficiaries, outcomes, status, dates and locations."
          onClick={() =>
            setActiveSection("projects")
          }
        />

        <ManagementCard
          icon="💬"
          title="Success Stories"
          description="Manage project success stories and beneficiary testimonials."
          onClick={() =>
            setActiveSection("successStories")
          }
        />

        <ManagementCard
          icon="📈"
          title="Project Statistics"
          description="Manage measurable impact such as people reached, sessions and volunteers."
          onClick={() =>
            setActiveSection("statistics")
          }
        />

        <ManagementCard
          icon="🖼️"
          title="Project Media"
          description="Add and remove project images displayed in the project media gallery."
          onClick={() =>
            setActiveSection("media")
          }
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
    <div style={managementCard}>

      <div style={managementIcon}>
        {icon}
      </div>

      <h3 style={managementTitle}>
        {title}
      </h3>

      <p style={managementDescription}>
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

  const [story, setStory] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [message, setMessage] =
    useState("");


  useEffect(() => {

    const fetchStory = async () => {

      try {

        const response = await fetch(
          `${API}/api/about/story`
        );

        const data =
          await response.json();

        if (
          Array.isArray(data) &&
          data.length > 0
        ) {
          setStory(
            data[0].content || ""
          );
        }

      } catch (error) {

        console.error(
          "Error fetching story:",
          error
        );

        setMessage(
          "Unable to load story."
        );

      } finally {

        setLoading(false);

      }

    };

    fetchStory();

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
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            content: story,
          }),
        }
      );

      const data =
        await response.json();

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

      console.error(error);

      setMessage(
        "Server error. Please try again."
      );

    } finally {

      setSaving(false);

    }

  };


  if (loading) {
    return <Loading />;
  }


  return (
    <SectionWrapper>

      <h2>Our Story</h2>

      <p style={descriptionStyle}>
        Edit the story displayed on the
        About Us page.
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

  const [values, setValues] =
    useState([]);

  const [newValue, setNewValue] =
    useState("");

  const [editingId, setEditingId] =
    useState(null);

  const [editingValue, setEditingValue] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [message, setMessage] =
    useState("");


  const fetchValues = async () => {

    try {

      const response = await fetch(
        `${API}/api/about/core-values`
      );

      const data =
        await response.json();

      setValues(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (error) {

      console.error(error);

      setMessage(
        "Unable to load core values."
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {
    fetchValues();
  }, []);


  const addValue = async () => {

    if (!newValue.trim()) {

      setMessage(
        "Please enter a value."
      );

      return;
    }

    try {

      const response = await fetch(
        `${API}/api/about/core-values`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            value: newValue,
          }),
        }
      );

      if (response.ok) {

        setNewValue("");

        setMessage(
          "Core value added successfully! ✅"
        );

        fetchValues();

      } else {

        setMessage(
          "Failed to add core value."
        );

      }

    } catch (error) {

      console.error(error);

      setMessage(
        "Server error."
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
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            value: editingValue,
          }),
        }
      );

      if (response.ok) {

        setEditingId(null);
        setEditingValue("");

        setMessage(
          "Core value updated successfully! ✅"
        );

        fetchValues();

      }

    } catch (error) {

      console.error(error);

    }

  };


  const deleteValue = async (id) => {

    if (
      !window.confirm(
        "Are you sure you want to delete this value?"
      )
    ) {
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

        setMessage(
          "Core value deleted successfully! ✅"
        );

        fetchValues();

      }

    } catch (error) {

      console.error(error);

    }

  };


  if (loading) {
    return <Loading />;
  }


  return (
    <SectionWrapper>

      <h2>Core Values</h2>

      <p style={descriptionStyle}>
        Add, edit or delete your organization's
        core values.
      </p>

      {message && (
        <Message text={message} />
      )}


      <div style={formBox}>

        <label style={labelStyle}>
          Add New Value
        </label>

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

      </div>


      <div style={itemsContainer}>

        {values.length === 0 ? (

          <EmptyState text="No core values found." />

        ) : (

          values.map((item) => (

            <div
              key={item.id}
              style={listItem}
            >

              {editingId === item.id ? (

                <div style={editRow}>

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

                  <span style={listItemText}>
                    {item.value}
                  </span>

                  <button
                    onClick={() => {
                      setEditingId(
                        item.id
                      );
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
                      deleteValue(
                        item.id
                      )
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

  const [programs, setPrograms] =
    useState([]);

  const [name, setName] =
    useState("");

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

  const [message, setMessage] =
    useState("");


  const fetchPrograms = async () => {

    try {

      const response = await fetch(
        `${API}/api/about/programs`
      );

      const data =
        await response.json();

      setPrograms(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (error) {

      console.error(error);

      setMessage(
        "Unable to load programs."
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {
    fetchPrograms();
  }, []);


  const addProgram = async () => {

    if (
      !name.trim() ||
      !description.trim()
    ) {

      setMessage(
        "Please fill all program fields."
      );

      return;
    }

    try {

      const response = await fetch(
        `${API}/api/about/programs`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
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

        setMessage(
          "Program added successfully! ✅"
        );

        fetchPrograms();

      }

    } catch (error) {

      console.error(error);

      setMessage(
        "Server error."
      );

    }

  };


  const updateProgram = async (id) => {

    if (
      !editingName.trim() ||
      !editingDescription.trim()
    ) {
      return;
    }

    try {

      const response = await fetch(
        `${API}/api/about/programs/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
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

        setMessage(
          "Program updated successfully! ✅"
        );

        fetchPrograms();

      }

    } catch (error) {

      console.error(error);

    }

  };


  const deleteProgram = async (id) => {

    if (
      !window.confirm(
        "Are you sure you want to delete this program?"
      )
    ) {
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

        setMessage(
          "Program deleted successfully! ✅"
        );

        fetchPrograms();

      }

    } catch (error) {

      console.error(error);

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

      {message && (
        <Message text={message} />
      )}


      <div style={formBox}>

        <label style={labelStyle}>
          Program Name
        </label>

        <input
          type="text"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          placeholder="Program name"
          style={inputStyle}
        />


        <label
          style={formLabelMargin}
        >
          Program Description
        </label>

        <textarea
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          placeholder="Program description"
          rows="5"
          style={textareaStyle}
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


      <div style={itemsContainer}>

        {programs.length === 0 ? (

          <EmptyState text="No programs found." />

        ) : (

          programs.map((program) => (

            <div
              key={program.id}
              style={largeListItem}
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
                    value={
                      editingDescription
                    }
                    onChange={(e) =>
                      setEditingDescription(
                        e.target.value
                      )
                    }
                    rows="5"
                    style={{
                      ...textareaStyle,
                      marginTop: "12px",
                    }}
                  />

                  <div
                    style={{
                      ...buttonRow,
                      marginTop: "12px",
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

                  <h3 style={itemTitle}>
                    {program.name}
                  </h3>

                  <p style={itemDescription}>
                    {program.description}
                  </p>

                  <div style={buttonRow}>

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

      </div>

    </SectionWrapper>
  );
}


// ======================================================
// TEAM & PARTNERS
// ======================================================

function TeamSection() {

  const [projects, setProjects] =
    useState([]);

  const [selectedProject, setSelectedProject] =
    useState("");

  const [members, setMembers] =
    useState([]);

  const [name, setName] =
    useState("");

  const [role, setRole] =
    useState("");

  const [type, setType] =
    useState("Team Member");

  const [editingId, setEditingId] =
    useState(null);

  const [editingName, setEditingName] =
    useState("");

  const [editingRole, setEditingRole] =
    useState("");

  const [editingType, setEditingType] =
    useState("Team Member");

  const [loadingProjects, setLoadingProjects] =
    useState(true);

  const [loadingMembers, setLoadingMembers] =
    useState(false);

  const [message, setMessage] =
    useState("");


  const fetchProjects = async () => {

    try {

      const response = await fetch(
        `${API}/api/projects`
      );

      const data =
        await response.json();

      setProjects(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (error) {

      console.error(error);

      setMessage(
        "Unable to load projects."
      );

    } finally {

      setLoadingProjects(false);

    }

  };


  const fetchMembers = async (
    projectId
  ) => {

    if (!projectId) {
      setMembers([]);
      return;
    }

    try {

      setLoadingMembers(true);

      const response = await fetch(
        `${API}/api/projects/${projectId}/team`
      );

      const data =
        await response.json();

      setMembers(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (error) {

      console.error(error);

      setMembers([]);

      setMessage(
        "Unable to load team members."
      );

    } finally {

      setLoadingMembers(false);

    }

  };


  useEffect(() => {
    fetchProjects();
  }, []);


  useEffect(() => {
    fetchMembers(selectedProject);
  }, [selectedProject]);


  const addMember = async () => {

    if (!selectedProject) {

      setMessage(
        "Please select a project."
      );

      return;
    }

    if (
      !name.trim() ||
      !role.trim()
    ) {

      setMessage(
        "Please enter name and role."
      );

      return;
    }

    try {

      const response = await fetch(
        `${API}/api/projects/${selectedProject}/team`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name,
            role,
            type,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {

        setMessage(
          data.message ||
            "Failed to add member."
        );

        return;
      }

      setName("");
      setRole("");
      setType("Team Member");

      setMessage(
        "Team member / partner added successfully! ✅"
      );

      fetchMembers(
        selectedProject
      );

    } catch (error) {

      console.error(error);

      setMessage(
        "Server error."
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
        `${API}/api/projects/team/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name: editingName,
            role: editingRole,
            type: editingType,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {

        setMessage(
          data.message ||
            "Failed to update member."
        );

        return;
      }

      setEditingId(null);

      setEditingName("");
      setEditingRole("");
      setEditingType(
        "Team Member"
      );

      setMessage(
        "Updated successfully! ✅"
      );

      fetchMembers(
        selectedProject
      );

    } catch (error) {

      console.error(error);

      setMessage(
        "Server error."
      );

    }

  };


  const deleteMember = async (id) => {

    if (
      !window.confirm(
        "Are you sure you want to delete this member?"
      )
    ) {
      return;
    }

    try {

      const response = await fetch(
        `${API}/api/projects/team/${id}`,
        {
          method: "DELETE",
        }
      );

      const data =
        await response.json();

      if (!response.ok) {

        setMessage(
          data.message ||
            "Failed to delete member."
        );

        return;
      }

      setMessage(
        "Deleted successfully! ✅"
      );

      fetchMembers(
        selectedProject
      );

    } catch (error) {

      console.error(error);

    }

  };


  if (loadingProjects) {
    return <Loading />;
  }


  return (
    <SectionWrapper>

      <h2>Team & Partners</h2>

      <p style={descriptionStyle}>
        Manage team members, community partners
        and supporting organizations for each
        project.
      </p>

      {message && (
        <Message text={message} />
      )}


      <div style={formBox}>

        <label style={labelStyle}>
          Select Project
        </label>

        <select
          value={selectedProject}
          onChange={(e) =>
            setSelectedProject(
              e.target.value
            )
          }
          style={inputStyle}
        >

          <option value="">
            -- Select Project --
          </option>

          {projects.map((project) => (

            <option
              key={project.id}
              value={project.id}
            >
              {project.title}
            </option>

          ))}

        </select>

      </div>


      {selectedProject && (

        <div style={formBox}>

          <h3>
            Add Team Member / Partner
          </h3>

          <label style={labelStyle}>
            Name
          </label>

          <input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="Name"
            style={inputStyle}
          />


          <label
            style={formLabelMargin}
          >
            Role / Support
          </label>

          <input
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
            placeholder="Role or support provided"
            style={inputStyle}
          />


          <label
            style={formLabelMargin}
          >
            Type
          </label>

          <select
            value={type}
            onChange={(e) =>
              setType(e.target.value)
            }
            style={inputStyle}
          >

            <option value="Team Member">
              Team Member
            </option>

            <option value="Community Partner">
              Community Partner
            </option>

            <option value="Supporting Organization">
              Supporting Organization
            </option>

          </select>


          <button
            onClick={addMember}
            style={{
              ...primaryButton,
              marginTop: "18px",
            }}
          >
            + Add Member / Partner
          </button>

        </div>

      )}


      {selectedProject && (

        <div style={itemsContainer}>

          <h3>
            Existing Team & Partners
          </h3>

          {loadingMembers ? (

            <Loading />

          ) : members.length === 0 ? (

            <EmptyState text="No team members or partners found." />

          ) : (

            <div style={cardGrid}>

              {members.map((member) => (

                <div
                  key={member.id}
                  style={teamCard}
                >

                  {editingId === member.id ? (

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

                      <input
                        value={editingRole}
                        onChange={(e) =>
                          setEditingRole(
                            e.target.value
                          )
                        }
                        style={{
                          ...inputStyle,
                          marginTop: "10px",
                        }}
                      />

                      <select
                        value={editingType}
                        onChange={(e) =>
                          setEditingType(
                            e.target.value
                          )
                        }
                        style={{
                          ...inputStyle,
                          marginTop: "10px",
                        }}
                      >

                        <option value="Team Member">
                          Team Member
                        </option>

                        <option value="Community Partner">
                          Community Partner
                        </option>

                        <option value="Supporting Organization">
                          Supporting Organization
                        </option>

                      </select>


                      <div
                        style={{
                          ...buttonRow,
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
                          onClick={() =>
                            setEditingId(null)
                          }
                          style={smallGrayButton}
                        >
                          Cancel
                        </button>

                      </div>

                    </>

                  ) : (

                    <>

                      <span style={typeBadge}>
                        {member.type}
                      </span>

                      <h3 style={itemTitle}>
                        {member.name}
                      </h3>

                      <p style={itemDescription}>
                        {member.role}
                      </p>

                      <div style={buttonRow}>

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

                            setEditingType(
                              member.type
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

                    </>

                  )}

                </div>

              ))}

            </div>

          )}

        </div>

      )}

    </SectionWrapper>
  );
}


// ======================================================
// PROJECTS
// ======================================================

function ProjectsSection() {

  const emptyProject = {
    title: "",
    category: "",
    description: "",
    goals: "",
    beneficiaries: "",
    expected_outcomes: "",
    status: "Ongoing",
    start_date: "",
    end_date: "",
    location: "",
  };


  const [projects, setProjects] =
    useState([]);

  const [form, setForm] =
    useState(emptyProject);

  const [editingId, setEditingId] =
    useState(null);

  const [editForm, setEditForm] =
    useState(emptyProject);

  const [loading, setLoading] =
    useState(true);

  const [message, setMessage] =
    useState("");


  const fetchProjects = async () => {

    try {

      const response = await fetch(
        `${API}/api/projects`
      );

      const data =
        await response.json();

      setProjects(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (error) {

      console.error(error);

      setMessage(
        "Unable to load projects."
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {
    fetchProjects();
  }, []);


  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });

  };


  const addProject = async () => {

    if (
      !form.title.trim() ||
      !form.description.trim()
    ) {

      setMessage(
        "Project title and description are required."
      );

      return;
    }

    try {

      const response = await fetch(
        `${API}/api/projects`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {

        setMessage(
          data.message ||
            "Failed to add project."
        );

        return;
      }

      setForm(emptyProject);

      setMessage(
        "Project added successfully! ✅"
      );

      fetchProjects();

    } catch (error) {

      console.error(error);

      setMessage(
        "Server error."
      );

    }

  };


  const updateProject = async (id) => {

    if (
      !editForm.title.trim() ||
      !editForm.description.trim()
    ) {
      return;
    }

    try {

      const response = await fetch(
        `${API}/api/projects/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            editForm
          ),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {

        setMessage(
          data.message ||
            "Failed to update project."
        );

        return;
      }

      setEditingId(null);

      setEditForm(emptyProject);

      setMessage(
        "Project updated successfully! ✅"
      );

      fetchProjects();

    } catch (error) {

      console.error(error);

      setMessage(
        "Server error."
      );

    }

  };


  const deleteProject = async (id) => {

    if (
      !window.confirm(
        "Are you sure you want to delete this project? This may also remove its related content."
      )
    ) {
      return;
    }

    try {

      const response = await fetch(
        `${API}/api/projects/${id}`,
        {
          method: "DELETE",
        }
      );

      const data =
        await response.json();

      if (!response.ok) {

        setMessage(
          data.message ||
            "Failed to delete project."
        );

        return;
      }

      setMessage(
        "Project deleted successfully! ✅"
      );

      fetchProjects();

    } catch (error) {

      console.error(error);

      setMessage(
        "Server error."
      );

    }

  };


  if (loading) {
    return <Loading />;
  }


  return (
    <SectionWrapper>

      <h2>Projects</h2>

      <p style={descriptionStyle}>
        Manage complete project information
        including textual content, goals,
        beneficiaries, outcomes, status,
        dates and location.
      </p>

      {message && (
        <Message text={message} />
      )}


      {/* ADD PROJECT */}

      <div style={formBox}>

        <h3>
          Add New Project
        </h3>


        <ProjectForm
          form={form}
          setForm={setForm}
        />


        <button
          onClick={addProject}
          style={{
            ...primaryButton,
            marginTop: "20px",
          }}
        >
          + Add Project
        </button>

      </div>


      {/* PROJECT LIST */}

      <div style={itemsContainer}>

        <h3>
          Existing Projects
        </h3>


        {projects.length === 0 ? (

          <EmptyState text="No projects found." />

        ) : (

          <div style={projectAdminGrid}>

            {projects.map((project) => (

              <div
                key={project.id}
                style={projectAdminCard}
              >

                {editingId === project.id ? (

                  <>

                    <ProjectForm
                      form={editForm}
                      setForm={setEditForm}
                    />

                    <div
                      style={{
                        ...buttonRow,
                        marginTop: "20px",
                      }}
                    >

                      <button
                        onClick={() =>
                          updateProject(
                            project.id
                          )
                        }
                        style={smallGreenButton}
                      >
                        Save Changes
                      </button>

                      <button
                        onClick={() => {
                          setEditingId(null);
                          setEditForm(
                            emptyProject
                          );
                        }}
                        style={smallGrayButton}
                      >
                        Cancel
                      </button>

                    </div>

                  </>

                ) : (

                  <>

                    <div style={projectStatus}>
                      {project.status}
                    </div>

                    <h3 style={projectAdminTitle}>
                      {project.title}
                    </h3>

                    <p style={projectCategory}>
                      {project.category ||
                        "Project"}
                    </p>

                    <p style={itemDescription}>
                      {project.description}
                    </p>


                    <div style={projectInfoBox}>

                      <InfoRow
                        label="Goals"
                        value={
                          project.goals
                        }
                      />

                      <InfoRow
                        label="Beneficiaries"
                        value={
                          project.beneficiaries
                        }
                      />

                      <InfoRow
                        label="Expected Outcomes"
                        value={
                          project.expected_outcomes
                        }
                      />

                      <InfoRow
                        label="Location"
                        value={
                          project.location
                        }
                      />

                    </div>


                    <div style={buttonRow}>

                      <button
                        onClick={() => {

                          setEditingId(
                            project.id
                          );

                          setEditForm({
                            title:
                              project.title ||
                              "",
                            category:
                              project.category ||
                              "",
                            description:
                              project.description ||
                              "",
                            goals:
                              project.goals ||
                              "",
                            beneficiaries:
                              project.beneficiaries ||
                              "",
                            expected_outcomes:
                              project.expected_outcomes ||
                              "",
                            status:
                              project.status ||
                              "Ongoing",
                            start_date:
                              formatDateForInput(
                                project.start_date
                              ),
                            end_date:
                              formatDateForInput(
                                project.end_date
                              ),
                            location:
                              project.location ||
                              "",
                          });

                        }}
                        style={smallBlueButton}
                      >
                        Edit
                      </button>


                      <button
                        onClick={() =>
                          deleteProject(
                            project.id
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

            ))}

          </div>

        )}

      </div>

    </SectionWrapper>
  );
}


// ======================================================
// PROJECT FORM
// ======================================================

function ProjectForm({
  form,
  setForm,
}) {

  const updateField = (
    field,
    value
  ) => {

    setForm({
      ...form,
      [field]: value,
    });

  };


  return (
    <div>

      <label style={labelStyle}>
        Project Title *
      </label>

      <input
        value={form.title}
        onChange={(e) =>
          updateField(
            "title",
            e.target.value
          )
        }
        placeholder="Project title"
        style={inputStyle}
      />


      <label style={formLabelMargin}>
        Category
      </label>

      <input
        value={form.category}
        onChange={(e) =>
          updateField(
            "category",
            e.target.value
          )
        }
        placeholder="e.g. Education, Healthcare"
        style={inputStyle}
      />


      <label style={formLabelMargin}>
        Description *
      </label>

      <textarea
        value={form.description}
        onChange={(e) =>
          updateField(
            "description",
            e.target.value
          )
        }
        placeholder="Project description"
        rows="5"
        style={textareaStyle}
      />


      <label style={formLabelMargin}>
        Goals
      </label>

      <textarea
        value={form.goals}
        onChange={(e) =>
          updateField(
            "goals",
            e.target.value
          )
        }
        placeholder="What are the goals of this project?"
        rows="4"
        style={textareaStyle}
      />


      <label style={formLabelMargin}>
        Beneficiaries
      </label>

      <textarea
        value={form.beneficiaries}
        onChange={(e) =>
          updateField(
            "beneficiaries",
            e.target.value
          )
        }
        placeholder="Who benefits from this project?"
        rows="4"
        style={textareaStyle}
      />


      <label style={formLabelMargin}>
        Expected Outcomes
      </label>

      <textarea
        value={form.expected_outcomes}
        onChange={(e) =>
          updateField(
            "expected_outcomes",
            e.target.value
          )
        }
        placeholder="Expected project outcomes"
        rows="4"
        style={textareaStyle}
      />


      <label style={formLabelMargin}>
        Status
      </label>

      <select
        value={form.status}
        onChange={(e) =>
          updateField(
            "status",
            e.target.value
          )
        }
        style={inputStyle}
      >

        <option value="Ongoing">
          Ongoing
        </option>

        <option value="Completed">
          Completed
        </option>

        <option value="Upcoming">
          Upcoming
        </option>

      </select>


      <div style={twoColumnForm}>

        <div>

          <label style={formLabelMargin}>
            Start Date
          </label>

          <input
            type="date"
            value={form.start_date}
            onChange={(e) =>
              updateField(
                "start_date",
                e.target.value
              )
            }
            style={inputStyle}
          />

        </div>


        <div>

          <label style={formLabelMargin}>
            End Date
          </label>

          <input
            type="date"
            value={form.end_date}
            onChange={(e) =>
              updateField(
                "end_date",
                e.target.value
              )
            }
            style={inputStyle}
          />

        </div>

      </div>


      <label style={formLabelMargin}>
        Location
      </label>

      <input
        value={form.location}
        onChange={(e) =>
          updateField(
            "location",
            e.target.value
          )
        }
        placeholder="Project location"
        style={inputStyle}
      />

    </div>
  );
}


// ======================================================
// SUCCESS STORIES
// ======================================================

function SuccessStoriesSection() {

  const [projects, setProjects] =
    useState([]);

  const [selectedProject, setSelectedProject] =
    useState("");

  const [stories, setStories] =
    useState([]);

  const [title, setTitle] =
    useState("");

  const [story, setStory] =
    useState("");

  const [personName, setPersonName] =
    useState("");

  const [editingId, setEditingId] =
    useState(null);

  const [editingTitle, setEditingTitle] =
    useState("");

  const [editingStory, setEditingStory] =
    useState("");

  const [editingPersonName, setEditingPersonName] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [loadingStories, setLoadingStories] =
    useState(false);

  const [message, setMessage] =
    useState("");


  const fetchProjects = async () => {

    try {

      const response = await fetch(
        `${API}/api/projects`
      );

      const data =
        await response.json();

      setProjects(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (error) {

      console.error(error);

      setMessage(
        "Unable to load projects."
      );

    } finally {

      setLoading(false);

    }

  };


  const fetchStories = async (
    projectId
  ) => {

    if (!projectId) {

      setStories([]);

      return;
    }

    try {

      setLoadingStories(true);

      const response = await fetch(
        `${API}/api/projects/${projectId}/success-stories`
      );

      const data =
        await response.json();

      setStories(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (error) {

      console.error(error);

      setStories([]);

      setMessage(
        "Unable to load success stories."
      );

    } finally {

      setLoadingStories(false);

    }

  };


  useEffect(() => {
    fetchProjects();
  }, []);


  useEffect(() => {
    fetchStories(selectedProject);
  }, [selectedProject]);


  const addStory = async () => {

    if (!selectedProject) {

      setMessage(
        "Please select a project."
      );

      return;
    }

    if (
      !title.trim() ||
      !story.trim()
    ) {

      setMessage(
        "Title and story are required."
      );

      return;
    }

    try {

      const response = await fetch(
        `${API}/api/projects/${selectedProject}/success-stories`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            title,
            story,
            person_name:
              personName,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {

        setMessage(
          data.message ||
            "Failed to add story."
        );

        return;
      }

      setTitle("");
      setStory("");
      setPersonName("");

      setMessage(
        "Success story added successfully! ✅"
      );

      fetchStories(
        selectedProject
      );

    } catch (error) {

      console.error(error);

      setMessage(
        "Server error."
      );

    }

  };


  const updateStory = async (id) => {

    if (
      !editingTitle.trim() ||
      !editingStory.trim()
    ) {
      return;
    }

    try {

      const response = await fetch(
        `${API}/api/projects/success-stories/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            title: editingTitle,
            story: editingStory,
            person_name:
              editingPersonName,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {

        setMessage(
          data.message ||
            "Failed to update story."
        );

        return;
      }

      setEditingId(null);

      setMessage(
        "Success story updated successfully! ✅"
      );

      fetchStories(
        selectedProject
      );

    } catch (error) {

      console.error(error);

      setMessage(
        "Server error."
      );

    }

  };


  const deleteStory = async (id) => {

    if (
      !window.confirm(
        "Are you sure you want to delete this success story?"
      )
    ) {
      return;
    }

    try {

      const response = await fetch(
        `${API}/api/projects/success-stories/${id}`,
        {
          method: "DELETE",
        }
      );

      const data =
        await response.json();

      if (!response.ok) {

        setMessage(
          data.message ||
            "Failed to delete story."
        );

        return;
      }

      setMessage(
        "Success story deleted successfully! ✅"
      );

      fetchStories(
        selectedProject
      );

    } catch (error) {

      console.error(error);

    }

  };


  if (loading) {
    return <Loading />;
  }


  return (
    <SectionWrapper>

      <h2>Success Stories</h2>

      <p style={descriptionStyle}>
        Manage success stories and testimonials
        displayed on project detail pages.
      </p>

      {message && (
        <Message text={message} />
      )}


      <div style={formBox}>

        <label style={labelStyle}>
          Select Project
        </label>

        <select
          value={selectedProject}
          onChange={(e) =>
            setSelectedProject(
              e.target.value
            )
          }
          style={inputStyle}
        >

          <option value="">
            -- Select Project --
          </option>

          {projects.map((project) => (

            <option
              key={project.id}
              value={project.id}
            >
              {project.title}
            </option>

          ))}

        </select>

      </div>


      {selectedProject && (

        <div style={formBox}>

          <h3>
            Add Success Story
          </h3>

          <label style={labelStyle}>
            Story Title *
          </label>

          <input
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder="e.g. Back to Learning"
            style={inputStyle}
          />


          <label style={formLabelMargin}>
            Story *
          </label>

          <textarea
            value={story}
            onChange={(e) =>
              setStory(e.target.value)
            }
            placeholder="Enter success story or testimonial"
            rows="7"
            style={textareaStyle}
          />


          <label style={formLabelMargin}>
            Person / Beneficiary
          </label>

          <input
            value={personName}
            onChange={(e) =>
              setPersonName(
                e.target.value
              )
            }
            placeholder="e.g. Education Beneficiary"
            style={inputStyle}
          />


          <button
            onClick={addStory}
            style={{
              ...primaryButton,
              marginTop: "18px",
            }}
          >
            + Add Success Story
          </button>

        </div>

      )}


      {selectedProject && (

        <div style={itemsContainer}>

          <h3>
            Existing Success Stories
          </h3>

          {loadingStories ? (

            <Loading />

          ) : stories.length === 0 ? (

            <EmptyState text="No success stories found." />

          ) : (

            <div style={cardGrid}>

              {stories.map((item) => (

                <div
                  key={item.id}
                  style={teamCard}
                >

                  {editingId === item.id ? (

                    <>

                      <input
                        value={editingTitle}
                        onChange={(e) =>
                          setEditingTitle(
                            e.target.value
                          )
                        }
                        style={inputStyle}
                      />

                      <textarea
                        value={editingStory}
                        onChange={(e) =>
                          setEditingStory(
                            e.target.value
                          )
                        }
                        rows="7"
                        style={{
                          ...textareaStyle,
                          marginTop: "10px",
                        }}
                      />

                      <input
                        value={
                          editingPersonName
                        }
                        onChange={(e) =>
                          setEditingPersonName(
                            e.target.value
                          )
                        }
                        style={{
                          ...inputStyle,
                          marginTop: "10px",
                        }}
                      />

                      <div
                        style={{
                          ...buttonRow,
                          marginTop: "15px",
                        }}
                      >

                        <button
                          onClick={() =>
                            updateStory(
                              item.id
                            )
                          }
                          style={smallGreenButton}
                        >
                          Save
                        </button>

                        <button
                          onClick={() =>
                            setEditingId(null)
                          }
                          style={smallGrayButton}
                        >
                          Cancel
                        </button>

                      </div>

                    </>

                  ) : (

                    <>

                      <span style={storyBadge}>
                        SUCCESS STORY
                      </span>

                      <h3 style={itemTitle}>
                        {item.title}
                      </h3>

                      <p style={itemDescription}>
                        {item.story}
                      </p>

                      {item.person_name && (

                        <p style={personNameStyle}>
                          — {item.person_name}
                        </p>

                      )}

                      <div style={buttonRow}>

                        <button
                          onClick={() => {

                            setEditingId(
                              item.id
                            );

                            setEditingTitle(
                              item.title ||
                                ""
                            );

                            setEditingStory(
                              item.story ||
                                ""
                            );

                            setEditingPersonName(
                              item.person_name ||
                                ""
                            );

                          }}
                          style={smallBlueButton}
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            deleteStory(
                              item.id
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

              ))}

            </div>

          )}

        </div>

      )}

    </SectionWrapper>
  );
}


// ======================================================
// PROJECT STATISTICS
// ======================================================

function StatisticsSection() {

  const [projects, setProjects] =
    useState([]);

  const [selectedProject, setSelectedProject] =
    useState("");

  const [statistics, setStatistics] =
    useState([]);

  const [metricName, setMetricName] =
    useState("");

  const [metricValue, setMetricValue] =
    useState("");

  const [metricUnit, setMetricUnit] =
    useState("");

  const [editingId, setEditingId] =
    useState(null);

  const [editingName, setEditingName] =
    useState("");

  const [editingValue, setEditingValue] =
    useState("");

  const [editingUnit, setEditingUnit] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [loadingStats, setLoadingStats] =
    useState(false);

  const [message, setMessage] =
    useState("");


  const fetchProjects = async () => {

    try {

      const response = await fetch(
        `${API}/api/projects`
      );

      const data =
        await response.json();

      setProjects(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (error) {

      console.error(error);

      setMessage(
        "Unable to load projects."
      );

    } finally {

      setLoading(false);

    }

  };


  const fetchStatistics = async (
    projectId
  ) => {

    if (!projectId) {

      setStatistics([]);

      return;
    }

    try {

      setLoadingStats(true);

      const response = await fetch(
        `${API}/api/projects/${projectId}/statistics`
      );

      const data =
        await response.json();

      setStatistics(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (error) {

      console.error(error);

      setStatistics([]);

      setMessage(
        "Unable to load statistics."
      );

    } finally {

      setLoadingStats(false);

    }

  };


  useEffect(() => {
    fetchProjects();
  }, []);


  useEffect(() => {
    fetchStatistics(
      selectedProject
    );
  }, [selectedProject]);


  const addStatistic = async () => {

    if (!selectedProject) {

      setMessage(
        "Please select a project."
      );

      return;
    }

    if (
      !metricName.trim() ||
      !metricValue
    ) {

      setMessage(
        "Metric name and value are required."
      );

      return;
    }

    try {

      const response = await fetch(
        `${API}/api/projects/${selectedProject}/statistics`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            metric_name:
              metricName,
            metric_value:
              Number(metricValue),
            metric_unit:
              metricUnit,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {

        setMessage(
          data.message ||
            "Failed to add statistic."
        );

        return;
      }

      setMetricName("");
      setMetricValue("");
      setMetricUnit("");

      setMessage(
        "Statistic added successfully! ✅"
      );

      fetchStatistics(
        selectedProject
      );

    } catch (error) {

      console.error(error);

      setMessage(
        "Server error."
      );

    }

  };


  const updateStatistic = async (
    id
  ) => {

    if (
      !editingName.trim() ||
      !editingValue
    ) {
      return;
    }

    try {

      const response = await fetch(
        `${API}/api/projects/statistics/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            metric_name:
              editingName,
            metric_value:
              Number(editingValue),
            metric_unit:
              editingUnit,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {

        setMessage(
          data.message ||
            "Failed to update statistic."
        );

        return;
      }

      setEditingId(null);

      setMessage(
        "Statistic updated successfully! ✅"
      );

      fetchStatistics(
        selectedProject
      );

    } catch (error) {

      console.error(error);

    }

  };


  const deleteStatistic = async (
    id
  ) => {

    if (
      !window.confirm(
        "Are you sure you want to delete this statistic?"
      )
    ) {
      return;
    }

    try {

      const response = await fetch(
        `${API}/api/projects/statistics/${id}`,
        {
          method: "DELETE",
        }
      );

      const data =
        await response.json();

      if (!response.ok) {

        setMessage(
          data.message ||
            "Failed to delete statistic."
        );

        return;
      }

      setMessage(
        "Statistic deleted successfully! ✅"
      );

      fetchStatistics(
        selectedProject
      );

    } catch (error) {

      console.error(error);

    }

  };


  if (loading) {
    return <Loading />;
  }


  return (
    <SectionWrapper>

      <h2>
        Project Statistics & Impact
      </h2>

      <p style={descriptionStyle}>
        Manage measurable project impact
        including people reached, sessions,
        volunteers and other statistics.
      </p>

      {message && (
        <Message text={message} />
      )}


      <div style={formBox}>

        <label style={labelStyle}>
          Select Project
        </label>

        <select
          value={selectedProject}
          onChange={(e) =>
            setSelectedProject(
              e.target.value
            )
          }
          style={inputStyle}
        >

          <option value="">
            -- Select Project --
          </option>

          {projects.map((project) => (

            <option
              key={project.id}
              value={project.id}
            >
              {project.title}
            </option>

          ))}

        </select>

      </div>


      {selectedProject && (

        <div style={formBox}>

          <h3>
            Add Project Statistic
          </h3>

          <label style={labelStyle}>
            Metric Name *
          </label>

          <input
            value={metricName}
            onChange={(e) =>
              setMetricName(
                e.target.value
              )
            }
            placeholder="e.g. Students Supported"
            style={inputStyle}
          />


          <label style={formLabelMargin}>
            Metric Value *
          </label>

          <input
            type="number"
            value={metricValue}
            onChange={(e) =>
              setMetricValue(
                e.target.value
              )
            }
            placeholder="e.g. 120"
            style={inputStyle}
          />


          <label style={formLabelMargin}>
            Unit
          </label>

          <input
            value={metricUnit}
            onChange={(e) =>
              setMetricUnit(
                e.target.value
              )
            }
            placeholder="e.g. students"
            style={inputStyle}
          />


          <button
            onClick={addStatistic}
            style={{
              ...primaryButton,
              marginTop: "18px",
            }}
          >
            + Add Statistic
          </button>

        </div>

      )}


      {selectedProject && (

        <div style={itemsContainer}>

          <h3>
            Existing Statistics
          </h3>

          {loadingStats ? (

            <Loading />

          ) : statistics.length === 0 ? (

            <EmptyState text="No statistics found." />

          ) : (

            <div style={cardGrid}>

              {statistics.map((item) => (

                <div
                  key={item.id}
                  style={teamCard}
                >

                  {editingId === item.id ? (

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

                      <input
                        type="number"
                        value={editingValue}
                        onChange={(e) =>
                          setEditingValue(
                            e.target.value
                          )
                        }
                        style={{
                          ...inputStyle,
                          marginTop: "10px",
                        }}
                      />

                      <input
                        value={editingUnit}
                        onChange={(e) =>
                          setEditingUnit(
                            e.target.value
                          )
                        }
                        style={{
                          ...inputStyle,
                          marginTop: "10px",
                        }}
                      />

                      <div
                        style={{
                          ...buttonRow,
                          marginTop: "15px",
                        }}
                      >

                        <button
                          onClick={() =>
                            updateStatistic(
                              item.id
                            )
                          }
                          style={smallGreenButton}
                        >
                          Save
                        </button>

                        <button
                          onClick={() =>
                            setEditingId(null)
                          }
                          style={smallGrayButton}
                        >
                          Cancel
                        </button>

                      </div>

                    </>

                  ) : (

                    <>

                      <span style={impactBadge}>
                        IMPACT
                      </span>

                      <h3 style={itemTitle}>
                        {item.metric_name}
                      </h3>

                      <div style={metricValueStyle}>
                        {item.metric_value}
                      </div>

                      <p style={itemDescription}>
                        {item.metric_unit}
                      </p>

                      <div style={buttonRow}>

                        <button
                          onClick={() => {

                            setEditingId(
                              item.id
                            );

                            setEditingName(
                              item.metric_name ||
                                ""
                            );

                            setEditingValue(
                              item.metric_value ||
                                ""
                            );

                            setEditingUnit(
                              item.metric_unit ||
                                ""
                            );

                          }}
                          style={smallBlueButton}
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            deleteStatistic(
                              item.id
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

              ))}

            </div>

          )}

        </div>

      )}

    </SectionWrapper>
  );
}


// ======================================================
// PROJECT MEDIA
// ======================================================

function ProjectMediaSection() {

  const [projects, setProjects] =
    useState([]);

  const [selectedProject, setSelectedProject] =
    useState("");

  const [images, setImages] =
    useState([]);

  const [imageUrl, setImageUrl] =
    useState("");

  const [caption, setCaption] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [loadingImages, setLoadingImages] =
    useState(false);

  const [message, setMessage] =
    useState("");


  const fetchProjects = async () => {

    try {

      const response = await fetch(
        `${API}/api/projects`
      );

      const data =
        await response.json();

      setProjects(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (error) {

      console.error(error);

      setMessage(
        "Unable to load projects."
      );

    } finally {

      setLoading(false);

    }

  };


  const fetchImages = async (
    projectId
  ) => {

    if (!projectId) {

      setImages([]);

      return;
    }

    try {

      setLoadingImages(true);

      const response = await fetch(
        `${API}/api/projects/${projectId}/images`
      );

      const data =
        await response.json();

      setImages(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (error) {

      console.error(error);

      setImages([]);

      setMessage(
        "Unable to load project images."
      );

    } finally {

      setLoadingImages(false);

    }

  };


  useEffect(() => {
    fetchProjects();
  }, []);


  useEffect(() => {
    fetchImages(selectedProject);
  }, [selectedProject]);


  const addImage = async () => {

    if (!selectedProject) {

      setMessage(
        "Please select a project."
      );

      return;
    }

    if (!imageUrl.trim()) {

      setMessage(
        "Please enter image URL."
      );

      return;
    }

    try {

      const response = await fetch(
        `${API}/api/projects/${selectedProject}/images`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            image_url:
              imageUrl,
            caption,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {

        setMessage(
          data.message ||
            "Failed to add image."
        );

        return;
      }

      setImageUrl("");
      setCaption("");

      setMessage(
        "Project image added successfully! ✅"
      );

      fetchImages(
        selectedProject
      );

    } catch (error) {

      console.error(error);

      setMessage(
        "Server error."
      );

    }

  };


  const deleteImage = async (
    id
  ) => {

    if (
      !window.confirm(
        "Are you sure you want to delete this image?"
      )
    ) {
      return;
    }

    try {

      const response = await fetch(
        `${API}/api/projects/images/${id}`,
        {
          method: "DELETE",
        }
      );

      const data =
        await response.json();

      if (!response.ok) {

        setMessage(
          data.message ||
            "Failed to delete image."
        );

        return;
      }

      setMessage(
        "Project image deleted successfully! ✅"
      );

      fetchImages(
        selectedProject
      );

    } catch (error) {

      console.error(error);

    }

  };


  if (loading) {
    return <Loading />;
  }


  return (
    <SectionWrapper>

      <h2>Project Media</h2>

      <p style={descriptionStyle}>
        Manage the images displayed in the
        project's media gallery.
      </p>

      {message && (
        <Message text={message} />
      )}


      <div style={formBox}>

        <label style={labelStyle}>
          Select Project
        </label>

        <select
          value={selectedProject}
          onChange={(e) =>
            setSelectedProject(
              e.target.value
            )
          }
          style={inputStyle}
        >

          <option value="">
            -- Select Project --
          </option>

          {projects.map((project) => (

            <option
              key={project.id}
              value={project.id}
            >
              {project.title}
            </option>

          ))}

        </select>

      </div>


      {selectedProject && (

        <div style={formBox}>

          <h3>
            Add Project Image
          </h3>

          <label style={labelStyle}>
            Image URL *
          </label>

          <input
            value={imageUrl}
            onChange={(e) =>
              setImageUrl(
                e.target.value
              )
            }
            placeholder="Paste image URL"
            style={inputStyle}
          />


          <label style={formLabelMargin}>
            Caption
          </label>

          <input
            value={caption}
            onChange={(e) =>
              setCaption(
                e.target.value
              )
            }
            placeholder="Image caption"
            style={inputStyle}
          />


          {imageUrl && (

            <div style={previewBox}>

              <p style={previewLabel}>
                IMAGE PREVIEW
              </p>

              <img
                src={imageUrl}
                alt="Preview"
                style={imagePreview}
                onError={(e) => {
                  e.currentTarget.style.display =
                    "none";
                }}
              />

            </div>

          )}


          <button
            onClick={addImage}
            style={{
              ...primaryButton,
              marginTop: "18px",
            }}
          >
            + Add Image
          </button>

        </div>

      )}


      {selectedProject && (

        <div style={itemsContainer}>

          <h3>
            Existing Project Images
          </h3>

          {loadingImages ? (

            <Loading />

          ) : images.length === 0 ? (

            <EmptyState text="No project images found." />

          ) : (

            <div style={mediaGrid}>

              {images.map((image) => (

                <div
                  key={image.id}
                  style={mediaCard}
                >

                  <img
                    src={
                      image.image_url ||
                      image.image
                    }
                    alt={
                      image.caption ||
                      "Project"
                    }
                    style={mediaImage}
                  />


                  <div style={mediaContent}>

                    <p style={itemDescription}>
                      {image.caption ||
                        "Project image"}
                    </p>

                    <button
                      onClick={() =>
                        deleteImage(
                          image.id
                        )
                      }
                      style={smallRedButton}
                    >
                      Delete Image
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      )}

    </SectionWrapper>
  );
}


// ======================================================
// INFO ROW
// ======================================================

function InfoRow({
  label,
  value,
}) {

  if (!value) {
    return null;
  }

  return (
    <div style={infoRow}>

      <strong>
        {label}:
      </strong>

      <span>
        {value}
      </span>

    </div>
  );
}


// ======================================================
// COMMON COMPONENTS
// ======================================================

function SectionWrapper({
  children,
}) {
  return (
    <div style={sectionWrapper}>
      {children}
    </div>
  );
}


function Loading() {
  return (
    <div style={loadingBox}>

      <div style={loadingSpinner}>
        ⏳
      </div>

      <p>
        Loading...
      </p>

    </div>
  );
}


function Message({
  text,
}) {
  return (
    <div style={messageBox}>
      {text}
    </div>
  );
}


function EmptyState({
  text,
}) {
  return (
    <div style={emptyState}>
      {text}
    </div>
  );
}


// ======================================================
// HELPER
// ======================================================

function formatDateForInput(
  date
) {

  if (!date) {
    return "";
  }

  const stringDate =
    String(date);

  return stringDate.substring(
    0,
    10
  );
}


// ======================================================
// STYLES
// ======================================================

const dashboardLayout = {
  minHeight: "100vh",
  background: "#f3f4f6",
  display: "flex",
};


const sidebar = {
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
};


const sidebarLogo = {
  padding: "25px 22px",
  borderBottom:
    "1px solid #374151",
};


const logoTitle = {
  margin: 0,
  fontSize: "25px",
  fontWeight: "800",
};


const logoSubtitle = {
  margin: "6px 0 0",
  color: "#cbd5e1",
  fontSize: "13px",
};


const sidebarNavigation = {
  padding: "22px 15px",
  flex: 1,
  overflowY: "auto",
};


const sidebarButton = {
  width: "100%",
  border: "none",
  padding: "14px 16px",
  marginBottom: "6px",
  borderRadius: "9px",
  background: "transparent",
  color: "#e5e7eb",
  textAlign: "left",
  fontSize: "14px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "10px",
};


const sidebarButtonActive = {
  background: "#374151",
  color: "#fff",
  fontWeight: "700",
};


const sidebarIcon = {
  width: "24px",
  textAlign: "center",
};


const sidebarDivider = {
  height: "1px",
  background: "#374151",
  margin:
    "18px 5px 15px",
};


const sidebarHeading = {
  color: "#9ca3af",
  fontSize: "10px",
  fontWeight: "800",
  letterSpacing: "1.3px",
  padding: "0 12px",
  marginBottom: "10px",
};


const logoutContainer = {
  padding: "15px",
  borderTop:
    "1px solid #374151",
};


const logoutButton = {
  width: "100%",
  padding: "13px",
  border: "none",
  borderRadius: "9px",
  background: "#dc2626",
  color: "#fff",
  fontSize: "14px",
  fontWeight: "700",
  cursor: "pointer",
};


const mainContent = {
  marginLeft: "270px",
  width: "calc(100% - 270px)",
  minHeight: "100vh",
};


const topHeader = {
  background: "#fff",
  padding: "22px 40px",
  borderBottom:
    "1px solid #e5e7eb",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};


const headerTitle = {
  margin: 0,
  fontSize: "28px",
  color: "#111827",
};


const headerSubtitle = {
  margin: "6px 0 0",
  color: "#6b7280",
};


const adminBadge = {
  background: "#111827",
  color: "#fff",
  padding: "9px 18px",
  borderRadius: "25px",
  fontWeight: "700",
  fontSize: "12px",
};


const contentArea = {
  padding: "40px",
};


const welcomeCard = {
  background:
    "linear-gradient(135deg, #111827, #374151)",
  color: "#fff",
  borderRadius: "18px",
  padding: "38px",
  marginBottom: "40px",
  boxShadow:
    "0 8px 25px rgba(0,0,0,0.08)",
};


const welcomeLabel = {
  margin: 0,
  color: "#d1d5db",
  fontSize: "12px",
  fontWeight: "800",
  letterSpacing: "1.5px",
};


const welcomeTitle = {
  fontSize: "30px",
  margin:
    "12px 0 12px",
};


const welcomeDescription = {
  color: "#d1d5db",
  maxWidth: "700px",
  lineHeight: "1.7",
};


const loggedUser = {
  color: "#e5e7eb",
  marginTop: "20px",
};


const dashboardSectionTitle = {
  fontSize: "22px",
  color: "#111827",
  marginBottom: "20px",
};


const managementGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "24px",
};


const managementCard = {
  background: "#fff",
  borderRadius: "15px",
  padding: "28px",
  boxShadow:
    "0 5px 20px rgba(0,0,0,0.06)",
};


const managementIcon = {
  fontSize: "38px",
  marginBottom: "15px",
};


const managementTitle = {
  margin:
    "0 0 10px",
  fontSize: "20px",
};


const managementDescription = {
  color: "#6b7280",
  lineHeight: "1.6",
  minHeight: "65px",
};


const sectionWrapper = {
  background: "#fff",
  borderRadius: "16px",
  padding: "35px",
  boxShadow:
    "0 5px 20px rgba(0,0,0,0.06)",
};


const descriptionStyle = {
  color: "#6b7280",
  lineHeight: "1.6",
  marginBottom: "25px",
};


const formBox = {
  background: "#f9fafb",
  border: "1px solid #e5e7eb",
  padding: "25px",
  borderRadius: "12px",
  marginBottom: "30px",
};


const labelStyle = {
  display: "block",
  fontWeight: "700",
  marginBottom: "9px",
  color: "#374151",
};


const formLabelMargin = {
  display: "block",
  fontWeight: "700",
  marginTop: "16px",
  marginBottom: "9px",
  color: "#374151",
};


const inputStyle = {
  width: "100%",
  padding: "13px 14px",
  border:
    "1px solid #d1d5db",
  borderRadius: "8px",
  fontSize: "14px",
  boxSizing: "border-box",
  background: "#fff",
};


const textareaStyle = {
  width: "100%",
  padding: "14px",
  border:
    "1px solid #d1d5db",
  borderRadius: "8px",
  fontSize: "14px",
  lineHeight: "1.6",
  resize: "vertical",
  boxSizing: "border-box",
  background: "#fff",
};


const primaryButton = {
  background: "#111827",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  padding: "12px 20px",
  fontSize: "14px",
  fontWeight: "700",
  cursor: "pointer",
};


const smallBlueButton = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  padding: "8px 13px",
  cursor: "pointer",
  fontWeight: "700",
  fontSize: "12px",
};


const smallRedButton = {
  background: "#dc2626",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  padding: "8px 13px",
  cursor: "pointer",
  fontWeight: "700",
  fontSize: "12px",
};


const smallGreenButton = {
  background: "#059669",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  padding: "8px 13px",
  cursor: "pointer",
  fontWeight: "700",
  fontSize: "12px",
};


const smallGrayButton = {
  background: "#6b7280",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  padding: "8px 13px",
  cursor: "pointer",
  fontWeight: "700",
  fontSize: "12px",
};


const formRow = {
  display: "flex",
  gap: "12px",
  alignItems: "center",
};


const editRow = {
  width: "100%",
  display: "flex",
  gap: "10px",
  alignItems: "center",
};


const buttonRow = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
};


const listItem = {
  background: "#f9fafb",
  border:
    "1px solid #e5e7eb",
  borderRadius: "10px",
  padding: "16px",
  marginBottom: "12px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
};


const largeListItem = {
  background: "#f9fafb",
  border:
    "1px solid #e5e7eb",
  borderRadius: "12px",
  padding: "24px",
  marginBottom: "15px",
};


const listItemText = {
  flex: 1,
  fontWeight: "600",
};


const itemTitle = {
  margin:
    "12px 0 8px",
  color: "#111827",
};


const itemDescription = {
  color: "#6b7280",
  lineHeight: "1.6",
};


const itemsContainer = {
  marginTop: "30px",
};


const cardGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "20px",
};


const teamCard = {
  background: "#fff",
  border:
    "1px solid #e5e7eb",
  borderRadius: "12px",
  padding: "22px",
  boxShadow:
    "0 3px 12px rgba(0,0,0,0.04)",
};


const typeBadge = {
  display: "inline-block",
  padding: "5px 9px",
  background: "#eff6ff",
  color: "#2563eb",
  borderRadius: "5px",
  fontSize: "10px",
  fontWeight: "800",
};


const storyBadge = {
  display: "inline-block",
  padding: "5px 9px",
  background: "#fff7ed",
  color: "#ea580c",
  borderRadius: "5px",
  fontSize: "10px",
  fontWeight: "800",
};


const impactBadge = {
  display: "inline-block",
  padding: "5px 9px",
  background: "#ecfdf5",
  color: "#059669",
  borderRadius: "5px",
  fontSize: "10px",
  fontWeight: "800",
};


const personNameStyle = {
  fontWeight: "700",
  color: "#374151",
};


const metricValueStyle = {
  fontSize: "34px",
  fontWeight: "800",
  color: "#111827",
  margin:
    "15px 0 5px",
};


const twoColumnForm = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "15px",
};


const projectAdminGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(330px, 1fr))",
  gap: "22px",
};


const projectAdminCard = {
  background: "#fff",
  border:
    "1px solid #e5e7eb",
  borderRadius: "14px",
  padding: "24px",
  boxShadow:
    "0 4px 15px rgba(0,0,0,0.05)",
};


const projectAdminTitle = {
  fontSize: "22px",
  margin:
    "12px 0 5px",
};


const projectCategory = {
  color: "#2563eb",
  fontWeight: "700",
  fontSize: "13px",
};


const projectStatus = {
  display: "inline-block",
  padding: "6px 10px",
  borderRadius: "20px",
  background: "#f3f4f6",
  color: "#374151",
  fontSize: "11px",
  fontWeight: "800",
};


const projectInfoBox = {
  background: "#f9fafb",
  borderRadius: "8px",
  padding: "14px",
  margin:
    "15px 0",
};


const infoRow = {
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  marginBottom: "10px",
  fontSize: "13px",
  lineHeight: "1.5",
};


const mediaGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "20px",
};


const mediaCard = {
  background: "#fff",
  border:
    "1px solid #e5e7eb",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow:
    "0 4px 15px rgba(0,0,0,0.05)",
};


const mediaImage = {
  width: "100%",
  height: "200px",
  objectFit: "cover",
  display: "block",
};


const mediaContent = {
  padding: "18px",
};


const previewBox = {
  marginTop: "18px",
  background: "#fff",
  border:
    "1px solid #e5e7eb",
  borderRadius: "10px",
  padding: "15px",
};


const previewLabel = {
  fontSize: "10px",
  fontWeight: "800",
  color: "#6b7280",
};


const imagePreview = {
  width: "100%",
  maxHeight: "300px",
  objectFit: "cover",
  borderRadius: "8px",
  marginTop: "8px",
};


const loadingBox = {
  background: "#fff",
  padding: "60px 30px",
  borderRadius: "15px",
  textAlign: "center",
};


const loadingSpinner = {
  fontSize: "30px",
};


const messageBox = {
  marginBottom: "20px",
  padding: "13px 16px",
  background: "#ecfdf5",
  color: "#047857",
  border:
    "1px solid #a7f3d0",
  borderRadius: "8px",
  fontWeight: "600",
  fontSize: "14px",
};


const emptyState = {
  padding: "35px",
  textAlign: "center",
  background: "#f9fafb",
  border:
    "1px dashed #d1d5db",
  borderRadius: "10px",
  color: "#6b7280",
};


const accessPage = {
  minHeight: "100vh",
  background: "#f3f4f6",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "30px",
};


const accessCard = {
  background: "#fff",
  padding: "45px",
  borderRadius: "18px",
  textAlign: "center",
  maxWidth: "450px",
  width: "100%",
  boxShadow:
    "0 10px 30px rgba(0,0,0,0.08)",
};


const accessIcon = {
  fontSize: "45px",
  marginBottom: "15px",
};


// ======================================================
// EXPORT
// ======================================================

export default AdminDashboard;
