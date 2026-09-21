import { body, validationResult } from "express-validator";

export const registerValidation = [
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  body("name").isString(),
];

export const loginValidation = [
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
];
