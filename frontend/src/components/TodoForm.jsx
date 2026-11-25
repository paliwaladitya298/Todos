import { useState } from "react"
import { X } from "lucide-react"
import { getApiError } from "../services/api"

const TodoForm = ({ onClose, onSubmit, todo = null }) => {
  const [title, setTitle] = useState(todo?.title || "")
  const [description, setDescription] = useState(todo?.description || "")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!title.trim()) {
      setError("Enter a task title.")
      return
    }

    setIsSubmitting(true)
    setError("")
    try {
      await onSubmit({ title: title.trim(), description: description.trim() })
    } catch (requestError) {
      setError(getApiError(requestError))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section aria-labelledby="todo-form-title" aria-modal="true" className="modal-card" role="dialog">
        <div className="modal-heading">
          <div>
            <p className="eyebrow">{todo ? "UPDATE YOUR LIST" : "MAKE IT HAPPEN"}</p>
            <h2 id="todo-form-title">{todo ? "Edit task" : "Add a task"}</h2>
          </div>
          <button aria-label="Close form" className="icon-button" onClick={onClose} type="button">
            <X size={21} />
          </button>
        </div>

        <form className="form-stack" onSubmit={handleSubmit}>
          <label className="field">
            <span>Task title</span>
            <input
              autoFocus
              maxLength={120}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="What needs to get done?"
              value={title}
            />
          </label>

          <label className="field">
            <span>Description <span className="optional-label">Optional</span></span>
            <textarea
              maxLength={1000}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Add a few helpful details…"
              rows={4}
              value={description}
            />
          </label>

          {error && <p className="form-error" role="alert">{error}</p>}

          <div className="modal-actions">
            <button className="button button-quiet" onClick={onClose} type="button">Cancel</button>
            <button className="button button-primary" disabled={isSubmitting} type="submit">
              {isSubmitting ? "Saving…" : todo ? "Save changes" : "Add task"}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default TodoForm
