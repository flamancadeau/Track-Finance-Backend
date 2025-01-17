const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user");

// Register user
const register = async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      // Hash the password before saving it
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
  
      const savedUser = await newUser.save();  // Save the user to the database
  
      console.log("New User:", savedUser);  // Log the saved user data
  
      res.status(201).json({
        message: "User registered successfully",
        user: savedUser,
      });
    } catch (err) {
      console.error("Error during registration:", err);
      res.status(500).json({ message: "Registration failed", error: err.message });
    }
  };


const getRegister = async (req, res) => {
  try {
    // Extract user ID from the request parameters
    const { id } = req.params;

    // Fetch the user by ID
    const user = await User.findById(id);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send a successful response with the user
    res.status(200).json({
      message: "User fetched successfully",
      user,
    });
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({
      message: "Failed to fetch user",
      error: err.message,
    });
  }
};

const getAllRegisters = async (req, res) => {
    try {
      // Fetch all users from the database
      const users = await User.find();
  
      // Check if users exist
      if (!users || users.length === 0) {
        return res.status(200).json({
          message: "No users found",
          users: [],
        });
      }
  
      // Send a successful response with all users
      res.status(200).json({
        message: "Users fetched successfully",
        users,
      });
    } catch (err) {
      console.error("Error fetching users:", err);
      res.status(500).json({
        message: "Failed to fetch users",
        error: err.message,
      });
    }
  };
  

// Login user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Login attempt for email:", email);

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found for email:", email);
      return res.status(400).json({ message: "Invalid email or password" });
    }


    // Log user details for verification (exclude full password)
    console.log("User found:", {
      email: user.email,
      passwordHash: user.password
        ? user.password.substring(0, 10) + "..."
        : "N/A",
   
    });

    // Detailed password comparison logging
    console.log("Comparing passwords...");
    console.log("Input password length:", password.length);
    console.log("Stored hash length:", user.password.length);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match result:", isMatch);

    if (!isMatch) {
      console.log("Password mismatch for email:", email);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("Login successful for email:", email);

    // Send the token in response
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
    
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "An error occurred during login. Please try again.",
      error: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  getRegister,
  getAllRegisters,
};