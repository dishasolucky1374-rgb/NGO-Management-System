const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();


// ======================================================
// REGISTER
// ======================================================

router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Name, email and password are required."
    });
  }

  // Check if user already exists
  const checkUser = `
    SELECT id
    FROM users
    WHERE email = ?
  `;

  req.app.locals.db.query(
    checkUser,
    [email],
    async (err, results) => {

      if (err) {
        console.error("Error checking user:", err);

        return res.status(500).json({
          message: "Database error."
        });
      }

      if (results.length > 0) {
        return res.status(400).json({
          message: "User already exists with this email."
        });
      }

      try {

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        const sql = `
          INSERT INTO users
          (name, email, password, role)
          VALUES (?, ?, ?, ?)
        `;

        req.app.locals.db.query(
          sql,
          [name, email, hashedPassword, "user"],
          (err, result) => {

            if (err) {
              console.error("Registration error:", err);

              return res.status(500).json({
                message: "Registration failed."
              });
            }

            return res.status(201).json({
              message: "Registration successful!",
              user: {
                id: result.insertId,
                name: name,
                email: email,
                role: "user"
              }
            });

          }
        );

      } catch (error) {

        console.error("Password hashing error:", error);

        return res.status(500).json({
          message: "Registration failed."
        });

      }

    }
  );
});


// ======================================================
// LOGIN
// ======================================================

router.post("/login", (req, res) => {

  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required."
    });
  }

  // Get user including role
  const sql = `
    SELECT id, name, email, password, role
    FROM users
    WHERE email = ?
  `;

  req.app.locals.db.query(
    sql,
    [email],
    async (err, results) => {

      if (err) {
        console.error("Login database error:", err);

        return res.status(500).json({
          message: "Database error."
        });
      }

      // User not found
      if (results.length === 0) {
        return res.status(401).json({
          message: "Invalid email or password."
        });
      }

      const user = results[0];

      try {

        // Compare password
        const passwordMatch = await bcrypt.compare(
          password,
          user.password
        );

        if (!passwordMatch) {
          return res.status(401).json({
            message: "Invalid email or password."
          });
        }

        // Successful login
        return res.json({
          message: "Login successful!",

          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          }
        });

      } catch (error) {

        console.error(
          "Password comparison error:",
          error
        );

        return res.status(500).json({
          message: "Login failed."
        });

      }

    }
  );
});


// ======================================================
// RESET PASSWORD
// ======================================================

router.post("/reset-password", async (req, res) => {

  const { email, newPassword } = req.body;

  // Validation
  if (!email || !newPassword) {
    return res.status(400).json({
      message: "Email and new password are required."
    });
  }

  try {

    // Hash new password
    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    const sql = `
      UPDATE users
      SET password = ?
      WHERE email = ?
    `;

    req.app.locals.db.query(
      sql,
      [hashedPassword, email],
      (err, result) => {

        if (err) {
          console.error(
            "Password reset error:",
            err
          );

          return res.status(500).json({
            message: "Password reset failed."
          });
        }

        // Email doesn't exist
        if (result.affectedRows === 0) {
          return res.status(404).json({
            message: "User not found."
          });
        }

        return res.json({
          message: "Password reset successfully!"
        });

      }
    );

  } catch (error) {

    console.error(
      "Password hashing error:",
      error
    );

    return res.status(500).json({
      message: "Password reset failed."
    });

  }

});


// ======================================================
// EXPORT ROUTER
// ======================================================

module.exports = router;
