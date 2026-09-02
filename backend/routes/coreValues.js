const express = require("express");
const router = express.Router();

// GET ALL CORE VALUES
router.get("/", (req, res) => {
  const db = req.app.locals.db;

  db.query(
    "SELECT * FROM core_values ORDER BY id ASC",
    (err, results) => {
      if (err) {
        console.error("GET Core Values Error:", err);
        return res.status(500).json({
          message: "Failed to fetch core values"
        });
      }

      res.json(results);
    }
  );
});

// ADD CORE VALUE
router.post("/", (req, res) => {
  console.log("POST /api/about/core-values");
  console.log("Received body:", req.body);

  const { value } = req.body;

  if (!value || !value.trim()) {
    return res.status(400).json({
      message: "Core value is required"
    });
  }

  const db = req.app.locals.db;

  const sql = "INSERT INTO core_values (value) VALUES (?)";

  db.query(sql, [value.trim()], (err, result) => {
    if (err) {
      console.error("ADD Core Value Error:", err);

      return res.status(500).json({
        message: "Failed to add core value",
        error: err.message
      });
    }

    console.log("Core value added:", result.insertId);

    res.status(201).json({
      message: "Core value added successfully",
      id: result.insertId
    });
  });
});

// UPDATE CORE VALUE
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { value } = req.body;

  if (!value || !value.trim()) {
    return res.status(400).json({
      message: "Core value is required"
    });
  }

  const db = req.app.locals.db;

  db.query(
    "UPDATE core_values SET value = ? WHERE id = ?",
    [value.trim(), id],
    (err, result) => {
      if (err) {
        console.error("UPDATE Core Value Error:", err);

        return res.status(500).json({
          message: "Failed to update core value"
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Core value not found"
        });
      }

      res.json({
        message: "Core value updated successfully"
      });
    }
  );
});

// DELETE CORE VALUE
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const db = req.app.locals.db;

  db.query(
    "DELETE FROM core_values WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.error("DELETE Core Value Error:", err);

        return res.status(500).json({
          message: "Failed to delete core value"
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Core value not found"
        });
      }

      res.json({
        message: "Core value deleted successfully"
      });
    }
  );
});

module.exports = router;
