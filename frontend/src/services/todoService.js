import api from "./api"

export async function getTodos() {
  const { data } = await api.get("/todo")
  if (!Array.isArray(data)) throw new Error("The server returned an invalid task list.")
  return data
}

export async function createTodo({ title, description }) {
  const { data } = await api.post("/todo", {
    title,
    description,
    completed: false,
  })
  return data
}

export async function updateTodo(todoId, todo) {
  const { data } = await api.patch(`/todo/update/${encodeURIComponent(todoId)}`, {
    title: todo.title,
    description: todo.description || "",
    completed: Boolean(todo.completed),
  })
  return data
}

export async function deleteTodo(todoId) {
  const { data } = await api.delete(`/todo/delete/${encodeURIComponent(todoId)}`)
  return data
}
