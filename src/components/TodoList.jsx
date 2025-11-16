import { useState } from 'react';

function TodoList({ todos, toggleTodo, removeTodo, editTodo }) {

    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState('');
    return (
        <div className="w-[60%] flex flex-col gap-3">

            {todos.map((todo) => (
                <div
                    key={todo.id}
                    className="relative bg-blue-700 rounded-xl shadow-md p-4 flex items-center"
                >
                    {/* Checkbox */}
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                        className="w-5 h-5 accent-blue-400 flex-shrink-0 mr-3"
                    />

                    {/* Text / Input takes full width */}
                    {editId === todo.id ? (
                        <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="w-full pr-20 bg-blue-800 text-white px-3 py-2 rounded-lg
                     border border-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    ) : (
                        <span
                            className={`w-full pr-20 text-white break-words block ${todo.completed ? "line-through opacity-60" : ""
                                }`}
                        >
                            {todo.text}
                        </span>
                    )}

                    {/* Buttons overlay on the right */}
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex gap-2">
                        {editId === todo.id ? (
                            <button
                                onClick={() => {
                                    editTodo(todo.id, editText);
                                    setEditId(null);
                                    setEditText("");
                                }}
                                className="text-green-400 hover:text-green-300 text-xl"
                                title="Save"
                            >
                                ✔
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    setEditId(todo.id);
                                    setEditText(todo.text);
                                }}
                                className="text-yellow-300 hover:text-yellow-200 text-xl"
                                title="Edit"
                            >
                                ✎
                            </button>
                        )}

                        <button
                            onClick={() => removeTodo(todo.id)}
                            className="text-red-400 hover:text-red-300 text-xl"
                            title="Delete"
                        >
                            🗑
                        </button>
                    </div>
                </div>
            ))}

        </div>

    )
}

export default TodoList;
