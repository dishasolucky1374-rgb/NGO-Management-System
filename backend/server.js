const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_PASSWORD,
  database: "ngo_db"
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed:", err);
  } else {
    console.log("MySQL Connected Successfully!");
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

app.get("/", (req, res) => {
  res.send("NGO Backend is Running!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
// Statistics routes
const statisticsRoutes = require("./routes/statistics");
app.use("/api/statistics", statisticsRoutes);

// Initiative routes
const initiativesRoutes = require("./routes/initiatives");
app.use("/api/initiatives", initiativesRoutes);
