const express = require("express");

const router = express.Router();

console.log("PROJECTS ROUTES LOADED");

// ======================================================
// GET ALL PROJECTS
// ======================================================

router.get("/", (req, res) => {
  const db = req.app.locals.db;

  const sql = `
    SELECT 
      p.id,
      p.title,
      p.category,
      p.description,
      p.goals,
      p.beneficiaries,
      p.expected_outcomes,
      p.status,
      p.start_date,
      p.end_date,
      p.location,
      p.created_at,
      p.updated_at,
      (
        SELECT pi.image_url
        FROM project_images pi
        WHERE pi.project_id = p.id
        ORDER BY pi.uploaded_at ASC
        LIMIT 1
      ) AS image
    FROM projects p
    ORDER BY p.created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching projects:", err);

      return res.status(500).json({
        message: "Failed to fetch projects"
      });
    }

    res.json(results);
  });
});


// ======================================================
// GET ALL PROJECT IMAGES
// IMPORTANT: Must be before /:id
// ======================================================

router.get("/:id/images", (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;

  const sql = `
    SELECT
      id,
      project_id,
      image_url,
      uploaded_at
    FROM project_images
    WHERE project_id = ?
    ORDER BY uploaded_at ASC
  `;

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Error fetching project images:", err);

      return res.status(500).json({
        message: "Failed to fetch project images"
      });
    }

    res.json(results);
  });
});


// ======================================================
// ADD PROJECT TEAM MEMBER / PARTNER
// ======================================================

router.post("/:id/team", (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;

  const { name, role, type } = req.body;

  if (!name || !role || !type) {
    return res.status(400).json({
      message: "Name, role and type are required."
    });
  }

  const allowedTypes = [
    "Team Member",
    "Community Partner",
    "Supporting Organization"
  ];

  if (!allowedTypes.includes(type)) {
    return res.status(400).json({
      message: "Invalid team member type."
    });
  }

  const sql = `
    INSERT INTO project_team
    (
      project_id,
      name,
      role,
      type
    )
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      id,
      name.trim(),
      role.trim(),
      type
    ],
    (err, result) => {
      if (err) {
        console.error(
          "Error adding project team member:",
          err
        );

        return res.status(500).json({
          message: "Failed to add project team member"
        });
      }

      res.status(201).json({
        message: "Project team member added successfully.",
        id: result.insertId
      });
    }
  );
});


// ======================================================
// GET PROJECT TEAM & PARTNERS
// IMPORTANT: Must be before /:id
// ======================================================

router.get("/:id/team", (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;

  const sql = `
    SELECT
      id,
      project_id,
      name,
      role,
      type,
      created_at
    FROM project_team
    WHERE project_id = ?
    ORDER BY
      CASE
        WHEN type = 'Team Member' THEN 1
        WHEN type = 'Community Partner' THEN 2
        WHEN type = 'Supporting Organization' THEN 3
        ELSE 4
      END,
      id ASC
  `;

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error(
        "Error fetching project team:",
        err
      );

      return res.status(500).json({
        message: "Failed to fetch project team"
      });
    }

    res.json(results);
  });
});


// ======================================================
// UPDATE PROJECT TEAM MEMBER / PARTNER
// ======================================================

router.put("/team/:id", (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;

  const { name, role, type } = req.body;

  if (!name || !role || !type) {
    return res.status(400).json({
      message: "Name, role and type are required."
    });
  }

  const allowedTypes = [
    "Team Member",
    "Community Partner",
    "Supporting Organization"
  ];

  if (!allowedTypes.includes(type)) {
    return res.status(400).json({
      message: "Invalid team member type."
    });
  }

  const sql = `
    UPDATE project_team
    SET
      name = ?,
      role = ?,
      type = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      name.trim(),
      role.trim(),
      type,
      id
    ],
    (err, result) => {
      if (err) {
        console.error(
          "Error updating project team member:",
          err
        );

        return res.status(500).json({
          message: "Failed to update project team member"
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Project team member not found"
        });
      }

      res.json({
        message: "Project team member updated successfully."
      });
    }
  );
});


// ======================================================
// DELETE PROJECT TEAM MEMBER / PARTNER
// ======================================================

router.delete("/team/:id", (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;

  const sql = `
    DELETE FROM project_team
    WHERE id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(
        "Error deleting project team member:",
        err
      );

      return res.status(500).json({
        message: "Failed to delete project team member"
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Project team member not found"
      });
    }

    res.json({
      message: "Project team member deleted successfully."
    });
  });
});


// ======================================================
// GET PROJECT SUCCESS STORIES
// ======================================================

router.get("/:id/success-stories", (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;

  const sql = `
    SELECT
      id,
      project_id,
      title,
      story,
      person_name,
      created_at
    FROM project_success_stories
    WHERE project_id = ?
    ORDER BY created_at DESC
  `;

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error(
        "Error fetching success stories:",
        err
      );

      return res.status(500).json({
        message: "Failed to fetch success stories"
      });
    }

    res.json(results);
  });
});


// ======================================================
// ADD PROJECT SUCCESS STORY
// ======================================================

router.post("/:id/success-stories", (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;

  const {
    title,
    story,
    person_name
  } = req.body;

  if (!title || !story) {
    return res.status(400).json({
      message: "Title and story are required."
    });
  }

  const sql = `
    INSERT INTO project_success_stories
    (
      project_id,
      title,
      story,
      person_name
    )
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      id,
      title.trim(),
      story.trim(),
      person_name ? person_name.trim() : null
    ],
    (err, result) => {
      if (err) {
        console.error(
          "Error adding success story:",
          err
        );

        return res.status(500).json({
          message: "Failed to add success story"
        });
      }

      res.status(201).json({
        message: "Success story added successfully.",
        id: result.insertId
      });
    }
  );
});


// ======================================================
// UPDATE PROJECT SUCCESS STORY
// ======================================================

router.put("/success-stories/:id", (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;

  const {
    title,
    story,
    person_name
  } = req.body;

  if (!title || !story) {
    return res.status(400).json({
      message: "Title and story are required."
    });
  }

  const sql = `
    UPDATE project_success_stories
    SET
      title = ?,
      story = ?,
      person_name = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      title.trim(),
      story.trim(),
      person_name ? person_name.trim() : null,
      id
    ],
    (err, result) => {
      if (err) {
        console.error(
          "Error updating success story:",
          err
        );

        return res.status(500).json({
          message: "Failed to update success story"
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Success story not found"
        });
      }

      res.json({
        message: "Success story updated successfully."
      });
    }
  );
});


// ======================================================
// DELETE PROJECT SUCCESS STORY
// ======================================================

router.delete("/success-stories/:id", (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;

  const sql = `
    DELETE FROM project_success_stories
    WHERE id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(
        "Error deleting success story:",
        err
      );

      return res.status(500).json({
        message: "Failed to delete success story"
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Success story not found"
      });
    }

    res.json({
      message: "Success story deleted successfully."
    });
  });
});


// ======================================================
// GET PROJECT STATISTICS
// ======================================================

router.get("/:id/statistics", (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;

  const sql = `
    SELECT
      id,
      project_id,
      metric_name,
      metric_value,
      metric_unit,
      created_at
    FROM project_statistics
    WHERE project_id = ?
    ORDER BY id ASC
  `;

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error(
        "Error fetching project statistics:",
        err
      );

      return res.status(500).json({
        message: "Failed to fetch project statistics"
      });
    }

    res.json(results);
  });
});


// ======================================================
// GET SINGLE PROJECT
// IMPORTANT: Keep after all /:id/... routes
// ======================================================

router.get("/:id", (req, res) => {
  const db = req.app.locals.db;
  const projectId = req.params.id;

  const sql = `
    SELECT
      p.id,
      p.title,
      p.category,
      p.description,
      p.goals,
      p.beneficiaries,
      p.expected_outcomes,
      p.status,
      p.start_date,
      p.end_date,
      p.location,
      p.created_at,
      p.updated_at,
      (
        SELECT pi.image_url
        FROM project_images pi
        WHERE pi.project_id = p.id
        ORDER BY pi.uploaded_at ASC
        LIMIT 1
      ) AS image
    FROM projects p
    WHERE p.id = ?
  `;

  db.query(sql, [projectId], (err, results) => {
    if (err) {
      console.error(
        "Error fetching project:",
        err
      );

      return res.status(500).json({
        message: "Failed to fetch project"
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "Project not found"
      });
    }

    res.json(results[0]);
  });
});


// ======================================================
// ADD PROJECT
// ======================================================

router.post("/", (req, res) => {
  const db = req.app.locals.db;

  const {
    title,
    category,
    description,
    goals,
    beneficiaries,
    expected_outcomes,
    status,
    start_date,
    end_date,
    location,
    image
  } = req.body;

  if (!title || !description || !status) {
    return res.status(400).json({
      message: "Title, description and status are required."
    });
  }

  const projectSql = `
    INSERT INTO projects
    (
      title,
      category,
      description,
      goals,
      beneficiaries,
      expected_outcomes,
      status,
      start_date,
      end_date,
      location
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    projectSql,
    [
      title.trim(),
      category ? category.trim() : null,
      description.trim(),
      goals ? goals.trim() : null,
      beneficiaries ? beneficiaries.trim() : null,
      expected_outcomes
        ? expected_outcomes.trim()
        : null,
      status,
      start_date || null,
      end_date || null,
      location ? location.trim() : null
    ],
    (err, result) => {
      if (err) {
        console.error(
          "Error adding project:",
          err
        );

        return res.status(500).json({
          message: "Failed to add project"
        });
      }

      const projectId = result.insertId;

      // Add image if provided
      if (image && image.trim()) {
        const imageSql = `
          INSERT INTO project_images
          (
            project_id,
            image_url
          )
          VALUES (?, ?)
        `;

        db.query(
          imageSql,
          [
            projectId,
            image.trim()
          ],
          (imageErr) => {
            if (imageErr) {
              console.error(
                "Error adding project image:",
                imageErr
              );

              return res.status(500).json({
                message:
                  "Project created but image could not be added."
              });
            }

            return res.status(201).json({
              message: "Project added successfully.",
              id: projectId
            });
          }
        );
      } else {
        return res.status(201).json({
          message: "Project added successfully.",
          id: projectId
        });
      }
    }
  );
});


// ======================================================
// UPDATE PROJECT
// ======================================================

router.put("/:id", (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;

  const {
    title,
    category,
    description,
    goals,
    beneficiaries,
    expected_outcomes,
    status,
    start_date,
    end_date,
    location,
    image
  } = req.body;

  if (!title || !description || !status) {
    return res.status(400).json({
      message: "Title, description and status are required."
    });
  }

  const updateSql = `
    UPDATE projects
    SET
      title = ?,
      category = ?,
      description = ?,
      goals = ?,
      beneficiaries = ?,
      expected_outcomes = ?,
      status = ?,
      start_date = ?,
      end_date = ?,
      location = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;

  db.query(
    updateSql,
    [
      title.trim(),
      category ? category.trim() : null,
      description.trim(),
      goals ? goals.trim() : null,
      beneficiaries ? beneficiaries.trim() : null,
      expected_outcomes
        ? expected_outcomes.trim()
        : null,
      status,
      start_date || null,
      end_date || null,
      location ? location.trim() : null,
      id
    ],
    (err, result) => {
      if (err) {
        console.error(
          "Error updating project:",
          err
        );

        return res.status(500).json({
          message: "Failed to update project"
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Project not found"
        });
      }

      // Replace image only if a new image is supplied
      if (image && image.trim()) {
        const deleteImageSql = `
          DELETE FROM project_images
          WHERE project_id = ?
        `;

        db.query(
          deleteImageSql,
          [id],
          (deleteErr) => {
            if (deleteErr) {
              console.error(
                "Error removing old project image:",
                deleteErr
              );

              return res.status(500).json({
                message:
                  "Project updated but old image could not be removed."
              });
            }

            const imageSql = `
              INSERT INTO project_images
              (
                project_id,
                image_url
              )
              VALUES (?, ?)
            `;

            db.query(
              imageSql,
              [
                id,
                image.trim()
              ],
              (imageErr) => {
                if (imageErr) {
                  console.error(
                    "Error updating project image:",
                    imageErr
                  );

                  return res.status(500).json({
                    message:
                      "Project updated but image could not be updated."
                  });
                }

                return res.json({
                  message:
                    "Project updated successfully."
                });
              }
            );
          }
        );
      } else {
        return res.json({
          message: "Project updated successfully."
        });
      }
    }
  );
});


// ======================================================
// DELETE PROJECT
// Deletes all related project content first
// ======================================================

router.delete("/:id", (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;

  // ----------------------------------------------------
  // Delete project images
  // ----------------------------------------------------

  const deleteImagesSql = `
    DELETE FROM project_images
    WHERE project_id = ?
  `;

  db.query(
    deleteImagesSql,
    [id],
    (imageErr) => {
      if (imageErr) {
        console.error(
          "Error deleting project images:",
          imageErr
        );

        return res.status(500).json({
          message: "Failed to delete project images"
        });
      }

      // ------------------------------------------------
      // Delete project team & partners
      // ------------------------------------------------

      const deleteTeamSql = `
        DELETE FROM project_team
        WHERE project_id = ?
      `;

      db.query(
        deleteTeamSql,
        [id],
        (teamErr) => {
          if (teamErr) {
            console.error(
              "Error deleting project team:",
              teamErr
            );

            return res.status(500).json({
              message: "Failed to delete project team"
            });
          }

          // --------------------------------------------
          // Delete success stories
          // --------------------------------------------

          const deleteStoriesSql = `
            DELETE FROM project_success_stories
            WHERE project_id = ?
          `;

          db.query(
            deleteStoriesSql,
            [id],
            (storyErr) => {
              if (storyErr) {
                console.error(
                  "Error deleting success stories:",
                  storyErr
                );

                return res.status(500).json({
                  message:
                    "Failed to delete project success stories"
                });
              }

              // ----------------------------------------
              // Delete project statistics
              // ----------------------------------------

              const deleteStatsSql = `
                DELETE FROM project_statistics
                WHERE project_id = ?
              `;

              db.query(
                deleteStatsSql,
                [id],
                (statsErr) => {
                  if (statsErr) {
                    console.error(
                      "Error deleting project statistics:",
                      statsErr
                    );

                    return res.status(500).json({
                      message:
                        "Failed to delete project statistics"
                    });
                  }

                  // ------------------------------------
                  // Finally delete project
                  // ------------------------------------

                  const deleteProjectSql = `
                    DELETE FROM projects
                    WHERE id = ?
                  `;

                  db.query(
                    deleteProjectSql,
                    [id],
                    (projectErr, result) => {
                      if (projectErr) {
                        console.error(
                          "Error deleting project:",
                          projectErr
                        );

                        return res.status(500).json({
                          message:
                            "Failed to delete project"
                        });
                      }

                      if (result.affectedRows === 0) {
                        return res.status(404).json({
                          message: "Project not found"
                        });
                      }

                      res.json({
                        message:
                          "Project deleted successfully."
                      });
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
  );
});


// ======================================================
// EXPORT ROUTER
// ======================================================

module.exports = router;
