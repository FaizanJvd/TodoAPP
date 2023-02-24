const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/TodoApp").then(() => {
    console.log('connected to MongoDB')
}).catch((err) => console.log(err));
