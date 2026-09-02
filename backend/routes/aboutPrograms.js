const express = require("express");

const router = express.Router();


// ===============================
// GET ALL PROGRAMS
// ===============================
router.get("/", (req, res) => {

  const db = req.app.locals.db;

  const sql = `
    SELECT *
    FROM programs
    ORDER BY id ASC
  `;

  db.query(sql, (err, results) => {

    if (err) {
      console.error("Programs Error:", err);

      return res.status(500).json({
        message: "Failed to fetch programs"
      });
    }

    res.json(results);

  });

});


// ===============================
// ADD PROGRAM
// ===============================
router.post("/", (req, res) => {

  const db = req.app.locals.db;

  console.log("ADD PROGRAM:", req.body);

  const { name, description } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({
      message: "Program name is required"
    });
  }

  const sql = `
    INSERT INTO programs (name, description)
    VALUES (?, ?)
  `;

  db.query(
    sql,
    [
      name.trim(),
      description ? description.trim() : ""
    ],
    (err, result) => {

      if (err) {
        console.error("Add Program Error:", err);

        return res.status(500).json({
          message: "Failed to add program",
          error: err.message
        });
      }

      res.status(201).json({
        success: true,
        message: "Program added successfully",
        id: result.insertId
      });

    }
  );

});


// ===============================
// UPDATE PROGRAM
// ===============================
router.put("/:id", (req, res) => {

  const db = req.app.locals.db;

  const { id } = req.params;
  const { name, description } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({
      message: "Program name is required"
    });
  }

  const sql = `
    UPDATE programs
    SET name = ?, description = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      name.trim(),
      description ? description.trim() : "",
      id
    ],
    (err, result) => {

      if (err) {
        console.error("Update Program Error:", err);

        return res.status(500).json({
          message: "Failed to update program",
          error: err.message
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Program not found"
        });
      }

      res.json({
        success: true,
        message: "Program updated successfully"
      });

    }
  );

});


// ===============================
// DELETE PROGRAM
// ===============================
router.delete("/:id", (req, res) => {

  const db = req.app.locals.db;

  const { id } = req.params;

  const sql = `
    DELETE FROM programs
    WHERE id = ?
  `;

  db.query(sql, [id], (err, result) => {

    if (err) {
      console.error("Delete Program Error:", err);

      return res.status(500).json({
        message: "Failed to delete program",
        error: err.message
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Program not found"
      });
    }

    res.json({
      success: true,
      message: "Program deleted successfully"
    });

  });

});


module.exports = router;
