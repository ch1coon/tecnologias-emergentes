import { CreateTaskInput, Task } from "../types/task";
import { TaskForm } from "./TaskForm";

interface TaskFormModalProps {
  task?: Task | null;
  onSubmit: (data: CreateTaskInput) => Promise<void>;
  onClose: () => void;
}

export function TaskFormModal({ task, onSubmit, onClose }: TaskFormModalProps) {
  async function handleSubmit(data: CreateTaskInput) {
    await onSubmit(data);
    onClose();
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" onMouseDown={onClose}>
      <div className="modal modal-form" onMouseDown={(e) => e.stopPropagation()}>
        <header>
          <h2>{task ? "Editar tarefa" : "Nova tarefa"}</h2>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Fechar">
            ×
          </button>
        </header>
        <TaskForm
          initial={task}
          onSubmit={handleSubmit}
          onCancel={onClose}
          hideTitle
        />
      </div>
    </div>
  );
}
