import { TaskFilters as Filters, TaskPriority, TaskSortBy, TaskStatus } from "../types/task";
import { priorityLabels, statusLabels } from "../utils/labels";

interface TaskFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

export function TaskFilters({ filters, onChange }: TaskFiltersProps) {
  return (
    <div className="task-filters">
      <label className="filter-field">
        <span className="filter-label">Buscar</span>
        <input
          type="search"
          placeholder="Título..."
          value={filters.search ?? ""}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
        />
      </label>

      <label className="filter-field">
        <span className="filter-label">Status</span>
        <select
          value={filters.status ?? ""}
          onChange={(e) =>
            onChange({ ...filters, status: (e.target.value as TaskStatus) || "" })
          }
        >
          <option value="">Todos</option>
          {(Object.keys(statusLabels) as TaskStatus[]).map((status) => (
            <option key={status} value={status}>
              {statusLabels[status]}
            </option>
          ))}
        </select>
      </label>

      <label className="filter-field">
        <span className="filter-label">Prioridade</span>
        <select
          value={filters.priority ?? ""}
          onChange={(e) =>
            onChange({ ...filters, priority: (e.target.value as TaskPriority) || "" })
          }
        >
          <option value="">Todas</option>
          {(Object.keys(priorityLabels) as TaskPriority[]).map((priority) => (
            <option key={priority} value={priority}>
              {priorityLabels[priority]}
            </option>
          ))}
        </select>
      </label>

      <label className="filter-field">
        <span className="filter-label">Ordenar</span>
        <select
          value={filters.sortBy ?? ""}
          onChange={(e) =>
            onChange({ ...filters, sortBy: (e.target.value as TaskSortBy) || "" })
          }
        >
          <option value="">Padrão</option>
          <option value="dueDate_asc">Vencimento (mais próximo)</option>
          <option value="dueDate_desc">Vencimento (mais distante)</option>
        </select>
      </label>
    </div>
  );
}
