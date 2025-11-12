import './App.css'
import { useState, useEffect } from 'react'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'


function App() {
  const [todos, setTodos] = useState(()=>{
    const savedtodos = localStorage.getItem('todos');
    return savedtodos? JSON.parse(savedtodos) : [];
  });
  const addTodo = (text) => {
    const newTodos = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
    }
    setTodos((prevTodos) => [...prevTodos, newTodos]);
  }
  const toggleTodo = (id) => {
    setTodos(todos.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
  }

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id ))
  }

  useEffect(()=>{
    localStorage.setItem('todos', JSON.stringify(todos));
  },[todos])
  return (
    <>
      <h1 className="text-3xl font-bold">
        📝My todo App
      </h1>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} toggleTodo={toggleTodo} removeTodo={removeTodo} />
    </>
  )
}

export default App
