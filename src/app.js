import express from 'express';

const students = [
{
    id: 1, 
    name: "Juvilyn T. Magante"
    age: 22,
    course: "Computer Science"
}
]


const app = express();

app.use(express.json());

// GET: Retrieve all students
app.get("/students", (req, res) => {
    res.send(students);
    //get owners balance

    //check if has enough balance

    //if enough balance, then send if not cancel
});

// POST: Add a new student
app.post("/students", (req, res) => {
    const newStudent = req.body;
    students = [...students, newStudent];
    res.status(201).send(newStudent);
});

// PATCH: Update a student by index
app.patch("/students/:index", (req, res) => {
    const studentIndex = parseInt(req.params.index, 10);
    const updatedStudentData = req.body;

    if (isNaN(studentIndex) || !students[studentIndex]) {
        return res.status(404).send({ message: "Student not found" });
    }

    students[studentIndex] = { ...students[studentIndex], ...updatedStudentData };
    res.send(students[studentIndex]);
});

// DELETE: Delete a student by index
app.delete("/students/:index", (req, res) => {
    const studentIndex = parseInt(req.params.index, 10);

    if (isNaN(studentIndex) || !students[studentIndex]) {
        return res.status(404).send({ message: "Student not found" });
    }

    const deletedStudent = students.splice(studentIndex, 1);
    res.send({ message: "Student deleted successfully", student: deletedStudent[0] });
});

export default app;

