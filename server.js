const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
app.use(express.json());

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
