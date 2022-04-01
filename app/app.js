require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const createPath = require("./helpers/create-path");
const authRouter = require("./routes/auth.routes");
const friendRouter = require("./routes/friend.routes");
const authMiddleware = require("./middleware/auth.middleware");
const errorMiddleware = require("./middleware/error.middleware");
const PORT = process.env.PORT;
const db = process.env.MONGO_URL;

mongoose
  .connect(db)
  .then((res) => console.log("mongoDB works"))
  .catch((err) => console.log("mongoDB error"));


app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`Server Listen ${PORT} port`);
});

app.use(express.json()); //json parser
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: [process.env.CLIENT_URL, 'http://localhost:4200', 'http://localhost:8080'],
  })
);
app.use(express.static(__dirname + "/view"));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use("/auth", authRouter);
app.use(friendRouter);
app.use(errorMiddleware);
app.get("/*", (req, res) => {
  const filePath = createPath("index");
  res.sendFile(filePath);
});

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});
