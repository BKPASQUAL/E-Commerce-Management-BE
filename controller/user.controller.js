const { validationResult } = require("express-validator");
const userService = require("../services/user.service");
const bcrypt = require("bcrypt");

async function registerUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, contactNo, gender, address, username, password } =
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

module.exports = {
  registerUser,
};
