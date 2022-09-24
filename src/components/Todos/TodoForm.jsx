import { useState } from 'react'
import styles from './TodoForm.module.css'
import { MdDoneAll } from 'react-icons/md'

const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState('')

  const onSubmitHandler = (event) => {
    if (value.length >= 3) {
      event.preventDefault()
      addTodo(value)
      setValue('')
    } else {
      event.preventDefault()
    }
  }

  return (
    <form className={styles.todoForm} onSubmit={onSubmitHandler}>
      <input
        value={value}
        onChange={(event) => {
          setValue(event.target.value)
        }}
        className={styles.todoInput}
        type="text"
        placeholder="Enter new todo"
      />
      <div className={styles.todoSubmitWrapper}>
        <input
          className={styles.todoSubmit}
          title={'Add todo'}
          type="submit"
          value="Submit"
        />
        <MdDoneAll className={styles.todoIcon} />
      </div>
      {value.length >= 1 && value.length <= 2 ? (
        <label className={styles.todoLabel}>
          Todo must be more than or equal to 3 characters.
        </label>
      ) : (
        void 0
      )}
    </form>
  )
}

export default TodoForm
