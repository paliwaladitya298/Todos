import { useCallback, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  CircleCheck,
  Clock3,
  ListChecks,
  ListTodo,
  LogOut,
  Plus,
} from "lucide-react"
import TodoCard from "../components/TodoCard"
import TodoForm from "../components/TodoForm"
import { useAuth } from "../context/useAuth"
import { getApiError } from "../services/api"
import { createTodo, deleteTodo, getTodos, updateTodo } from "../services/todoService"

const Dashboard = () => {
  const { signOut } = useAuth()
  const navigate = useNavigate()
  const [todos, setTodos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingTodo, setEditingTodo] = useState(null)
  const [busyTodoId, setBusyTodoId] = useState("")
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [error, setError] = useState("")

  const refreshTodos = useCallback(async () => {
    const items = await getTodos()
    setTodos(items)
  }, [])

  useEffect(() => {
    let active = true
    getTodos()
      .then((items) => {
        if (active) setTodos(items)
      })
      .catch((requestError) => {
        if (active) setError(getApiError(requestError))
      })
      .finally(() => {
        if (active) setIsLoading(false)
      })
    return () => { active = false }
  }, [])

  const handleSave = async (values) => {
    if (editingTodo) {
      await updateTodo(editingTodo._id, { ...editingTodo, ...values })
    } else {
      await createTodo(values)
    }
    await refreshTodos()
    setShowForm(false)
    setEditingTodo(null)
    setError("")
  }

  const handleToggle = async (todo) => {
    setBusyTodoId(todo._id)
    setError("")
    try {
      await updateTodo(todo._id, { ...todo, completed: !todo.completed })
      await refreshTodos()
    } catch (requestError) {
      setError(getApiError(requestError))
    } finally {
      setBusyTodoId("")
    }
  }

  const handleDelete = async (todo) => {
    setBusyTodoId(todo._id)
    setError("")
    try {
      await deleteTodo(todo._id)
      await refreshTodos()
    } catch (requestError) {
      setError(getApiError(requestError))
    } finally {
      setBusyTodoId("")
    }
  }

  const handleLogout = async () => {
    setIsLoggingOut(true)
    setError("")
    try {
      await signOut()
      navigate("/", { replace: true })
    } catch (requestError) {
      setError(getApiError(requestError))
      setIsLoggingOut(false)
    }
  }

  const completedCount = todos.filter((todo) => todo.completed).length
  const pendingCount = todos.length - completedCount

  return (
    <div className="dashboard-page">
      <header className="topbar">
        <Link aria-label="Taskflow home" className="brand" to="/dashboard">
          <span className="brand-mark brand-mark-small"><ListChecks size={22} /></span>
          <span>taskflow<span className="brand-period">.</span></span>
        </Link>
        <button className="logout-button" disabled={isLoggingOut} onClick={handleLogout} type="button">
          <LogOut size={17} />
          {isLoggingOut ? "Signing out…" : "Sign out"}
        </button>
      </header>

      <main className="dashboard-content">
        <section className="welcome-row">
          <div>
            <p className="eyebrow">YOUR PERSONAL WORKSPACE</p>
            <h1>My dashboard</h1>
            <p className="welcome-copy">A little progress each day adds up to big results.</p>
          </div>
          <div aria-hidden="true" className="welcome-decoration">✳</div>
        </section>

        <section aria-label="Task summary" className="stats-grid">
          <article className="stat-card">
            <span className="stat-icon stat-icon-purple"><ListTodo size={20} /></span>
            <p className="stat-label">Total tasks</p>
            <p className="stat-value">{todos.length}</p>
          </article>
          <article className="stat-card">
            <span className="stat-icon stat-icon-amber"><Clock3 size={20} /></span>
            <p className="stat-label">In progress</p>
            <p className="stat-value">{pendingCount}</p>
          </article>
          <article className="stat-card">
            <span className="stat-icon stat-icon-green"><CircleCheck size={20} /></span>
            <p className="stat-label">Completed</p>
            <p className="stat-value">{completedCount}</p>
          </article>
        </section>

        <section className="tasks-section">
          <div className="tasks-heading">
            <div>
              <h2>Your tasks</h2>
              <p>{todos.length ? `${pendingCount} left to complete` : "Keep everything you need to do in one place."}</p>
            </div>
            <button
              className="button button-primary add-task-button"
              onClick={() => { setEditingTodo(null); setShowForm(true) }}
              type="button"
            >
              <Plus size={19} /> Add task
            </button>
          </div>

          {error && <p className="inline-error" role="alert">{error}</p>}

          {isLoading ? (
            <div className="empty-state" role="status">Loading your tasks…</div>
          ) : todos.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon"><ListChecks size={25} /></span>
              <h3>No tasks yet</h3>
              <p>Add your first task and start making progress.</p>
              <button className="button button-primary" onClick={() => setShowForm(true)} type="button">
                <Plus size={18} /> Create a task
              </button>
            </div>
          ) : (
            <div className="task-list">
              {todos.map((todo) => (
                <TodoCard
                  disabled={busyTodoId === todo._id}
                  key={todo._id}
                  onDelete={handleDelete}
                  onEdit={(item) => { setEditingTodo(item); setShowForm(true) }}
                  onToggle={handleToggle}
                  todo={todo}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {showForm && (
        <TodoForm
          onClose={() => { setShowForm(false); setEditingTodo(null) }}
          onSubmit={handleSave}
          todo={editingTodo}
        />
      )}
    </div>
  )
}

export default Dashboard
