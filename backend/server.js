import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

import { connectDB } from "./db/conn.js";
import productRoutes from "./routes/products.js";
import userRoutes from "./routes/users.js";

dotenv.config();

const app = express();

// Middleware безопасности
app.use(helmet());
app.use(cors());
app.use(express.json());

// Ограничение запросов
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 минута
  max: 10, // Ограничение на 10 запросов от одного IP
});

app.use(limiter);

app.use("/products", productRoutes);
app.use("/", userRoutes);

app.listen(5000, () => {
  connectDB();
  console.log("Сервер запущен на порту 5000");
});
