import * as studentService from "../services/studentService.js";

export const getStudents = async (req, res) => {
  try {
    const students = await studentService.fetchAllStudents();
    res.json(students);
  } catch (error) {
    console.error("Error in getStudents:", error.message);
    res.status(500).json({ message: "Failed to fetch students", error: error.message });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const student = await studentService.fetchStudentById(req.params.id);
    res.json(student);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createStudent = async (req, res) => {
  try {
    const newStudent = await studentService.createStudent(req.body);
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const updatedStudent = await studentService.updateStudent(req.params.id, req.body);
    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await studentService.removeStudent(req.params.id);
    res.json({ message: "Student deleted successfully", student: deletedStudent });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};