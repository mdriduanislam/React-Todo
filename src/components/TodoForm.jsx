import { useState } from 'react'

function TodoForm({ addTodo }) {
    const [text, setText] = useState("");
    const handleClick = (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        addTodo(text);
        setText("");
    }
    return (
        <form
            onSubmit={handleClick}
            className="w-[60%] flex items-center gap-2"
        >
            <input
                className="flex-1 px-4 py-2 bg-blue-800 text-white rounded-lg
               border border-blue-700 shadow-sm
               focus:outline-none focus:ring focus:ring-blue-500"
                type="text"
                value={text}
                placeholder="Add a new task..."
                onChange={(e) => setText(e.target.value)}
            />

            <button
                type="submit"
                className="px-4 py-2 bg-blue-600 rounded-lg text-white font-semibold
               hover:bg-blue-500 active:scale-95 transition shadow"
            >
                Add
            </button>
        </form>

    )
}
export default TodoForm;