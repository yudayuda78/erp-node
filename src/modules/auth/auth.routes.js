import { Router } from "express";
import { validationResult } from "express-validator";
import * as authController from "./auth.controller";
import { registerValidation, loginValidation } from "./auth.validation";

const router = Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

router.post("/register", registerValidation, validate, authController.register);
router.post("/login", loginValidation, validate, authController.login);

export default router;
