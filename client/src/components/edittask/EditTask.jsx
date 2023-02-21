import React,{useState} from "react";
import "./EditTask.css";
import Axios from 'axios'
const EditTask = (props) => {
  console.log(props);
    const [todo, setTodo] = useState({
        title: props.title,
        status: props.status,
        completionTime: props.completion_time,
        creationTime: props.creation_time,
      });
      let name, value;
      const handleInput = (e) => {
        name = e.target.name;
        value = e.target.value;
        setTodo({ ...todo, [name]: value });
      };
      const postData = async (e) => {
        e.preventDefault();
        const { title,status } = todo;
        const res = await Axios.put("http://localhost:4000/EditTodo", {
          id:props._id,
          title,
          status,
        });
        const data = await res.data;
        if (res.status === 200) {
          props.handler();
        } 
        if(res.status === 404){
          alert(data.message);
        }
      };
  return (
    <div class="main-box">
      <h2>Task</h2>
      <form onSubmit={postData}>
        <div class="user-box">
          <input type="text" required name="title" onChange={handleInput} value={todo.title}/>
          <label>Title</label>
        </div>
        <div class="user-box">
          <input type="text" required name="status" onChange={handleInput} value={todo.status}/>
          <label>Status</label>
        </div>
        <div class="user-box">
          <input type="text" value={todo.completionTime}/>
          <label>Completion Time</label>
        </div>
        <div class="user-box">
          <input type="text" value={todo.creationTime}/>
          <label>Creation Time</label>
        </div>
        <div class="form-buttons">
          <button className="form-button" type="submit">Edit </button>
        </div>
      </form>
    </div>
  )
}

export default EditTask
