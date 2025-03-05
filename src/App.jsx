import { useState } from 'react'
import './App.css'
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState([])
  const [input, setInputValue] = useState("")
  const [section, setSection] = useState({
    Incomplete: [],
    InProgress: [],
    Complete: []
  });

  const HandleTodo = (event) => {
    setInputValue(event.target.value);
  }

  const HandleInput = (event) => {
    event.preventDefault();
    if(input.trim !== ""){
      setSection({
        ...section, 
        Incomplete: [...section.Incomplete, input]
      });
      setInputValue("");
      console.log(todo);
    }
  }

  const handleDragStart = (event, task, sections) => {
    event.dataTransfer.setData("task", task);
    event.dataTransfer.setData("fromSection", sections);
  }

  const handleDrop = (event, sections) => {
    event.preventDefault();
    const task = event.dataTransfer.getData("task");
    const fromSection = event.dataTransfer.getData("fromSection");

    if(fromSection === sections) return;

    const updateSection = {...section};    
    updateSection[fromSection] = updateSection[fromSection].filter(item => item !== task);
    updateSection[sections].push(task);

    setSection(updateSection);
  }

  const HandleDragOver = (event) => {
    event.preventDefault();
  }

  const HandleDelete = (event, task, sections) => {
    const sectionArray = {...section}
    sectionArray[sections] = sectionArray[sections].filter(item => item !== task)
    setSection(sectionArray)
  }

  console.log(todo);

  return (
    <>
    <div className="container">
      <div className="todolist-container">
        <h1>Add Your Todo</h1>
        <form className="todo-input" onSubmit={HandleInput}>
            <input 
              type="text" 
              name='todo' 
              id='todo' 
              placeholder='Enter Your Todo' 
              value={input} 
              onChange={HandleTodo} 
            />
          <button type='submit' className='todoButton'>
            Enter
          </button>
        </form>

        <div className="todo-sections">
          <div 
            className="incomplete section"
            onDragOver={HandleDragOver}
            onDrop={(event) => handleDrop(event, "Incomplete")}
          >
            <h2>InComplete</h2>
            {section.Incomplete.map((task, index) => (
              <div 
                key={index} 
                className="task"
                draggable
                onDragStart={(event) => handleDragStart(event, task, "Incomplete")}
              >
                <p>{task}</p>
                <span onClick={(event) => HandleDelete(event, task, "Incomplete")}><MdDelete className='delete-icon' /></span>
              </div>
            ))
            }
          </div>

          <div 
            className="inprogress section"
            onDragOver={HandleDragOver}
            onDrop={(event) => handleDrop(event, "InProgress")}
          >
            <h2>Inprogress</h2>
            {section.InProgress.map((task, index) => (
              <div 
                key={index} 
                className="task" 
                draggable
                onDragStart={(event) => handleDragStart(event, task,  'InProgress')}
              >
                <p>{task}</p>
                <span onClick={(event) => HandleDelete(event, task, "InProgress")}><MdDelete className='delete-icon' /></span>
              </div>
            ))}
          </div>

          <div 
            className="complete section"
            onDragOver={HandleDragOver}
            onDrop={(event) => handleDrop(event, "Complete")}
          >
            <h2>Complete</h2>
              {section.Complete.map((task, index) => (
                <div 
                  key={index} 
                  className="task"
                  draggable
                  onDragStart={(event) => handleDragStart(event, task, "Complete")}
                >
                  <p>{task}</p>
                  <span onClick={(event) => HandleDelete(event, task, "Complete")}><MdDelete className='delete-icon' /></span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
