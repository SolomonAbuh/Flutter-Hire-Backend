const express = require("express");
const router = express.Router();

const {
  registerValidationRules,
  loginValidationRules,
  validate,
} = require("../utils/validation");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

// POST /auth/register
router.post(
  "/api/signup",
  registerValidationRules(),
  validate,
  authController.signup
);

// POST /auth/login
router.post(
  "/api/signin",
  loginValidationRules(),
  validate,
  authController.signin
);

//Get /get all users
router.get("/api/users", userController.getAllUsers);

//Get /get all users
router.get("/api/userType/:user_type", userController.getUsersByUserType);

// DELETE
router.delete("/api/delete/users/:id", userController.deleteUser);

module.exports = router;
