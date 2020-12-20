import { forwardRef } from 'react';

import "./TodoItem.css"

const TodoItem = forwardRef((props, ref) => {
  return (
    <div 
      className={`todo-item ${props.todo.done ? 'done' : ''}`} 
      onDoubleClick={() => props.doneHandler(props.todo.id, props.index)}
      ref={ref}
    >
      <div className="todo-item-content">
        <h3 className="todo-item-title">{props.todo.todo}</h3>
        <div className="todo-item-date">{props.todo.created_at}</div>
      </div>
      <div className="todo-cancel-btn" onClick={() => props.removeHandler(props.todo.id)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#909090">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
    </div>
  )
})

export default TodoItem