const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

// Login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Login attempt with email:", email); // Debugging log

    // 1. Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found with email:", email); // Debugging log
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Compare the provided password with the stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Invalid password for email:", email); // Debugging log
      return res.status(401).json({ message: "Invalid password" });
    }

    // 3. Generate a JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "your-secret-key", // Ensure JWT_SECRET is set in your .env file
      { expiresIn: "1h" }
    );

    // 4. Return the token
    console.log("Login successful for email:", email); // Debugging log
    return res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Error logging in:", error); // Debugging log
    return res
      .status(500)
      .json({ message: "Error logging in", error: error.message });
  }
};
