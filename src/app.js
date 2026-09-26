import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import studentRoutes from "./routes/studentRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(express.json());

// Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Serve simple frontend
app.use(express.static("public"));

// Public Auth Endpoints
app.use("/auth", authRoutes);

// Protected Student Endpoints
app.use("/students", studentRoutes);

app.get("/", (req, res) => {
  res.json({ message: "server is running" });
});

export default app;