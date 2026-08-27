const express = require("express");

const router = express.Router();


// GET all statistics
router.get("/", (req, res) => {
  const db = req.app.locals.db;

  const sql = `
    SELECT * FROM statistic
    WHERE status = 'active'
    ORDER BY display_order ASC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Error fetching statistics",
        error: err.message
      });
    }

    res.status(200).json(results);
  });
});


// ADD a statistic
router.post("/", (req, res) => {
  const db = req.app.locals.db;

  const { label, value, display_order, status } = req.body;

  const sql = `
    INSERT INTO statistic
    (label, value, display_order, status)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      label,
      value,
      display_order || 1,
      status || "active"
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Error adding statistic",
          error: err.message
        });
      }

      res.status(201).json({
        message: "Statistic added successfully",
        id: result.insertId
      });
    }
  );
});


// UPDATE a statistic
router.put("/:id", (req, res) => {
  const db = req.app.locals.db;

  const { id } = req.params;
  const { label, value, display_order, status } = req.body;

  const sql = `
    UPDATE statistic
    SET label = ?,
        value = ?,
        display_order = ?,
        status = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [label, value, display_order, status, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Error updating statistic",
          error: err.message
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Statistic not found"
        });
      }

      res.status(200).json({
        message: "Statistic updated successfully"
      });
    }
  );
});


// DELETE a statistic
router.delete("/:id", (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;

  const sql = "DELETE FROM statistic WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error deleting statistic",
        error: err.message
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Statistic not found"
      });
    }

    res.status(200).json({
      message: "Statistic deleted successfully"
    });
  });
});


module.exports = router;