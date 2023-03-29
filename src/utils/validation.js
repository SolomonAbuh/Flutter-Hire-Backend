// utils/validation.js

const { body, validationResult } = require("express-validator");

// Validation rules for user registration
exports.registerValidationRules = () => {
  return [
    body("full_name").notEmpty().withMessage("Full name is required"),
    body("email").isEmail().withMessage("Invalid email").normalizeEmail(),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ];
};

// Validation rules for user login
exports.loginValidationRules = () => {
  return [
    body("email").isEmail().withMessage("Invalid email").normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required"),
  ];
};

// Middleware function to validate input and return errors
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
  return res.status(422).json({
    errors: extractedErrors,
  });
};
