require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const createPath = require('./helpers/create-path');
const authRouter = require('./routes/auth.router');
const friendRouter = require("./routes/friend.routes");
const PORT = process.env.PORT || 3000; 
const db =
  "mongodb+srv://RomanUA:fsX5sbtfrLEUSpP@cluster0.k9f32.mongodb.net/ngrx-auth-db?retryWrites=true&w=majority";

mongoose
  .connect(db)
  .then((res) => console.log("mongoDB works"))
  .catch((err) => console.log("mongoDB error"));

app.listen(PORT,(error) => {
  error? console.log(error) : console.log(`Server Listen ${PORT} port`);
});

app.use(cors({ origin: '*' }));
app.use(express.json()) //json parser
app.use(express.static(__dirname + '/angular-ngrx'));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use("/auth", authRouter); //listen auth routers
app.use(friendRouter);

app.get('/*', (req, res) => {
  const filePath = createPath('index');
  res.sendFile(filePath)
});

app.use((req, res) => {
  res
  .status(404)
  .sendFile('./views/error.html')
});