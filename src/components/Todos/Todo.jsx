import { useState } from 'react'
import styles from './Todo.module.css'
import { MdAddTask, MdDoneAll } from 'react-icons/md'
import { RiDeleteBinLine } from 'react-icons/ri'
import { AiTwotoneEdit } from 'react-icons/ai'

const Todo = ({ todo, deleteTodo, todos, id, toggleTodo, editTodo }) => {
  const [isReadOnly, setIsReadOnly] = useState(true)
  const [todoText, setTodoText] = useState(todo.text)
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div
      className={
        todo.isCompleted ? `${styles.todoCompleted}` : `${styles.todo}`
      }
    >
      <div className="flex gap-3">
        <MdAddTask
          onClick={() => {
            toggleTodo(id)
          }}
          className={styles.todoIcon}
        />
        <input
          className={styles.todoOutput}
          type="text"
          value={todoText}
          readOnly={isReadOnly}
          onChange={
            isReadOnly === false
              ? (event) => {
                  setTodoText(event.target.value)
                }
              : void 0
          }
        />
      </div>

      <div className="flex gap-3 items-center">
        {isReadOnly && (
          <AiTwotoneEdit
            onClick={() => {
              setIsReadOnly(false)
            }}
            className={styles.todoEditIcon}
          />
        )}

        {!isReadOnly && (
          <MdDoneAll
            onClick={() => {
              editTodo(id, todoText)
              setIsReadOnly(true)
            }}
            className={styles.todoIcon}
          />
        )}

        <RiDeleteBinLine
          onClick={() => {
            deleteTodo(id)
          }}
          className={styles.todoDeleteIcon}
        />
      </div>
    </div>
  )
}

export default Todo
