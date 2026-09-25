import express from "express";
import studentRoutes from "./routes/studentRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(express.json());

// Public Auth Endpoints
app.use("/auth", authRoutes);

// Protected Student Endpoints
app.use("/students", studentRoutes);

app.get("/", (req, res) => {
  res.json({ message: "server is running" });
});

export default app;