import { useState } from 'react'

function TodoForm({ addTodo}) {
    const [text, setText] = useState("");
    const handleClick = (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        addTodo(text);
        setText("");
    }
    return (
            <form action="" onClick={handleClick} className='w-[50%] h-10 flex justify-center items-center gap-1.5'>
                <input className='outline-none p-2 bg-blue-500 rounded-lg w-[80%]'
                    type="text"
                    value={text}
                    placeholder='Add a new task...'
                    onChange={(e) => setText(e.target.value)}
                />
                <button type="submit" className='p-2 bg-blue-700 rounded-lg w-[20%] font-bold '>Add</button>
            </form>
    )
}
export default TodoForm;