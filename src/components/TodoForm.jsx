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
        <form action="" onClick={handleClick}>
            <input
                type="text"
                value={text}
                placeholder='Add a new task...'
                onChange={(e) => setText(e.target.value)}
            />
            <button type="submit">Add</button>
        </form>
    )
}
export default TodoForm;