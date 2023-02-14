import React ,{useState, useRef, useEffect} from "react";
import TodoList from "./TodoList";
import {v4 as uuidv4} from 'uuid';
import './app.css';

const LOCAL_STORAGE_KEY ='todoApp.todoes'
function App() {
  const [todos, setTodoes]=useState([])
  const ToDoNameRef = useRef()

  useEffect(()=>{
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos){
      setTodoes(storedTodos)
    }
  },[])

  function handleClearTodos(){
    const newTodos = todos.filter(todos => !todos.complete)
    setTodoes(newTodos)
  }

  function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id===id)
    todo.complete = !todo.complete
    setTodoes(newTodos)
  }

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  },[todos])

  function handleAddToDo(e){
    const name = ToDoNameRef.current.value
    if(name==='')return 
    setTodoes(prevTodo=>{
        return [...prevTodo,{id:uuidv4(),name:name,complete:false}]
      })
      ToDoNameRef.current.value=null
    }
    
  return (
    <>
     <div className="division">
        <div className="todolist">
            <TodoList todos={todos} toggleTodo={toggleTodo}/>
        </div>
        <div className="input">
            <input placeholder="Enter your Todos" ref={ToDoNameRef}></input>
            <br/>
        </div>
        <div>
            <button onClick={handleAddToDo} className='add'>ADD</button>
            <br/>
            <button className="clear" onClick={handleClearTodos}>clear completd</button>
        </div>
        <div className="left">{todos.filter(todo => !todo.complete).length} left to do</div>
     </div>
    </>
  )
}

export default App;