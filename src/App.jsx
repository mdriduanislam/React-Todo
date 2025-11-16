import './App.css'
import { useState, useEffect } from 'react'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import { motion, AnimatePresence } from "framer-motion";


function App() {
  const [todos, setTodos] = useState(() => {
    const savedtodos = localStorage.getItem('todos');
    return savedtodos ? JSON.parse(savedtodos) : [];
  });
  const [filter, setFilter] = useState('all');
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  })
  const [search, setSearch] = useState('');

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
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const editTodo = (id, newText) => {
    setTodos(todos.map((todo) => todo.id === id ? { ...todo, text: newText } : todo))
  }

  const searchTodo = filteredTodos.filter(
    todo => todo.text.toLowerCase().includes(search.toLowerCase()))

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos])
  return (
    <div className="bg-blue-950 flex justify-center items-center w-full h-screen">
      <div className="bg-blue-900 shadow-2xl p-10 rounded-3xl h-[90%] w-[70%] 
                  flex flex-col items-center gap-4">

        {/* Title */}
        <h1 className="text-3xl font-bold text-white text-center">My Todo App</h1>

        {/* Todo Form */}
        <TodoForm addTodo={addTodo} />

        {/* Search Bar */}
        <input
          className="bg-blue-800 text-white px-4 py-2 rounded-lg w-[60%] 
                 border border-blue-700 shadow-sm
                 focus:outline-none focus:ring focus:ring-blue-500"
          type="text"
          placeholder="Search your todos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Filter Buttons */}
        <div className="w-[60%] flex gap-3 justify-center">
          {["all", "active", "completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 py-2 rounded-full transition shadow 
            ${filter === f
                  ? "bg-blue-600 text-white font-semibold"
                  : "bg-blue-700 text-gray-200 hover:bg-blue-600 hover:text-white"
                }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-blue-700 w-[60%] opacity-40"></div>

        {/* TodoList (KEEP YOUR OWN VERSION) */}
        <div className="w-[60%] bg-blue-800 rounded-2xl shadow-xl p-5 overflow-y-auto">
          <TodoList
            todos={searchTodo}
            toggleTodo={toggleTodo}
            removeTodo={removeTodo}
            editTodo={editTodo}
          />
        </div>
      </div>
    </div>


  )
}

export default App
