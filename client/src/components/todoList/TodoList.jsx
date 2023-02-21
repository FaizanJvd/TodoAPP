import React, { useState,useEffect } from "react";
import "./TodoList.css";
import Axios from "axios";
import EditTask from "../edittask/EditTask";
const TodoList = (props) => {
  const [todos, setTodos] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [todoData, setTodoData] = useState();
  const getAllTodos = () => {
    Axios.get("http://localhost:4000/getTodos").then((res) => {
      console.log(res.data);
      setTodos(res.data);
    });
  }
  useEffect(() => {
    getAllTodos();
  }, [props.open,openEdit]);

  const deleteTodo = (id) => {
    Axios.delete(`http://localhost:4000/deleteTodo/${id}`).then((res) => {
      getAllTodos();
    });
  }
  const getTodo = (id) => {
    Axios.get(`http://localhost:4000/getTodo/${id}`).then((res) => {
    setTodoData(res.data);
    setOpenEdit(!openEdit);
    });
  }
  const openHandler = () => {
    setOpenEdit(!openEdit);
  }

  return (
    <div className={`task ${props.open ? "close" : ""}`}>
      {todos.map((todo) => (
        <li key={todo._id}>
          <span>{todo.title}</span>
          <div className="dropdown">
            <button>
              <i class="bi bi-three-dots-vertical"></i>
            </button>
            <div class="dropdown-content">
              <i className="bi bi-eye" onClick={()=>{getTodo(todo._id)}}></i><hr/>
              <i className="bi bi-trash" onClick={()=>deleteTodo(todo._id)}></i>
            </div>
          </div>
        </li>
      ))}
      {openEdit &&  <EditTask {...todoData} handler={openHandler}/>}
    </div>
  );
};

export default TodoList;
