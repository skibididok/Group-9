import app from "./src/app.js";

const PORT = process.env.PORT || 3000;

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception thrown:", err);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});