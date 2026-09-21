import express from "express";
import homeRouter from "../modules/home/home.routes.js";
import inventoryRouter from "../modules/inventory/inventory.routes.js";
import authRouter from "../modules/auth/auth.routes.js";

const router = express.Router();

router.use("/", homeRouter);
router.use("/products", inventoryRouter);
router.use("/auth", authRouter);

export default router;
