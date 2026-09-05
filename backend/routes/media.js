const express = require("express");

const router = express.Router();

console.log("MEDIA ROUTES LOADED");

// ======================================================
// PRESS RELEASES
// ======================================================

// GET ALL PRESS RELEASES
router.get("/press-releases", (req, res) => {
  const db = req.app.locals.db;

  const sql = `
    SELECT
      id,
      title,
      description,
      release_date,
      created_at,
      updated_at
    FROM press_releases
    ORDER BY release_date DESC, id DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching press releases:", err);

      return res.status(500).json({
        message: "Failed to fetch press releases"
      });
    }

    res.json(results);
  });
});


// ADD PRESS RELEASE
router.post("/press-releases", (req, res) => {
  const db = req.app.locals.db;

  const {
    title,
    description,
    release_date
  } = req.body;

  if (!title || !description || !release_date) {
    return res.status(400).json({
      message:
        "Title, description and release date are required."
    });
  }

  const sql = `
    INSERT INTO press_releases
    (
      title,
      description,
      release_date
    )
    VALUES (?, ?, ?)
  `;

  db.query(
    sql,
    [
      title.trim(),
      description.trim(),
      release_date
    ],
    (err, result) => {
      if (err) {
        console.error("Error adding press release:", err);

        return res.status(500).json({
          message: "Failed to add press release"
        });
      }

      res.status(201).json({
        message: "Press release added successfully.",
        id: result.insertId
      });
    }
  );
});


// UPDATE PRESS RELEASE
router.put("/press-releases/:id", (req, res) => {
  const db = req.app.locals.db;

  const { id } = req.params;

  const {
    title,
    description,
    release_date
  } = req.body;

  if (!title || !description || !release_date) {
    return res.status(400).json({
      message:
        "Title, description and release date are required."
    });
  }

  const sql = `
    UPDATE press_releases
    SET
      title = ?,
      description = ?,
      release_date = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      title.trim(),
      description.trim(),
      release_date,
      id
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating press release:", err);

        return res.status(500).json({
          message: "Failed to update press release"
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Press release not found"
        });
      }

      res.json({
        message: "Press release updated successfully."
      });
    }
  );
});


// DELETE PRESS RELEASE
router.delete("/press-releases/:id", (req, res) => {
  const db = req.app.locals.db;

  const { id } = req.params;

  const sql = `
    DELETE FROM press_releases
    WHERE id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting press release:", err);

      return res.status(500).json({
        message: "Failed to delete press release"
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Press release not found"
      });
    }

    res.json({
      message: "Press release deleted successfully."
    });
  });
});


// ======================================================
// MEDIA COVERAGE
// ======================================================

// GET ALL MEDIA COVERAGE
router.get("/coverage", (req, res) => {
  const db = req.app.locals.db;

  const sql = `
    SELECT
      id,
      title,
      url,
      created_at,
      updated_at
    FROM media_coverage
    ORDER BY created_at DESC, id DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching media coverage:", err);

      return res.status(500).json({
        message: "Failed to fetch media coverage"
      });
    }

    res.json(results);
  });
});


// ADD MEDIA COVERAGE
router.post("/coverage", (req, res) => {
  const db = req.app.locals.db;

  const {
    title,
    url
  } = req.body;

  if (!title || !url) {
    return res.status(400).json({
      message: "Title and URL are required."
    });
  }

  const sql = `
    INSERT INTO media_coverage
    (
      title,
      url
    )
    VALUES (?, ?)
  `;

  db.query(
    sql,
    [
      title.trim(),
      url.trim()
    ],
    (err, result) => {
      if (err) {
        console.error("Error adding media coverage:", err);

        return res.status(500).json({
          message: "Failed to add media coverage"
        });
      }

      res.status(201).json({
        message: "Media coverage added successfully.",
        id: result.insertId
      });
    }
  );
});


// UPDATE MEDIA COVERAGE
router.put("/coverage/:id", (req, res) => {
  const db = req.app.locals.db;

  const { id } = req.params;

  const {
    title,
    url
  } = req.body;

  if (!title || !url) {
    return res.status(400).json({
      message: "Title and URL are required."
    });
  }

  const sql = `
    UPDATE media_coverage
    SET
      title = ?,
      url = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      title.trim(),
      url.trim(),
      id
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating media coverage:", err);

        return res.status(500).json({
          message: "Failed to update media coverage"
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Media coverage not found"
        });
      }

      res.json({
        message: "Media coverage updated successfully."
      });
    }
  );
});


// DELETE MEDIA COVERAGE
router.delete("/coverage/:id", (req, res) => {
  const db = req.app.locals.db;

  const { id } = req.params;

  const sql = `
    DELETE FROM media_coverage
    WHERE id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting media coverage:", err);

      return res.status(500).json({
        message: "Failed to delete media coverage"
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Media coverage not found"
      });
    }

    res.json({
      message: "Media coverage deleted successfully."
    });
  });
});


// ======================================================
// IMAGE GALLERY
// ======================================================

// GET ALL GALLERY IMAGES
router.get("/gallery", (req, res) => {
  const db = req.app.locals.db;

  const sql = `
    SELECT
      id,
      image_path,
      description,
      uploaded_at
    FROM image_gallery
    ORDER BY uploaded_at DESC, id DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching image gallery:", err);

      return res.status(500).json({
        message: "Failed to fetch image gallery"
      });
    }

    res.json(results);
  });
});


// ADD GALLERY IMAGE
router.post("/gallery", (req, res) => {
  const db = req.app.locals.db;

  const {
    image_path,
    description
  } = req.body;

  if (!image_path) {
    return res.status(400).json({
      message: "Image path or URL is required."
    });
  }

  const sql = `
    INSERT INTO image_gallery
    (
      image_path,
      description
    )
    VALUES (?, ?)
  `;

  db.query(
    sql,
    [
      image_path.trim(),
      description ? description.trim() : null
    ],
    (err, result) => {
      if (err) {
        console.error("Error adding gallery image:", err);

        return res.status(500).json({
          message: "Failed to add gallery image"
        });
      }

      res.status(201).json({
        message: "Gallery image added successfully.",
        id: result.insertId
      });
    }
  );
});


// UPDATE GALLERY IMAGE
router.put("/gallery/:id", (req, res) => {
  const db = req.app.locals.db;

  const { id } = req.params;

  const {
    image_path,
    description
  } = req.body;

  if (!image_path) {
    return res.status(400).json({
      message: "Image path or URL is required."
    });
  }

  const sql = `
    UPDATE image_gallery
    SET
      image_path = ?,
      description = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      image_path.trim(),
      description ? description.trim() : null,
      id
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating gallery image:", err);

        return res.status(500).json({
          message: "Failed to update gallery image"
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Gallery image not found"
        });
      }

      res.json({
        message: "Gallery image updated successfully."
      });
    }
  );
});


// DELETE GALLERY IMAGE
router.delete("/gallery/:id", (req, res) => {
  const db = req.app.locals.db;

  const { id } = req.params;

  const sql = `
    DELETE FROM image_gallery
    WHERE id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting gallery image:", err);

      return res.status(500).json({
        message: "Failed to delete gallery image"
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Gallery image not found"
      });
    }

    res.json({
      message: "Gallery image deleted successfully."
    });
  });
});


// ======================================================
// VIDEOS
// ======================================================

// GET ALL VIDEOS
router.get("/videos", (req, res) => {
  const db = req.app.locals.db;

  const sql = `
    SELECT
      id,
      video_url,
      description,
      uploaded_at
    FROM videos
    ORDER BY uploaded_at DESC, id DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching videos:", err);

      return res.status(500).json({
        message: "Failed to fetch videos"
      });
    }

    res.json(results);
  });
});


// ADD VIDEO
router.post("/videos", (req, res) => {
  const db = req.app.locals.db;

  const {
    video_url,
    description
  } = req.body;

  if (!video_url) {
    return res.status(400).json({
      message: "Video URL is required."
    });
  }

  const sql = `
    INSERT INTO videos
    (
      video_url,
      description
    )
    VALUES (?, ?)
  `;

  db.query(
    sql,
    [
      video_url.trim(),
      description ? description.trim() : null
    ],
    (err, result) => {
      if (err) {
        console.error("Error adding video:", err);

        return res.status(500).json({
          message: "Failed to add video"
        });
      }

      res.status(201).json({
        message: "Video added successfully.",
        id: result.insertId
      });
    }
  );
});


// UPDATE VIDEO
router.put("/videos/:id", (req, res) => {
  const db = req.app.locals.db;

  const { id } = req.params;

  const {
    video_url,
    description
  } = req.body;

  if (!video_url) {
    return res.status(400).json({
      message: "Video URL is required."
    });
  }

  const sql = `
    UPDATE videos
    SET
      video_url = ?,
      description = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      video_url.trim(),
      description ? description.trim() : null,
      id
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating video:", err);

        return res.status(500).json({
          message: "Failed to update video"
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Video not found"
        });
      }

      res.json({
        message: "Video updated successfully."
      });
    }
  );
});


// DELETE VIDEO
router.delete("/videos/:id", (req, res) => {
  const db = req.app.locals.db;

  const { id } = req.params;

  const sql = `
    DELETE FROM videos
    WHERE id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting video:", err);

      return res.status(500).json({
        message: "Failed to delete video"
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Video not found"
      });
    }

    res.json({
      message: "Video deleted successfully."
    });
  });
});


// ======================================================
// EXPORT ROUTER
// ======================================================

module.exports = router;
