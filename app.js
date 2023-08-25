require('dotenv').config();
const express = require("express");
const cors = require('cors')
const mongoose = require("mongoose");
const todoController = require("./src/modules/todo/todo.controller");
const loggerController = require("./src/modules/logger/logger.controller");


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ['http://127.0.0.1:5500', 'https://movetoen.com', 'https://api.dse00.com:80', 'http://localhost:5500'],
}))

mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use("/todos", todoController);
app.use("/loggers", loggerController);


const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


