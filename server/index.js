var cors = require('cors');
var express = require('express');

require('./database/databaseConnection')
var todo = require('./routes/todo');

var app = express();
var corsOptions = {
  origin: 'http://localhost:3000',
  credentials:  true
}

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/',todo);
const port = 4000;
app.listen(port,()=>{
  console.log(`Server running at Port ${port}`);
});

module.exports = app;