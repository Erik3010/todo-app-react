import { useState, useEffect, useRef } from 'react';

// import components
import TodoForm from "../TodoForm/TodoForm.jsx"
import TodoItem from "../TodoItem/TodoItem.jsx"

// import helpers
import { formatDate, generateID } from "../../helpers";

// import CSS
import "./Todo.css"

function Todo() {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem('react_todos')) || []
  )
  const [todo, setTodo] = useState('')
  const todoContainer = useRef()
  const todoItemsRef = useRef([])

  const todoChangeHandler = (e) => {
    setTodo(e.target.value)
  }

  const todoAddHandler = (e) => {
    e.preventDefault()

    if(!todo) return;
    let newTodo = {
      todo,
      created_at: formatDate(),
      id: generateID(todos),
      done: false
    }

    setTodos([newTodo, ...todos])
    setTodo('')
  }

  const todoRemoveItem = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const calculateAnimationTop = (index) => {
    let { offsetTop: containerTop, offsetHeight: containerHeight } = todoContainer.current
    let { offsetTop: currentTop } = todoItemsRef.current[index]
    let top = currentTop - containerTop

    document.querySelector('body').style.setProperty('--top', `-${containerHeight - top}px`);
  }

  const todoDoneHandler = (id, index) => {
    const target = todos.find(todo => todo.id === id);
    // if(target.done) return;
    target.done = !target.done;
    
    let filteredTodo = todos.filter(todo => todo.id !== id);
    setTodos([...filteredTodo, target])

    calculateAnimationTop(index);
  }

  useEffect(() => {
    localStorage.setItem('react_todos', JSON.stringify(todos))
    todoItemsRef.current = todoItemsRef.current.slice(0, todos.length);
  }, [todos])

  return (
    <div className="todo-container">
      <TodoForm 
        todoHandler={todoChangeHandler} 
        addHandler={todoAddHandler} 
        todo={todo}
      />
      <div className="todo-items" ref={todoContainer}>
        { 
          todos.map((todo, index) => {
            return (
              <TodoItem
                index={index}
                key={todo.id}
                todo={todo} 
                ref={el => todoItemsRef.current[index] = el}
                doneHandler={todoDoneHandler} 
                removeHandler={todoRemoveItem} 
              />
            )
          }) 
        }
      </div>
    </div>
  )
}

export default Todo
