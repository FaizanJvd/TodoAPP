var express = require('express');
var router = express.Router();
const control = require('../controllers/todoController');

router.post('/todos',control.addTodo);
router.get('/todos',control.getTodos);
router.get('/todos/:id',control.getTodo);
router.put('/todos',control.editTodo);
router.delete('/todos/:id',control.deleteTodo);

module.exports = router;