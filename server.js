const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
app.use(express.json());

//Institution
const createInstitution = require("./api/Institution/create-Institution");
const loginInstitution = require("./api/Institution/login-institution");
const getInstitution = require("./api/Institution/get-institution");

//Grade
const createGrade = require("./api/Grade/create-grade");
const getGrade = require("./api/Grade/get-grades");
const deleteGrade = require("./api/Grade/delete-grade");

//Term
const createTerm = require("./api/Term/create-term");
const getTerm = require("./api/Term/get-terms");
const deleteTerm = require("./api/Term/delete.term");

//Classroom
const createClassroom = require("./api/Classroom/create-classroom");
const getClassrooms = require("./api/Classroom/get-classroom");

//Subject
const createSubject = require("./api/Subject/create-subject");
const getSubjects = require("./api/Subject/get-subjects");
const getSubject = require("./api/Subject/get-subject");

//Topic
const createTopic = require("./api/Topic/create-topic");
const getTopics = require("./api/Topic/get-topics");
const getTopic = require("./api/Topic/get-topic");

//Subtopic
const createSubTopic = require("./api/Subtopic/create-subtopic");
const getSubtopics = require("./api/Subtopic/get-subtopics");
const updateSubtopic = require("./api/Subtopic/update-subtopic");

//Admin
const createAdmin = require("./api/Admin/create-admin");
const loginAdmin = require("./api/Admin/login-admin");
const getAdmin = require("./api/Admin/get-admin");

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
//Login
app.post("/api/institutionlogin", loginInstitution);
//Get
app.get("/api/institution/:id/:type", getInstitution);

//Grade
//Create
app.post("/api/grades", createGrade);
//Get
app.get("/api/getgrades/:institution", getGrade);
//Delete
app.delete("/api/deleteGrade/:id", deleteGrade);

//Term
//Create
app.post("/api/terms", createTerm);
//Get
app.get("/api/getterms/:grade", getTerm);
//Delete
app.delete("/api/deleteTerm/:id", deleteTerm);

//Classroom
//Create
app.post("/api/classrooms", createClassroom);
//Get
app.get("/api/getclassrooms/:grade", getClassrooms);

//Subject
//Create
app.post("/api/subjects", createSubject);
//Get
app.get("/api/getsubjects/:grade", getSubjects);
app.get("/api/getsubject/:subjectid", getSubject);

//Topic
//Create
app.post("/api/topics", createTopic);
//Get
app.get("/api/gettopics/:subject/:term", getTopics);
app.get("/api/gettopic/:topicid", getTopic);

//Subtopic
//Create
app.post("/api/subtopics", createSubTopic);
//Get
app.get("/api/getsubtopics/:topic", getSubtopics);
//Update
app.put("/api/updatesubtopic/:id", updateSubtopic);

//Admin
//Create
app.post("/api/admins", createAdmin);
//Login
app.post("/api/adminlogin", loginAdmin);
//Get
app.get("/api/admin/:id/:type", getAdmin);

//Teacher
//Create
app.post("/api/teachers", createTeacher);
//Login
app.post("/api/teacherlogin", loginTeacher);

//Student
//Create
app.post("/api/students", createStudent);
