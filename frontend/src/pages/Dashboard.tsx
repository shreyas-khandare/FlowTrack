import { useEffect, useState } from "react";
import { getTasks, createTask, deleteTask, updateTask } from "../api/task";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  const handleAdd = async () => {
    await createTask({ title });
    setTitle("");
    fetchTasks();
  };

  const handleDelete = async (id: number) => {
    await deleteTask(id);
    fetchTasks();
  };

  const handleUpdate = async (id: number) => {
    const newTitle = prompt("Enter new title");
    if (!newTitle) return;

    await updateTask(id, { title: newTitle });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
  <div className="min-h-screen bg-gray-100 p-6">
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Tasks</h2>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Add Task */}
      <div className="flex gap-2 mb-6">
        <input
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Add a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 rounded-lg hover:bg-blue-600 transition"
        >
          Add
        </button>
      </div>

      {/* Task List */}
      <ul className="space-y-3">
        {tasks.map((t) => (
          <li
            key={t.id}
            className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <span className="font-medium">{t.title}</span>

            <div className="flex gap-2">
              <button
                onClick={() => handleUpdate(t.id)}
                className="bg-yellow-400 px-3 py-1 rounded-lg hover:bg-yellow-500 transition"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(t.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

    </div>
  </div>
);
}
