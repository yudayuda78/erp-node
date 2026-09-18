import express from "express";
import homeRouter from "../modules/home/home.routes.js";
import inventoryRouter from "../modules/inventory/inventory.routes.js";

const router = express.Router();

router.use("/", homeRouter);
router.use("/products", inventoryRouter);

export default router;
