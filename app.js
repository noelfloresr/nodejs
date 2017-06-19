const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//global local const
const port = 3000;

//Routes to Middleware
const users = require('./api/routes/users');
const students = require('./api/routes/students');

//Connection to db
mongoose.connect('mongodb://localhost/test');
let db = mongoose.connection;
db.on('error', (err)=>{
  console.log("Datbase error connection: " + err);
});

db.once('open', ()=>{
  console.log("Connected to DB");
});

//Assig express to variable
const app = express();

//Assign directory where htmls files will be stored
app.use(express.static(path.join(__dirname, 'public')));

//Parse incoming request body to Json before handler it (req.body.x)
app.use(bodyParser.json());

//call Routers
app.use('/api/students/', students);

app.get('/', (req, res)=>{
  res.render('public/index.html');
})

//listing in a specific Port number
app.listen(port, ()=>{
  console.log('listing on port: ' + port);
})
