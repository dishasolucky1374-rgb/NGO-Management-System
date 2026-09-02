const express = require("express");

const router = express.Router();


// ===============================
// GET ALL TEAM MEMBERS
// ===============================
router.get("/", (req, res) => {

  const db = req.app.locals.db;

  const sql = `
    SELECT *
    FROM team_members
    ORDER BY id ASC
  `;

  db.query(sql, (err, results) => {

    if (err) {
      console.error("Team Members Error:", err);

      return res.status(500).json({
        message: "Failed to fetch team members"
      });
    }

    res.json(results);

  });

});


// ===============================
// ADD TEAM MEMBER
// ===============================
router.post("/", (req, res) => {

  const db = req.app.locals.db;

  console.log("ADD TEAM MEMBER:", req.body);

  const { name, role, image_url } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({
      message: "Name is required"
    });
  }

  if (!role || !role.trim()) {
    return res.status(400).json({
      message: "Role is required"
    });
  }

  const sql = `
    INSERT INTO team_members (name, role, image_url)
    VALUES (?, ?, ?)
  `;

  db.query(
    sql,
    [
      name.trim(),
      role.trim(),
      image_url ? image_url.trim() : ""
    ],
    (err, result) => {

      if (err) {
        console.error("Add Team Member Error:", err);

        return res.status(500).json({
          message: "Failed to add team member",
          error: err.message
        });
      }

      res.status(201).json({
        success: true,
        message: "Team member added successfully",
        id: result.insertId
      });

    }
  );

});


// ===============================
// UPDATE TEAM MEMBER
// ===============================
router.put("/:id", (req, res) => {

  const db = req.app.locals.db;

  const { id } = req.params;
  const { name, role, image_url } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({
      message: "Name is required"
    });
  }

  if (!role || !role.trim()) {
    return res.status(400).json({
      message: "Role is required"
    });
  }

  const sql = `
    UPDATE team_members
    SET name = ?, role = ?, image_url = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      name.trim(),
      role.trim(),
      image_url ? image_url.trim() : "",
      id
    ],
    (err, result) => {

      if (err) {
        console.error("Update Team Member Error:", err);

        return res.status(500).json({
          message: "Failed to update team member",
          error: err.message
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Team member not found"
        });
      }

      res.json({
        success: true,
        message: "Team member updated successfully"
      });

    }
  );

});


// ===============================
// DELETE TEAM MEMBER
// ===============================
router.delete("/:id", (req, res) => {

  const db = req.app.locals.db;

  const { id } = req.params;

  const sql = `
    DELETE FROM team_members
    WHERE id = ?
  `;

  db.query(sql, [id], (err, result) => {

    if (err) {
      console.error("Delete Team Member Error:", err);

      return res.status(500).json({
        message: "Failed to delete team member",
        error: err.message
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Team member not found"
      });
    }

    res.json({
      success: true,
      message: "Team member deleted successfully"
    });

  });

});


module.exports = router;
