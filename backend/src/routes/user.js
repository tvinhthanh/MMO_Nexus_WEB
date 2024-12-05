const express = require('express');
const { check, validationResult } = require('express-validator');
const connection = require('../config/database'); // Import kết nối MySQL
const verifyToken = require("../middleware/auth");
const User = require('../models/user');
const jwt = require('jsonwebtoken'); // Add this line at the top of your file
const bcrypt = require('bcryptjs'); // Ensure bcrypt is imported as well
const router = express.Router();

// Lấy tất cả người dùng
router.get('/', (req, res) => {
  connection.query('SELECT * FROM users', (err, users) => {
    if (err) {
      return res.status(500).json({ message: 'Lỗi khi lấy người dùng', error: err });
    }
    res.status(200).json(users);
  });
});

// Lấy người dùng theo id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM users WHERE id_user = ?', [id], (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Lỗi khi lấy người dùng', error: err });
    }
    if (user.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }
    res.status(200).json(user[0]);
  });
});

// Thêm người dùng mới
router.post('/', (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const query = 'INSERT INTO users (first_name, last_name, email, password, role, create_at) VALUES (?, ?, ?, ?, ?, ?)';
  const role = 0; // Default role
  const createAt = new Date();

  connection.query(query, [firstName, lastName, email, password, role, createAt], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Lỗi khi thêm người dùng', error: err });
    }
    res.status(201).json({ message: 'Người dùng được tạo thành công', userId: results.insertId });
  });
});

router.post(
  "/register",
  [
    check("firstName", "First Name is required").notEmpty(),
    check("lastName", "Last Name is required").notEmpty(),
    check("email", "Valid Email is required").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({ min: 6 }),
    check("confirmPassword", "Confirm Password is required").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array().map(err => err.msg) });
    }

    const { firstName, lastName, phone, email, password, confirmPassword, address, role } = req.body;

    // Validate if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    try {
      // Check if email already exists (update find method as needed)
      const existingUser = await User.findOne('email', email);  // Ensure User.findOne() is implemented properly
      if (existingUser) {
        return res.status(400).json({ message: "Email is already in use" });
      }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user object
      const newUser = {
        first_name: firstName, // Note: field names must match your DB schema
        last_name: lastName,
        phone,
        email,
        password: hashedPassword,
        role: role || 1,  // Default role if undefined
        address,
        create_at: new Date().toISOString(),
      };

      // Save the new user to the database
      const userId = await User.create(newUser);  // Lưu người dùng vào DB

      // Generate JWT token
      const token = jwt.sign({ userId, role: newUser.role }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });

      // Respond with success
      return res.status(201).json({
        message: "Registration successful",
        token, // Sending token in the response body
      });
    } catch (error) {
      console.error("Error during registration:", error);
      return res.status(500).json({ message: "Something went wrong, please try again." });
    }
  }
);

// Login user endpoint
router.post(
  "/login",
  [
    check("email", "Valid Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const { email, password } = req.body;
    try {
      // Adjust query depending on your actual DB model or ORM
      const userQuery = "SELECT * FROM users WHERE email = ?";
      connection.query(userQuery, [email], async (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Something went wrong" });
        }

        const user = results[0];
        if (!user) {
          return res.status(400).json({ message: "Invalid Credentials" });
        }

        // Compare password with hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ message: "Invalid Credentials" });
        }
        console.log(user)
        // Log userId and userRole before responding
        console.log("User ID: ", user.id_user);
        console.log("User Role: ", user.role);

        // Generate JWT token
        const token = jwt.sign(
          { userId: user.id_user, userRole: user.role }, // Including userRole in the JWT payload
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1d" }
        );

        // Set JWT token as an HttpOnly cookie
        res.cookie("auth_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // Use true for HTTPS in production
          maxAge: 86400000, // 1 day in milliseconds
        });

        // Respond with user data (excluding password) and include userRole
        res.status(200).json({
          userId: user.id,
          userRole: user.role, // Include userRole in the response
          message: `Login successful ${user.id_user} & ${user.role}`,
        });
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);



// Token validation endpoint
router.get("/auth/validate-token", verifyToken, (req, res) => {
// Decode the token and send user info
const token = req.cookies["auth_token"];
const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
res.status(200).json({
  userId: req.userId,
  userRole: req.role,
  token,
});

});
// Cập nhật người dùng
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, password } = req.body;
  const query = 'UPDATE users SET first_name = ?, last_name = ?, email = ?, password = ? WHERE id_user = ?';

  connection.query(query, [firstName, lastName, email, password, id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Lỗi khi cập nhật người dùng', error: err });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng để cập nhật' });
    }
    res.status(200).json({ message: 'Người dùng được cập nhật thành công' });
  });
});

// Xóa người dùng
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  connection.query('DELETE FROM users WHERE id_user = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Lỗi khi xóa người dùng', error: err });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng để xóa' });
    }
    res.status(200).json({ message: 'Người dùng được xóa thành công' });
  });
});

module.exports = router;
