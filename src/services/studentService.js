import * as studentModel from "../models/studentModel.js";

export const fetchAllStudents = async () => {
  return await studentModel.getAllStudents();
};

export const fetchStudentById = async (id) => {
  const student = await studentModel.getStudentById(id);
  if (!student) {
    throw new Error(`Student with ID ${id} not found`);
  }
  return student;
};

export const createStudent = async (studentData) => {
  const { name, age, course } = studentData;
  if (!name || !course) {
    throw new Error("Name and course are required fields");
  }
  return await studentModel.createStudent({ name, age, course });
};

export const updateStudent = async (id, updateData) => {
  const existingStudent = await studentModel.getStudentById(id);
  if (!existingStudent) {
    throw new Error(`Cannot update: Student with ID ${id} not found`);
  }
  return await studentModel.updateStudent(id, updateData);
};

export const removeStudent = async (id) => {
  const existingStudent = await studentModel.getStudentById(id);
  if (!existingStudent) {
    throw new Error(`Cannot delete: Student with ID ${id} not found`);
  }
  return await studentModel.deleteStudent(id);
};