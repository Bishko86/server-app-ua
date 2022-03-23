require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const createPath = require('./helpers/create-path');
const authRouter = require('./routes/auth.router');
const friendRouter = require("./routes/friend.routes");
const authMiddleware = require('./middleware/authMiddleware');
const PORT = process.env.PORT; 
const db = process.env.MONGO_URL;
 
mongoose
  .connect(db)
  .then((res) => console.log("mongoDB works"))
  .catch((err) => console.log("mongoDB error"));

app.listen(PORT,(error) => {
  error? console.log(error) : console.log(`Server Listen ${PORT} port`);
});

app.use(cors({ origin: '*' }));
app.use(express.json()) //json parser
app.use(express.static(__dirname + '/view'));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use("/auth", authRouter); //listen auth routers
app.use(friendRouter);
app.get('/*', authMiddleware, (req, res) => {
  console.log('TEST', req.user);
  const filePath = createPath('index');
  res.sendFile(filePath)
});

app.use((req, res) => {
  res
  .status(404)
  .sendFile('./views/error.html')
});