import { useState } from 'react';

function TodoList({ todos, toggleTodo, removeTodo, editTodo }) {

    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState('');
    return (
        <div>
            {todos.map((todo) => (
                <div key={todo.id} className="todo_item">
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                    />
                    {editId === todo.id ? (
                        <>
                            <input
                                type="text"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                            />
                            <button
                                onClick={() => {
                                    editTodo(todo.id, editText);
                                    setEditId(null);
                                    setEditText('');
                                }}>
                                Save
                            </button>
                        </>
                    ) : (
                        <>
                            <span style={
                                { textDecoration: todo.completed ? 'line-through' : 'none' }
                            }>
                                {todo.text}
                            </span>
                            <button
                                onClick={() => {
                                    setEditId(todo.id);
                                    setEditText(todo.text);
                                }}
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => removeTodo(todo.id)}
                                style={{
                                    marginLeft: '10px', background: 'crimson',
                                    color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer',
                                }}
                            >
                                ✕
                            </button>
                        </>
                    )}
                </div>
            ))}
        </div>
    )
}

export default TodoList;
