import { FormEvent, useEffect, useState } from "react";
import { CreateTaskInput, Task, TaskPriority, TaskStatus } from "../types/task";
import { priorityLabels, statusLabels } from "../utils/labels";
import { DatePicker } from "./DatePicker";

interface TaskFormProps {
  initial?: Task | null;
  onSubmit: (data: CreateTaskInput) => Promise<void>;
  onCancel?: () => void;
  hideTitle?: boolean;
}

const emptyForm: CreateTaskInput = {
  title: "",
  description: "",
  status: "PENDENTE",
  priority: "MEDIA",
  dueDate: "",
};

export function TaskForm({ initial, onSubmit, onCancel, hideTitle }: TaskFormProps) {
  const [form, setForm] = useState<CreateTaskInput>(emptyForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initial) {
      setForm({
        title: initial.title,
        description: initial.description ?? "",
        status: initial.status,
        priority: initial.priority,
        dueDate: initial.dueDate ? initial.dueDate.slice(0, 10) : "",
      });
    } else {
      setForm(emptyForm);
    }
  }, [initial]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");

    if (!form.title.trim()) {
      setError("O título é obrigatório.");
      return;
    }

    setLoading(true);
    try {
      await onSubmit({
        ...form,
        title: form.title.trim(),
        description: form.description?.trim() || undefined,
        dueDate: form.dueDate ? new Date(`${form.dueDate}T12:00:00`).toISOString() : undefined,
      });
      if (!initial) {
        setForm(emptyForm);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar tarefa");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      {!hideTitle && <h2>{initial ? "Editar tarefa" : "Nova tarefa"}</h2>}

      <label>
        Título *
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Ex.: Entregar relatório"
          maxLength={120}
        />
      </label>

      <label>
        Descrição
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Detalhes opcionais"
          rows={3}
          maxLength={500}
        />
      </label>

      <div className="form-row">
        <label>
          Status
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value as TaskStatus })}
          >
            {(Object.keys(statusLabels) as TaskStatus[]).map((status) => (
              <option key={status} value={status}>
                {statusLabels[status]}
              </option>
            ))}
          </select>
        </label>

        <label>
          Prioridade
          <select
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value as TaskPriority })}
          >
            {(Object.keys(priorityLabels) as TaskPriority[]).map((priority) => (
              <option key={priority} value={priority}>
                {priorityLabels[priority]}
              </option>
            ))}
          </select>
        </label>

        <DatePicker
          label="Vencimento"
          value={form.dueDate ?? ""}
          onChange={(dueDate) => setForm({ ...form, dueDate })}
        />
      </div>

      {error && <p className="form-error">{error}</p>}

      <div className="form-actions">
        <button type="submit" disabled={loading}>
          {loading ? "Salvando..." : initial ? "Atualizar" : "Cadastrar"}
        </button>
        {onCancel && (
          <button type="button" className="secondary" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
