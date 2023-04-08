const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/users");
const logger = require("../utils/logger");

// Register a new user
exports.signup = async (req, res, next) => {
  try {
    const { email, password, full_name, user_type } = req.body;

    // Check if user with same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with same email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      email,
      password: hashedPassword,
      full_name,
      user_type,
    });
    await user.save();

    logger.info(`New user registered: ${user.email}`);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

// Login a user
exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user with provided email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    // Compare password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, "passwordKey");

    logger.info(`User logged in: ${user.email}`);

    console.log(token);
    res.status(200).json({
      message: "User logged in successfully",
      token,
      user: {
        _id: user._id,
        email: user.email,
        full_naame: user.full_name,
        user_type: user.user_type,
      },
    });
  } catch (error) {
    console.log(`${error} is saying this`);
    next(error);
  }
};

// JWT token validator middleware
exports.jwtValidator = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header("x-auth-token");

    // Verify token
    const decoded = jwt.verify(token, "passwordKey");

    const userId = decoded["userId"];

    // Find user with token and token value in the user's token array
    const user = await User.findById(userId);

    if (!user) {
      logger.error("Invalid token - user not found");
      return res.status(401).json({ error: "Invalid token" });
    } else {
      res.status(200).json({ message: "Valid token" });
    }

    // Add user and token to request object
    // req.user = user;
    // req.token = token;

    // next();
  } catch (error) {
    logger.error(`Error validating token: ${error.message}`);
    return res.status(401).json({ error: "Invalid token" });
  }
};
