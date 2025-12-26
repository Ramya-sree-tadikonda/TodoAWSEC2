import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8085/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// GET /api/todos
export const listTodos = async () => {
  const res = await api.get("/todos");
  return res.data;
};

// POST /api/todos
export const createTodo = async (title) => {
  const res = await api.post("/todos", { title });
  return res.data;
};

// PATCH /api/todos/{id}/toggle
export const toggleTodo = async (id) => {
  const res = await api.patch(`/todos/${id}/toggle`);
  return res.data;
};

// PATCH /api/todos/{id}
export const updateTodo = async (id, payload) => {
  const res = await api.patch(`/todos/${id}`, payload);
  return res.data;
};

// DELETE /api/todos/{id}
export const deleteTodo = async (id) => {
  await api.delete(`/todos/${id}`);
};
