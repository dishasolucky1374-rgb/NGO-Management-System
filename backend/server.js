const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// MySQL connection pool
const db = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT) || 3306,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  ssl: {
    rejectUnauthorized: false
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test database connection
db.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("MySQL connected successfully!");
    connection.release();
  }
});

// Make database available to routes
app.locals.db = db;

// Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const bannerRoutes = require("./routes/banners");
app.use("/api/banners", bannerRoutes);

const visionMissionRoutes = require("./routes/visionMission");
app.use("/api/vision-mission", visionMissionRoutes);

const statisticsRoutes = require("./routes/statistics");
app.use("/api/statistics", statisticsRoutes);

const initiativesRoutes = require("./routes/initiatives");
app.use("/api/initiatives", initiativesRoutes);
const projectRoutes = require("./routes/projects");
app.use("/api/projects", projectRoutes);
const mediaRoutes = require("./routes/media");
app.use("/api/media", mediaRoutes);
const aboutStoryRoutes = require("./routes/aboutStory");
app.use("/api/about/story", aboutStoryRoutes);

const coreValuesRoutes = require("./routes/coreValues");
app.use("/api/about/core-values", coreValuesRoutes);

const aboutProgramsRoutes = require("./routes/aboutPrograms");
app.use("/api/about/programs", aboutProgramsRoutes);

const teamMembersRoutes = require("./routes/teamMembers");
app.use("/api/about/team-members", teamMembersRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "NGO Backend is Running!"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
