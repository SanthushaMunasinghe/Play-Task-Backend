const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
app.use(express.json());

//Institution
const createInstitution = require("./api/Institution/create-Institution");
const loginInstitution = require("./api/Institution/login-institution");

//Grade
const createGrade = require("./api/Grade/create-grade");

//Term
const createTerm = require("./api/Term/create-term");

//Classroom
const createClassroom = require("./api/Classroom/create-classroom");

//Subject
const createSubject = require("./api/Subject/create-subject");

//Topic
const createTopic = require("./api/Topic/create-topic");

//Subtopic
const createSubTopic = require("./api/Subtopic/create-subtopic");

//Admin
const createAdmin = require("./api/Admin/create-admin");
const loginAdmin = require("./api/Admin/login-admin");

//Teacher
const createTeacher = require("./api/Teacher/create-teacher");
const loginTeacher = require("./api/Teacher/login-teacher");

//Student
const createStudent = require("./api/Student/create-student");

//DB Connect
const dbLink = process.env.DATABASE_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(dbLink, {
      dbName: "playtaskdb",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB();

app.get("/", (req, res) => {
  res.send("Server is running");
});

//Server Setup
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

//Institution
//Create
app.post("/api/institutions", createInstitution);
app.post("/api/institutionlogin", loginInstitution);

//Grade
//Create
app.post("/api/grades", createGrade);

//Term
//Create
app.post("/api/terms", createTerm);

//Classroom
//Create
app.post("/api/classrooms", createClassroom);

//Subject
//Create
app.post("/api/subjects", createSubject);

//Topic
//Create
app.post("/api/topics", createTopic);

//Subtopic
//Create
app.post("/api/subtopics", createSubTopic);

//Admin
//Create
app.post("/api/admins", createAdmin);
app.post("/api/adminlogin", loginAdmin);

//Teacher
//Create
app.post("/api/teachers", createTeacher);
app.post("/api/teacherlogin", loginTeacher);

//Student
//Create
app.post("/api/students", createStudent);
