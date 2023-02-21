import React,{useState} from 'react'
import AddTask from '../addTask/AddTask'
import TodoList from '../todoList/TodoList'
import profileImg from '../../images/person.jpeg'
import './TodoHeader.css'
const TodoHeader = () => {
  const [open, setOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [openFrom, setOpenFrom] = useState(false);
  return (
    <>
    <div className='profile-img-container'>
    <img src={profileImg} alt="quaid" className='profile-img'></img>
    </div>
    <div className='head'>
      <span>
      <i className="bi bi-list" onClick={()=>{setAddOpen(!addOpen);setOpenFrom(false)}}></i>
      <i className={`bi bi-plus add-icon ${addOpen?"":"add-icon-close"}`} onClick={()=>{setOpenFrom(!openFrom);setOpen(true);}}></i>
      </span>
      <p>Todo Today</p>
      <span className='down_arrow'>
      <i class="bi bi-chevron-down" onClick={()=>{setOpen(!open);setAddOpen(false);setOpenFrom(false)}}></i>
      </span>
    </div>
    <TodoList open={open}/>
    {openFrom && <AddTask/>}
    </>
  )
}

export default TodoHeader
