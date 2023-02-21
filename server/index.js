var cors = require('cors');
var express = require('express');
const mongoose = require('mongoose');

var todo = require('./routes/todo');

var app = express();
var corsOptions = {
  origin: 'http://localhost:3000',
  credentials:  true
}

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/TodoApp").then(() => {
    console.log('connected to MongoDB')
}).catch((err) => console.log(err));
app.use('/',todo);
const port = 4000;
app.listen(port,()=>{
  console.log(`Server running at Port ${port}`);
});

module.exports = app;