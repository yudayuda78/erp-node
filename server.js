import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import router from "./src/routes/index.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(router);

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint tidak ditemukan" });
});

app.use((error, req, res, next) => {
  console.error(error);
  res
    .status(error.status || 500)
    .json({ message: error.message || "Terjadi kesalahan pada server" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
