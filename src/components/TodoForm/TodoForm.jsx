import { useRef, useEffect } from 'react';

import "./TodoForm.css"

function TodoForm(props) {
  const input = useRef();

  useEffect(() => {
    input.current.focus();
  }, [])

  return (
    <div className="todo-control">
      <form onSubmit={(e) => props.addHandler(e)} className="todo-form-group">
        <input 
          type="text" 
          ref={input}
          value={props.todo}
          onChange={(e) => props.todoHandler(e)} 
          placeholder="Write your Todo here..."
        />
        <button className="btn">Add Todo</button>
      </form>
    </div>
  )
}

export default TodoForm
