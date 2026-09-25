import { Router } from "express";
import {
  createStudent,
  deleteStudent,
  getStudentById,
  getStudents,
  updateStudent,
} from "../controllers/studentController.js";
import {authenticateToken} from "../middlewares/authMiddleware.js"

const router = Router();

router.use(authenticateToken);

router.get("/", getStudents);
router.get("/:id", getStudentById);
router.post("/", createStudent);
router.patch("/:id", updateStudent);
router.delete("/:id", deleteStudent);

export default router;