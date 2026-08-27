const express = require("express");

const router = express.Router();

// GET all banners
router.get("/", (req, res) => {
  const db = req.app.locals.db;

  const sql =
    "SELECT * FROM banners WHERE status = TRUE ORDER BY display_order ASC";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Error fetching banners",
        error: err.message
      });
    }

    res.status(200).json(results);
  });
});


// ADD a new banner
router.post("/", (req, res) => {
  const db = req.app.locals.db;

  const {
    image_url,
    title,
    description,
    display_order,
    status
  } = req.body;

  const sql = `
    INSERT INTO banners
    (image_url, title, description, display_order, status)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      image_url,
      title,
      description,
      display_order || 1,
      status !== undefined ? status : true
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Error adding banner",
          error: err.message
        });
      }

      res.status(201).json({
        message: "Banner added successfully",
        id: result.insertId
      });
    }
  );
});


// UPDATE a banner
router.put("/:id", (req, res) => {
  const db = req.app.locals.db;

  const { id } = req.params;

  const {
    image_url,
    title,
    description,
    display_order,
    status
  } = req.body;

  const sql = `
    UPDATE banners
    SET image_url = ?,
        title = ?,
        description = ?,
        display_order = ?,
        status = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      image_url,
      title,
      description,
      display_order,
      status,
      id
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Error updating banner",
          error: err.message
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Banner not found"
        });
      }

      res.status(200).json({
        message: "Banner updated successfully"
      });
    }
  );
});


// DELETE a banner
router.delete("/:id", (req, res) => {
  const db = req.app.locals.db;

  const { id } = req.params;

  const sql = "DELETE FROM banners WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error deleting banner",
        error: err.message
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Banner not found"
      });
    }

    res.status(200).json({
      message: "Banner deleted successfully"
    });
  });
});

module.exports = router;