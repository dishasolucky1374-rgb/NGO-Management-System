const express = require("express");

const router = express.Router();


// ===============================
// GET OUR STORY
// ===============================
router.get("/", (req, res) => {

  const sql = `
    SELECT *
    FROM our_story
    ORDER BY id ASC
    LIMIT 1
  `;

  req.app.locals.db.query(sql, (err, results) => {

    if (err) {
      console.error("GET STORY ERROR:", err);
      return res.status(500).json({
        success: false,
        message: err.message
      });
    }

    res.json(results);
  });
});


// ===============================
// ADD OUR STORY
// ===============================
router.post("/", (req, res) => {

  console.log("POST STORY BODY:", req.body);

  const { content } = req.body;

  if (!content || !content.trim()) {
    return res.status(400).json({
      success: false,
      message: "Story content is required."
    });
  }

  const sql = `
    INSERT INTO our_story (content)
    VALUES (?)
  `;

  req.app.locals.db.query(sql, [content], (err, result) => {

    if (err) {
      console.error("POST STORY ERROR:", err);

      return res.status(500).json({
        success: false,
        message: err.message
      });
    }

    res.status(201).json({
      success: true,
      message: "Our Story added successfully!",
      id: result.insertId
    });

  });
});


// ===============================
// UPDATE OUR STORY
// ===============================
router.put("/:id", (req, res) => {

  console.log("PUT STORY ID:", req.params.id);
  console.log("PUT STORY BODY:", req.body);

  const { id } = req.params;
  const { content } = req.body;

  if (!content || !content.trim()) {

    return res.status(400).json({
      success: false,
      message: "Story content is required."
    });

  }

  const sql = `
    UPDATE our_story
    SET content = ?
    WHERE id = ?
  `;

  req.app.locals.db.query(
    sql,
    [content, id],
    (err, result) => {

      if (err) {

        console.error("PUT STORY DATABASE ERROR:", err);

        return res.status(500).json({
          success: false,
          message: err.message
        });

      }

      console.log("UPDATE RESULT:", result);

      if (result.affectedRows === 0) {

        return res.status(404).json({
          success: false,
          message: "Our Story record not found."
        });

      }

      res.json({
        success: true,
        message: "Our Story updated successfully!"
      });

    }
  );

});


// ===============================
// DELETE OUR STORY
// ===============================
router.delete("/:id", (req, res) => {

  const { id } = req.params;

  const sql = `
    DELETE FROM our_story
    WHERE id = ?
  `;

  req.app.locals.db.query(sql, [id], (err, result) => {

    if (err) {

      console.error("DELETE STORY ERROR:", err);

      return res.status(500).json({
        success: false,
        message: err.message
      });

    }

    if (result.affectedRows === 0) {

      return res.status(404).json({
        success: false,
        message: "Our Story record not found."
      });

    }

    res.json({
      success: true,
      message: "Our Story deleted successfully!"
    });

  });

});


module.exports = router;
