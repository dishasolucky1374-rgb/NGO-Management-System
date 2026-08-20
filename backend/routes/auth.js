const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();

// ==================== REGISTER ====================

router.post("/register", (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Name, email and password are required."
    });
  }

  const checkUser = "SELECT * FROM users WHERE email = ?";

  req.app.locals.db.query(checkUser, [email], async (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Database error."
      });
    }

    if (results.length > 0) {
      return res.status(400).json({
        message: "An account with this email already exists."
      });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const sql = `
        INSERT INTO users (name, email, phone, password)
        VALUES (?, ?, ?, ?)
      `;

      req.app.locals.db.query(
        sql,
        [name, email, phone || null, hashedPassword],
        (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).json({
              message: "Registration failed."
            });
          }

          res.status(201).json({
            message: "Account created successfully!"
          });
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Registration failed."
      });
    }
  });
});


// ==================== LOGIN ====================

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required."
    });
  }

  const sql = "SELECT * FROM users WHERE email = ?";

  req.app.locals.db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Database error."
      });
    }

    if (results.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password."
      });
    }

    const user = results[0];

    try {
      const passwordMatch = await bcrypt.compare(
        password,
        user.password
      );

      if (!passwordMatch) {
        return res.status(401).json({
          message: "Invalid email or password."
        });
      }

      res.json({
        message: "Login successful!",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Login failed."
      });
    }
  });
});

module.exports = router;
