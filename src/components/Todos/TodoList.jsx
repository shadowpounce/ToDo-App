import styles from './TodoList.module.css'
import Todo from './Todo'
import { FaTasks } from 'react-icons/fa'

const TodoList = ({ todos, deleteTodo, toggleTodo, editTodo }) => {
  return (
    <div className={styles.todoList}>
      {todos.length !== 0 ? (
        todos.map((todo) => (
          <Todo
            editTodo={editTodo}
            toggleTodo={toggleTodo}
            id={todo.id}
            todos={todos}
            deleteTodo={deleteTodo}
            key={todo.id}
            todo={todo}
          />
        ))
      ) : (
        <h2 className={styles.todoNone}>
          No todos yet. <FaTasks />{' '}
        </h2>
      )}
    </div>
  )
}

export default TodoList
