const Todo  = require('../models/todoSchema');

module.exports = {
    addTodo : async (req, res) => {
        const { title, status } = req.body;
        let date= new Date().toLocaleString();
        if(status==="Completed"){
            var completion_time=date;
        }
        else{
            var completion_time="--:--:--";
        }
        const todo = new Todo({
            title,
            status,
            completion_time,
            creation_time:date,
        });
        await todo.save();
        res.status(200).json({message:"Todo Added Successfully"});
    },
    getTodos: async (req, res) => {
        const todos = await Todo.find({},{_id:1,title:1});
        res.status(200).json(todos);
    },
    getTodo: async (req, res) => {
        const todo = await Todo.findById(req.params.id);
        res.status(200).json(todo);
    },
    editTodo: async (req, res) => {
        const { id,title, status } = req.body;
        let date= new Date().toLocaleString();
        if(status==="Completed"){
            var completion_time=date;
        }
        else{
            var completion_time="--:--:--";
        }
        await Todo.findByIdAndUpdate({_id:id},{$set:{
            title,
            status,
            completion_time,}
        });
        res.status(200).json({message:"Todo Updated Successfully"});
    },
    deleteTodo: async (req, res) => {
        await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"Todo Deleted Successfully"});
    }
    
}