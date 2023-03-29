const express = require("express");
const router = express.Router();
const {
  registerValidationRules,
  loginValidationRules,
  validate,
} = require("../utils/validation");
const authController = require("../controllers/authController");

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

module.exports = router;
