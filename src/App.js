import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './App.css'
import TodoForm from './components/Todos/TodoForm'
import TodoList from './components/Todos/TodoList'
import TodosActions from './components/Todos/TodosActions'

function App() {
  const [todos, setTodos] = useState(
    localStorage.getItem('todos')
      ? JSON.parse(localStorage.getItem('todos'))
      : []
  )

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodoHandler = (text) => {
    const newTodo = {
      text: text,
      isCompleted: false,
      id: uuidv4(),
    }
    console.log(newTodo)
    setTodos([...todos, newTodo])
  }

  const deleteTodoHandler = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const editTodoHandler = (id, text) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: text } : { ...todo }
      )
    )
  }

  const deleteCompletedTodoHandler = () => {
    setTodos(todos.filter((todo) => todo.isCompleted !== true))
  }

  const cleartTodosHandler = () => {
    setTodos([])
  }

  const toggleTodoHandler = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, isCompleted: !todo.isCompleted }
          : { ...todo }
      )
    )
  }

  const completedTodosCount = () => {
    return todos.filter((todo) => todo.isCompleted === true).length
  }

  const findCompletedTodosHandler = () => {
    return todos.find((todo) => todo.isCompleted === true)
  }

  return (
    <div className="App flex flex-col items-center">
      <h1 className="text-white text-center text-4xl font-bold mb-10">
        Todo App
      </h1>
      <TodoForm addTodo={addTodoHandler} />
      <TodosActions
        findCompletedTodos={findCompletedTodosHandler}
        todos={todos}
        clearTodos={cleartTodosHandler}
        deleteCompletedTodo={deleteCompletedTodoHandler}
      />
      <TodoList
        editTodo={editTodoHandler}
        toggleTodo={toggleTodoHandler}
        deleteTodo={deleteTodoHandler}
        todos={todos}
      />
      {todos.find((todo) => todo.isCompleted === true) ? (
        <h1 className="text-white text-center text-xl font-bold my-10">
          You have completed {String(completedTodosCount())}{' '}
          {completedTodosCount() === 1 ? 'todo' : 'todos'}
        </h1>
      ) : (
        void 0
      )}
    </div>
  )
}

export default App
