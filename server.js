const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
app.use(express.json());

//Institution
const createInstitution = require("./api/Institution/create-Institution");
const loginInstitution = require("./api/Institution/login-institution");
const getInstitution = require("./api/Institution/get-institution");
const updateInstitution = require("./api/Institution/update-institution");

//Grade
const createGrade = require("./api/Grade/create-grade");
const getGrades = require("./api/Grade/get-grades");
const getGrade = require("./api/Grade/get-grade");
const getGradeById = require("./api/Grade/get-grade-byid");
const deleteGrade = require("./api/Grade/delete-grade");

//Term
const createTerm = require("./api/Term/create-term");
const getTerms = require("./api/Term/get-terms");
const getTerm = require("./api/Term/get-term");
const deleteTerm = require("./api/Term/delete.term");

//Classroom
const createClassroom = require("./api/Classroom/create-classroom");
const getClassrooms = require("./api/Classroom/get-classrooms");
const getClassroom = require("./api/Classroom/get-classroom");
const getClassroomById = require("./api/Classroom/get-classroom-byid");

//Subject
const createSubject = require("./api/Subject/create-subject");
const getSubjects = require("./api/Subject/get-subjects");
const getSubject = require("./api/Subject/get-subject");
const getSubjectName = require("./api/Subject/get-subject-name");

//Topic
const createTopic = require("./api/Topic/create-topic");
const getTopics = require("./api/Topic/get-topics");
const getTopic = require("./api/Topic/get-topic");
const getSubjectTopics = require("./api/Topic/get-subject-topics");

//Subtopic
const createSubTopic = require("./api/Subtopic/create-subtopic");
const getSubtopics = require("./api/Subtopic/get-subtopics");
const updateSubtopic = require("./api/Subtopic/update-subtopic");

//Admin
const createAdmin = require("./api/Admin/create-admin");
const loginAdmin = require("./api/Admin/login-admin");
const getAdmin = require("./api/Admin/get-admin");
const getAdmins = require("./api/Admin/get-admins");
const updateAdmin = require("./api/Admin/update-admin");

//Teacher
const createTeacher = require("./api/Teacher/create-teacher");
const loginTeacher = require("./api/Teacher/login-teacher");
const getTeachers = require("./api/Teacher/get-teachers");
const updateTeacher = require("./api/Teacher/update-teacher");

//Student
const createStudent = require("./api/Student/create-student");
const loginStudent = require("./api/Student/login-student");
const getStudents = require("./api/Student/get-students");
const getClassroomStudents = require("./api/Student/get-classroom-students");
const getStudent = require("./api/Student/get-student");
const updateStudent = require("./api/Student/update-student");

//Game
const createGame = require("./api/Game/create-game");
const getGame = require("./api/Game/get-game");
const updateGame = require("./api/Game/update-game");
const submitGame = require("./api/Game/submit-game");
const getGameStudent = require("./api/Game/get-game-student");

//Attempt
const createAttempt = require("./api/Attempt/create-attempt");

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
//Update
app.put("/api/updateinstitution/:id", updateInstitution);

//Grade
//Create
app.post("/api/grades", createGrade);
//Get
app.get("/api/getgrades/:institution", getGrades);
app.get("/api/getgrade/:institution/:number", getGrade);
app.get("/api/getgradebyid/:id", getGradeById);
//Delete
app.delete("/api/deleteGrade/:id", deleteGrade);

//Term
//Create
app.post("/api/terms", createTerm);
//Get
app.get("/api/getterms/:grade", getTerms);
app.get("/api/getterm/:id", getTerm);
//Delete
app.delete("/api/deleteTerm/:id", deleteTerm);

//Classroom
//Create
app.post("/api/classrooms", createClassroom);
//Get
app.get("/api/getclassrooms/:grade", getClassrooms);
app.get("/api/getclassroom/:grade/:name", getClassroom);
app.get("/api/getclassroombyid/:id", getClassroomById);

//Subject
//Create
app.post("/api/subjects", createSubject);
//Get
app.get("/api/getsubjects/:grade", getSubjects);
app.get("/api/getsubject/:subjectid", getSubject);
app.get("/api/getsubjectname/:grade/:name", getSubjectName);

//Topic
//Create
app.post("/api/topics", createTopic);
//Get
app.get("/api/gettopics/:subject/:term", getTopics);
app.get("/api/gettopic/:topicid", getTopic);
app.get("/api/getsubjecttopics/:subject", getSubjectTopics);

//Subtopic
//Create
app.post("/api/subtopics", createSubTopic);
//Get
app.get("/api/getsubtopics/:topic", getSubtopics);
//Update
app.put("/api/updatesubtopic/:topic/:id", updateSubtopic);

//Admin
//Create
app.post("/api/admins", createAdmin);
//Login
app.post("/api/adminlogin", loginAdmin);
//Get
app.get("/api/admin/:id/:type", getAdmin);
app.get("/api/getadmins/:institution", getAdmins);
//Update
app.put("/api/updateadmin/:institution/:id", updateAdmin);

//Teacher
//Create
app.post("/api/teachers", createTeacher);
//Login
app.post("/api/teacherlogin", loginTeacher);
//Get
app.get("/api/getteachers/:institution", getTeachers);
//Update
app.put("/api/updateteacher/:institution/:id", updateTeacher);

//Student
//Create
app.post("/api/students", createStudent);
//Login
app.post("/api/studentlogin", loginStudent);
//Get
app.get("/api/getstudents/:institutionid", getStudents);
app.get("/api/getsclassroomtudents/:classroom", getClassroomStudents);
app.get("/api/getstudent/:id", getStudent);
//Update
app.put("/api/updatestudent/:institution/:id", updateStudent);

//Game
app.post("/api/game", createGame);
app.get("/api/getgame/:teacher/:subtopic", getGame);
app.get("/api/getgamestudent/:subtopic", getGameStudent);
app.put("/api/updategame/:id", updateGame);
app.put("/api/submitgame/:id", submitGame);

//Attempt
app.post("/api/createattempt", createAttempt);
