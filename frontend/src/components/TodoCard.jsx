import { Pencil, Trash2 } from "lucide-react"

const TodoCard = ({ todo, onToggle, onEdit, onDelete, disabled = false }) => (
  <article className="task-card">
    <div className="task-main">
      <input
        type="checkbox"
        checked={Boolean(todo.completed)}
        onChange={() => onToggle(todo)}
        disabled={disabled}
        aria-label={`Mark ${todo.title} ${todo.completed ? "incomplete" : "complete"}`}
      />
      <div>
        <h3 className={`task-title ${todo.completed ? "task-title-completed" : ""}`}>
          {todo.title}
        </h3>
        {todo.description && <p className="task-description">{todo.description}</p>}
      </div>
    </div>

    <div className="task-actions">
      <button
        type="button"
        onClick={() => onEdit(todo)}
        disabled={disabled}
        aria-label="Edit task"
        className="icon-button"
      >
        <Pencil size={20} />
      </button>
      <button
        type="button"
        onClick={() => onDelete(todo)}
        disabled={disabled}
        aria-label="Delete task"
        className="icon-button icon-button-danger"
      >
        <Trash2 size={20} />
      </button>
    </div>
  </article>
)

export default TodoCard
