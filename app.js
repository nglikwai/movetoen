require("dotenv").config();
const express = require("express");
const cors = require("cors");
const WebSocket = require("ws");
const corConfig = require("./config");

const app = express();

const router = require("./router");
const dbConnect = require("./dbConnect");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corConfig));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", `${req.headers.origin}`);
  res.setHeader("Access-Control-Allow-Credentials", "true"); // Allow credentials
  next();
});
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

const wss = new WebSocket.Server({ server });
router(app, wss);
dbConnect();
