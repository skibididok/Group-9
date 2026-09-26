import pool from "./db.js";

const students = [
  { name: "Juvilyn T. Magante", age: 23, course: "BSCS" },
  { name: "Ma. Ramela Lozano", age: 21, course: "BSCS" },
  { name: "Francis Erika Salem", age: 21, course: "BSCS" },
  { name: "Joricho Cosculla", age: 22, course: "BSCS" },
];

try {
  for (const student of students) {
    await pool.query(
      `INSERT INTO students (name, age, course) VALUES ($1, $2, $3)`,
      [student.name, student.age, student.course]
    );
  }

  console.log("✅ Students added successfully!");
} catch (error) {
  console.error("❌ Failed to add students:");
  console.error(error.message);
} finally {
  await pool.end();
}