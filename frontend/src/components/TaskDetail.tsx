import { Task } from "../types/task";
import { formatDate, priorityLabels, statusLabels } from "../utils/labels";

interface TaskDetailProps {
  task: Task;
  onClose: () => void;
}

export function TaskDetail({ task, onClose }: TaskDetailProps) {
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal">
        <header>
          <h2>{task.title}</h2>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Fechar">
            ×
          </button>
        </header>

        <dl className="detail-list">
          <div>
            <dt>Status</dt>
            <dd>{statusLabels[task.status]}</dd>
          </div>
          <div>
            <dt>Prioridade</dt>
            <dd>{priorityLabels[task.priority]}</dd>
          </div>
          <div>
            <dt>Vencimento</dt>
            <dd>{formatDate(task.dueDate)}</dd>
          </div>
          <div>
            <dt>Descrição</dt>
            <dd>{task.description || "—"}</dd>
          </div>
          <div>
            <dt>Criada em</dt>
            <dd>{formatDate(task.createdAt)}</dd>
          </div>
          <div>
            <dt>Atualizada em</dt>
            <dd>{formatDate(task.updatedAt)}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
