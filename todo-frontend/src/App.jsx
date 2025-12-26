import React, { useEffect, useState } from "react";
import { createTodo, deleteTodo, listTodos, toggleTodo } from "./api/todoApi";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const load = async () => {
    setErr("");
    setLoading(true);
    try {
      const data = await listTodos();
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setTodos(data);
    } catch (e) {
      setErr("Failed to load todos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const onAdd = async (e) => {
    e.preventDefault();
    const clean = title.trim();
    if (!clean) return;

    setErr("");
    try {
      const created = await createTodo(clean);
      setTodos((prev) => [created, ...prev]);
      setTitle("");
    } catch (e) {
      setErr("Failed to create todo.");
    }
  };

  const onToggle = async (id) => {
    setErr("");
    try {
      const updated = await toggleTodo(id);
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (e) {
      setErr("Failed to toggle todo.");
    }
  };

  const onDelete = async (id) => {
    setErr("");
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (e) {
      setErr("Failed to delete todo.");
    }
  };

  return (
    <div style={{ maxWidth: 650, margin: "40px auto", fontFamily: "Arial" }}>
      <h2>TODO App (React + Spring Boot + MySQL)</h2>

      <form onSubmit={onAdd} style={{ display: "flex", gap: 10 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a todo..."
          style={{ flex: 1, padding: 10 }}
        />
        <button style={{ padding: "10px 16px" }}>Add</button>
      </form>

      {err && <p style={{ marginTop: 12 }}>{err}</p>}
      {loading ? (
        <p style={{ marginTop: 18 }}>Loading...</p>
      ) : (
        <ul style={{ paddingLeft: 18, marginTop: 18 }}>
          {todos.map((t) => (
            <li key={t.id} style={{ marginBottom: 10 }}>
              <span
                onClick={() => onToggle(t.id)}
                style={{
                  cursor: "pointer",
                  textDecoration: t.completed ? "line-through" : "none",
                  marginRight: 12,
                }}
                title="Click to toggle"
              >
                {t.title} {t.completed ? "(DONE)" : "(TODO)"}
              </span>

              <button onClick={() => onDelete(t.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
