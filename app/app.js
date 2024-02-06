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
const errorMiddleware = require("./middleware/error.middleware");
const PORT = process.env.PORT;
const db = process.env.MONGO_URL;

mongoose
  .connect(db)
  .then(() => console.log("mongoDB works"))
  .catch((err) => console.log("mongoDB error", err));


app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`Server Listen ${PORT} port`);
});

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:8080', 'http://localhost:4200']
  })
);

app.use((req, res, next) => {
  res.header('Cache-Control', 'max-age=300');
  next();
});

app.use(express.static(__dirname + "/view"));

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use("/auth", authRouter);

app.use(friendRouter);

app.use(errorMiddleware);

app.use((req, res) => {
  const filePath = createPath("index");
  res.sendFile(filePath);
});
