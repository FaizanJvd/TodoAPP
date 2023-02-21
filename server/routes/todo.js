var express = require('express');
var router = express.Router();
const control = require('../controllers/todoController');

router.post('/addTodo',control.addTodo);
router.get('/getTodos',control.getTodos);
router.get('/getTodo/:id',control.getTodo);
router.put('/editTodo',control.editTodo);
router.delete('/deleteTodo/:id',control.deleteTodo);

module.exports = router;