const express = require("express");

const router = express.Router();


// GET all active initiatives
router.get("/", (req, res) => {
  const db = req.app.locals.db;

  const sql = `
    SELECT * FROM initiatives
    WHERE status = 'active'
    ORDER BY display_order ASC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Error fetching initiatives",
        error: err.message
      });
    }

    res.status(200).json(results);
  });
});


// ADD a new initiative
router.post("/", (req, res) => {
  const db = req.app.locals.db;

  const { title, description, image_url, display_order, status } = req.body;

  const sql = `
    INSERT INTO initiatives
    (title, description, image_url, display_order, status)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      title,
      description,
      image_url,
      display_order || 1,
      status || "active"
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Error adding initiative",
          error: err.message
        });
      }

      res.status(201).json({
        message: "Initiative added successfully",
        id: result.insertId
      });
    }
  );
});


// UPDATE an initiative
router.put("/:id", (req, res) => {
  const db = req.app.locals.db;

  const { id } = req.params;

  const {
    title,
    description,
    image_url,
    display_order,
    status
  } = req.body;

  const sql = `
    UPDATE initiatives
    SET title = ?,
        description = ?,
        image_url = ?,
        display_order = ?,
        status = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      title,
      description,
      image_url,
      display_order,
      status,
      id
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Error updating initiative",
          error: err.message
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Initiative not found"
        });
      }

      res.status(200).json({
        message: "Initiative updated successfully"
      });
    }
  );
});


// DELETE an initiative
router.delete("/:id", (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;

  const sql = "DELETE FROM initiatives WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error deleting initiative",
        error: err.message
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Initiative not found"
      });
    }

    res.status(200).json({
      message: "Initiative deleted successfully"
    });
  });
});

module.exports = router;
