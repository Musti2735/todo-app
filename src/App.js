
import './App.css';
import { useState } from 'react'

function App() {
  const [todoList, setTodoList] = useState([]);
  const [todoItem, setTodoItem] = useState({ content: "", isComplete: false, id: null })
  const [todo, setTodo] = useState("")
  const [status, setStatus] = useState("all")

  const submitHandler = (e) => {
    e.preventDefault();
    setTodo(todo)
    const newItem = { content: todo, isComplete: false, id: new Date().getTime().toString() }
    setTodoItem(newItem)
    setTodoList([...todoList, newItem])
    setTodo("")
  }

  const removeItem = (id) => {
    const removedList = todoList.filter((item) => item.id !== id)
    setTodoList(removedList)
    console.log(removedList)
  }

  const completeItem = (id) => {
    const newList = todoList.map((item) => {
      if (item.id === id) {
        item.isComplete == false ? item.isComplete = true : item.isComplete = false
      }
      return item
    })
    setTodoList(newList)
  }

  let completedTodos = todoList.filter((item) => item.isComplete === true)
  let active = todoList.filter((item) => item.isComplete === false)
  let curruentTodos = status === 'all' ? todoList : status === 'completed' ? completedTodos : active



  return (
    <>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={submitHandler}>
            <input
              onChange={(e) => setTodo(e.target.value)}
              value={todo} className="new-todo" placeholder="What needs to be done?" autoFocus />
          </form>
        </header>

        <section className="main">
          <input className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all">
            Mark all as complete
          </label>

          <ul className="todo-list">
            {
              curruentTodos.map((item) => {
                return (
                  <li key={item.id} className={item.isComplete ? "completed" : ''} id={item.id}>
                    <div className="view">
                      <input className="toggle" type="checkbox" onClick={() => completeItem(item.id)} />
                      <label>{item.content}</label>
                      <button type='submit' onClick={() => removeItem(item.id)} className="destroy"></button>
                    </div>
                  </li>
                )
              })

            }
          </ul>
        </section>
        {todoList.length > 0 &&
          <footer className="footer">
            <span className="todo-count">
              <strong>{active.length} </strong>
              items left
            </span>

            <ul className="filters">
              <li>
                <a onClick={() => setStatus('all')} href="#/" className="selected">All</a>
              </li>
              <li>
                <a onClick={() => setStatus('active')} href="#/">Active</a>
              </li>
              <li>
                <a onClick={() => setStatus('completed')} href="#/">Completed</a>
              </li>
            </ul>
            <button onClick={() => setTodoList(active)} className="clear-completed">
              Clear completed
            </button>

          </footer>}
      </section>

      <footer className="info">
        <p>Click to edit a todo</p>
        <p>Created by Mustafa Türk</p>
      </footer>
    </>);
}

export default App;
