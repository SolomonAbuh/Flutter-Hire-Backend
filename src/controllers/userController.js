const User = require("../models/users");

// GET gets all the users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json({ success: true, users });
  } catch (error) {
    next(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET gets users by type job_Seeker / employee
exports.getUsersByUserType = async (req, res) => {
  const user_type = req.params.user_type;
  try {
    const users = await User.find({ userType: user_type }).select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE
exports.deleteUser = async (req, res) => {
  try {
    // Check if special password is provided
    const { password } = req.body;
    if (password !== "4pf") {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Delete user by ID
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
