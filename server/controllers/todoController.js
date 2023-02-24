const Todo  = require('../models/todoSchema');

module.exports = {
    addTodo : async (req, res) => {
        const { title, status } = req.body;
        if(!title || !status || req.body.length===0){
            return res.status(400).json({message:"Please Enter Title and Status"});
        }
        let date= Date.now();
        let completionTime;
        if(status==="Completed" || status==="completed" || status==="complete"){
            completionTime=date;
        }
        else{
            completionTime=null;
        }
        const todo = new Todo({
            title,
            status,
            completionTime,
            creationTime:date,
        });
        const added = await todo.save();
        if(!added){
            return res.status(400).json({message:"Todo Not Added"});
        }
        return res.status(200).json({message:"Todo Added Successfully"});
    },
    getTodos: async (req, res) => {
        const todos = await Todo.find({},{_id:1,title:1});
        if(!todos){
            return res.status(400).json({message:"No Todos Found"});
        }
        return res.status(200).json(todos);
    },
    getTodo: async (req, res) => {
        const todo = await Todo.findById(req.params.id);
        if(!todo){
            return res.status(400).json({message:"No Todo Found"});
        }
        return res.status(200).json(todo);
    },
    editTodo: async (req, res) => {
        const { id,title, status } = req.body;
        let date= Date.now();
        let completionTime;
        if(status==="Completed" || status==="completed" || status==="complete"){
            completionTime=date;
        }
        else{
            completionTime=null;
        }
        const updated = await Todo.findByIdAndUpdate({_id:id},{$set:{
            title,
            status,
            completionTime,}
        });
        if(!updated){
            return res.status(400).json({message:"Todo Not Updated"});
        }
        return res.status(200).json({message:"Todo Updated Successfully"});
    },
    deleteTodo: async (req, res) => {
        const deleted = await Todo.findByIdAndDelete(req.params.id);
        if(!deleted){
            return res.status(400).json({message:"Todo Not Deleted"});
        }
        return res.status(200).json({message:"Todo Deleted Successfully"});
    }
    
}