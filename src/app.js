import express from "express";
import studentRoutes from "./routes/studentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { authenticateToken } from "./middlewares/authMiddleware.js";

const app = express();

app.use(express.json());

// Public Auth Endpoints
app.use("/auth", authRoutes);

// Protected Student Endpoints
app.use("/students", authenticateToken, studentRoutes);

app.get("/", (req, res) => {
  res.json({ message: "server is running" });
});

export default app;