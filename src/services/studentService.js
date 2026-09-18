import * as studentModel from "../models/studentModel.js";

// Fetch all students
export const fetchAllStudents = async () => {
  const students = await studentModel.getAllStudents();
  return students;
};

// Fetch single student by ID
export const fetchStudentById = async (id) => {
  const student = await studentModel.getStudentById(id);
  if (!student) {
    throw new Error(`Student with ID ${id} not found`);
  }
  return student;
};

// Create a new student with validation
export const createStudent = async (studentData) => {
  const { name, age, course } = studentData;

  if (!name || !course) {
    throw new Error("Name and course are required fields");
  }

  return await studentModel.addStudent({ name, age, course });
};

// Update an existing student
export const updateStudent = async (id, updateData) => {
  const existingStudent = await studentModel.getStudentById(id);
  if (!existingStudent) {
    throw new Error(`Cannot update: Student with ID ${id} not found`);
  }

  return await studentModel.modifyStudent(id, updateData);
};

// Delete a student
export const removeStudent = async (id) => {
  const existingStudent = await studentModel.getStudentById(id);
  if (!existingStudent) {
    throw new Error(`Cannot delete: Student with ID ${id} not found`);
  }

  return await studentModel.deleteStudent(id);
};