export type TaskStatus = "PENDENTE" | "EM_ANDAMENTO" | "CONCLUIDA";
export type TaskPriority = "BAIXA" | "MEDIA" | "ALTA";

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: string;
}

export interface UpdateTaskInput extends Partial<CreateTaskInput> {}

export type TaskSortBy = "dueDate_asc" | "dueDate_desc";

export interface TaskFilters {
  status?: TaskStatus | "";
  priority?: TaskPriority | "";
  search?: string;
  sortBy?: TaskSortBy | "";
}
