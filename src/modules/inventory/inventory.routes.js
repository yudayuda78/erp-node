import { Router } from "express";
import { listProducts, detailProduct } from "./inventory.controller.js";

const router = Router();

router.get("/", listProducts);
router.get("/:id", detailProduct);

export default router;
