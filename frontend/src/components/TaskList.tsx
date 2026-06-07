import { TaskDueProgress } from "./TaskDueProgress";
import { Task } from "../types/task";
import { formatDate, priorityLabels, statusLabels } from "../utils/labels";

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onView: (task: Task) => void;
}

export function TaskList({ tasks, loading, onEdit, onDelete, onView }: TaskListProps) {
  if (loading) {
    return <p className="empty-state">Carregando tarefas...</p>;
  }

  if (tasks.length === 0) {
    return <p className="empty-state">Nenhuma tarefa encontrada.</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className="task-card">
          <div className="task-card-header">
            <h3>{task.title}</h3>
            <span className={`badge status-${task.status.toLowerCase()}`}>
              {statusLabels[task.status]}
            </span>
          </div>

          {task.description && <p className="task-description">{task.description}</p>}

          <div className="task-meta">
            <span>Prioridade: {priorityLabels[task.priority]}</span>
            <span>Vencimento: {formatDate(task.dueDate)}</span>
          </div>

          <div className="task-actions">
            <button type="button" className="secondary" onClick={() => onView(task)}>
              Detalhes
            </button>
            <button type="button" onClick={() => onEdit(task)}>
              Editar
            </button>
            <button type="button" className="danger" onClick={() => onDelete(task)}>
              Excluir
            </button>
          </div>

          <TaskDueProgress task={task} />
        </li>
      ))}
    </ul>
  );
}
