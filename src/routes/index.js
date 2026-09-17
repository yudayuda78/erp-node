import express from "express";
import homeRouter from "../modules/home/home.routes.js";

const router = express.Router();
router.use("/", homeRouter);

export default router;
