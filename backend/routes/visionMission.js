const express = require("express");

const router = express.Router();


// GET Vision and Mission
router.get("/", (req, res) => {
  const db = req.app.locals.db;

  const sql = "SELECT * FROM vision_mission LIMIT 1";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Error fetching Vision and Mission",
        error: err.message
      });
    }

    res.status(200).json(results);
  });
});


// ADD Vision and Mission
router.post("/", (req, res) => {
  const db = req.app.locals.db;

  const {
    vision_title,
    vision_description,
    mission_title,
    mission_description
  } = req.body;

  const sql = `
    INSERT INTO vision_mission
    (vision_title, vision_description, mission_title, mission_description)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      vision_title,
      vision_description,
      mission_title,
      mission_description
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Error adding Vision and Mission",
          error: err.message
        });
      }

      res.status(201).json({
        message: "Vision and Mission added successfully",
        id: result.insertId
      });
    }
  );
});


// UPDATE Vision and Mission
router.put("/:id", (req, res) => {
  const db = req.app.locals.db;

  const { id } = req.params;

  const {
    vision_title,
    vision_description,
    mission_title,
    mission_description
  } = req.body;

  const sql = `
    UPDATE vision_mission
    SET vision_title = ?,
        vision_description = ?,
        mission_title = ?,
        mission_description = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      vision_title,
      vision_description,
      mission_title,
      mission_description,
      id
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Error updating Vision and Mission",
          error: err.message
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Vision and Mission not found"
        });
      }

      res.status(200).json({
        message: "Vision and Mission updated successfully"
      });
    }
  );
});

module.exports = router;