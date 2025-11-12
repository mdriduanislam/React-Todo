function TodoList({ todos, toggleTodo, removeTodo }) {
    return (
        <div>
            {todos.map((todo) => (
                <div key={todo.id} className="todo_item">
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                    />
                    <span style={
                        { textDecoration: todo.completed ? 'line-through' : 'none' }
                    }>
                        {todo.text}
                    </span>
                    <button
                        onClick={() => removeTodo(todo.id)}
                        style={{
                            marginLeft: '10px', background: 'crimson',
                            color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer',
                        }}
                    >
                        ✕
                    </button>
                </div>
            ))}
        </div>
    )
}

export default TodoList;
