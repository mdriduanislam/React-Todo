import './App.css'
import { useState, useEffect } from 'react'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'


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
    <div className='bg-blue-950 flex justify-center items-center w-full h-screen'>
      <div className='bg-blue-900 shadow-2xl p-20 rounded-3xl h-[90%] w-[70%] flex flex-col gap-3 justify-center items-center'> 
        <h1 className='text-3xl font-bold text-center pb-5' >
          My Todo App
        </h1>
        <TodoForm addTodo={addTodo}/>
        <input className='bg-blue-500 rounded-lg w-[50%] h-10 outline-none p-2'
          type="text"
          placeholder='Seach your todos...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className='w-[50%] h-10 flex gap-2 justify-around items-center' >
          <button className='bg-blue-500 rounded-lg w-[33%] h-full' onClick={() => setFilter('all')}
            style={{ fontWeight: filter === 'all' ? 'bold' : 'normal' }}
          >
            All
          </button>
          <button className='bg-blue-500 rounded-lg w-[33%] h-full' onClick={() => setFilter('active')}
            style={{ fontWeight: filter === 'active' ? 'bold' : 'normal' }}
          >
            Active
          </button>
          <button className='bg-blue-500 rounded-lg w-[33%] h-full' onClick={() => setFilter('completed')}
            style={{ fontWeight: filter === 'completed' ? 'bold' : 'normal' }}
          >
            Completed
          </button>
        </div>
        <TodoList todos={searchTodo} toggleTodo={toggleTodo} removeTodo={removeTodo} editTodo={editTodo} />
      </div>
    </div>
  )
}

export default App
