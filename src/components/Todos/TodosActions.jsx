import styles from './TodosActions.module.css'
import Button from '../UI/Button'
import { TiDelete } from 'react-icons/ti'
import { AiOutlineClear } from 'react-icons/ai'

const TodosActions = ({
  deleteCompletedTodo,
  clearTodos,
  todos,
  findCompletedTodos,
}) => {
  if (todos.length === 0) {
    return void 0
  }

  return (
    <div className={styles.todosActions}>
      <Button
        title={'Delete all todos'}
        children={<TiDelete />}
        onClick={clearTodos}
      ></Button>
      <Button
        title={'Delete completed todos'}
        disabled={findCompletedTodos() ? false : true}
        children={<AiOutlineClear />}
        onClick={deleteCompletedTodo}
      ></Button>
    </div>
  )
}

export default TodosActions
