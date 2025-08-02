import { useEffect, useState } from 'react'
import axios from '../util/apiClient'

import Todo from './Todo'
import Form from './Form'

const TodoView = () => {
  const [todos, setTodos] = useState([])

  const refreshTodos = async () => {
    const { data } = await (await axios.get('/todos'))
    setTodos(data)
    console.log('data', data)
  }

  useEffect(() => {
    refreshTodos()
  }, [])

  const createTodo = async (todo) => {
    const { data } = await axios.post('/todos', todo)
    setTodos([...todos, data])
  }

  const deleteTodo =  (todo) => async() => {
    await axios.delete(`/todos/${todo._id}`)
    refreshTodos()
  }

  const completeTodo =  (todo)=> async() => {
    await axios.put(`/todos/${todo._id}`, {
      text: todo.text,
      done: true
    })
    refreshTodos()
  }
  console.log('todosBefore', todos)
  return (
    <view>
      <h1>Todos</h1>
      <Form createTodo={createTodo} />
     
      {todos.map(todo => <Todo key={todo._id} todo={todo} onClickDelete={deleteTodo} onClickComplete={completeTodo} /> ).reduce((acc, cur) => [...acc, <hr />, cur], [])}
    </view>
  )
}

export default TodoView
