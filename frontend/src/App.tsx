import { useCallback, useEffect, useState } from "react";
import { TaskDetail } from "./components/TaskDetail";
import { TaskFilters } from "./components/TaskFilters";
import { TaskFormModal } from "./components/TaskFormModal";
import { TaskList } from "./components/TaskList";
import { taskApi } from "./services/taskApi";
import { CreateTaskInput, Task, TaskFilters as Filters } from "./types/task";
import { sortTasks } from "./utils/sortTasks";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    status: "",
    priority: "",
    sortBy: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [viewingTask, setViewingTask] = useState<Task | null>(null);
  const [showFormModal, setShowFormModal] = useState(false);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { sortBy, ...apiFilters } = filters;
      const data = await taskApi.list(apiFilters);
      setTasks(sortTasks(data, sortBy));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar tarefas");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    const timeout = setTimeout(loadTasks, 300);
    return () => clearTimeout(timeout);
  }, [loadTasks]);

  function openCreateModal() {
    setEditingTask(null);
    setShowFormModal(true);
  }

  function openEditModal(task: Task) {
    setEditingTask(task);
    setShowFormModal(true);
  }

  function closeFormModal() {
    setShowFormModal(false);
    setEditingTask(null);
  }

  async function handleCreate(data: CreateTaskInput) {
    await taskApi.create(data);
    await loadTasks();
  }

  async function handleUpdate(data: CreateTaskInput) {
    if (!editingTask) return;
    await taskApi.update(editingTask.id, data);
    await loadTasks();
  }

  async function handleDelete(task: Task) {
    const confirmed = window.confirm(`Excluir a tarefa "${task.title}"?`);
    if (!confirmed) return;

    try {
      await taskApi.remove(task.id);
      if (editingTask?.id === task.id) closeFormModal();
      if (viewingTask?.id === task.id) setViewingTask(null);
      await loadTasks();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao excluir tarefa");
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-brand">
          <p className="eyebrow">Tecnologias Emergentes</p>
          <h1>TaskFlow</h1>
        </div>

        <TaskFilters filters={filters} onChange={setFilters} />

        <button type="button" className="btn-new-task" onClick={openCreateModal}>
          + Nova tarefa
        </button>
      </header>

      <main className="app-main">
        {error && <p className="form-error">{error}</p>}
        <TaskList
          tasks={tasks}
          loading={loading}
          onEdit={openEditModal}
          onDelete={handleDelete}
          onView={setViewingTask}
        />
      </main>

      {showFormModal && (
        <TaskFormModal
          task={editingTask}
          onSubmit={editingTask ? handleUpdate : handleCreate}
          onClose={closeFormModal}
        />
      )}

      {viewingTask && <TaskDetail task={viewingTask} onClose={() => setViewingTask(null)} />}
    </div>
  );
}
