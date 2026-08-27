const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Aiven MySQL Connection Pool
const db = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
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
    console.log("Database connection failed:", err.message);
  } else {
    console.log("Aiven MySQL Connected Successfully!");
    connection.release();
  }
});

// Make database available to routes
app.locals.db = db;

// Authentication routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Banner routes
const bannerRoutes = require("./routes/banners");
app.use("/api/banners", bannerRoutes);

// Vision and Mission routes
const visionMissionRoutes = require("./routes/visionMission");
app.use("/api/vision-mission", visionMissionRoutes);

// Statistics routes
const statisticsRoutes = require("./routes/statistics");
app.use("/api/statistics", statisticsRoutes);

// Initiative routes
const initiativesRoutes = require("./routes/initiatives");
app.use("/api/initiatives", initiativesRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("NGO Backend is Running!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
