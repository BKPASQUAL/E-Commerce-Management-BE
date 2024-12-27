const { validationResult } = require("express-validator");
const userService = require("../services/user.service");
const bcrypt = require("bcrypt");

async function registerUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, contactNo, gender, address, username,role, password } =
    req.body;

  try {
    // Check if user already exists
    const userExists = await userService.findUserByEmail(email);
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the user
    const newUser = {
      name,
      email,
      contactNo,
      gender,
      address,
      username,
      role,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await userService.createUser(newUser);

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error in registerUser:", error);
    return res
      .status(500)
      .json({ message: "Server error during registration" });
  }
}

const jwt = require("jsonwebtoken");

async function loginUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await userService.findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Verify password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "6h" } // Token expiry time
    );

    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error in loginUser:", error);
    return res.status(500).json({ message: "Server error during login" });
  }
}

// Get all Users
async function getAllUsers(req, res) {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json({ users });
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    return res.status(500).json({ message: "Server error while retrieving users" });
  }
}

module.exports = {
  registerUser,
  loginUser,
  getAllUsers
};
