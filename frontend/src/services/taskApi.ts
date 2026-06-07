import { CreateTaskInput, Task, TaskFilters, UpdateTaskInput } from "../types/task";

const API_BASE = "/api/tasks";

function buildQuery(filters?: TaskFilters): string {
  if (!filters) return "";

  const params = new URLSearchParams();
  if (filters.status) params.set("status", filters.status);
  if (filters.priority) params.set("priority", filters.priority);
  if (filters.search?.trim()) params.set("search", filters.search.trim());

  const query = params.toString();
  return query ? `?${query}` : "";
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error ?? "Erro ao comunicar com a API");
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export const taskApi = {
  list(filters?: TaskFilters): Promise<Task[]> {
    return fetch(`${API_BASE}${buildQuery(filters)}`).then(handleResponse<Task[]>);
  },

  getById(id: string): Promise<Task> {
    return fetch(`${API_BASE}/${id}`).then(handleResponse<Task>);
  },

  create(input: CreateTaskInput): Promise<Task> {
    return fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    }).then(handleResponse<Task>);
  },

  update(id: string, input: UpdateTaskInput): Promise<Task> {
    return fetch(`${API_BASE}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    }).then(handleResponse<Task>);
  },

  remove(id: string): Promise<void> {
    return fetch(`${API_BASE}/${id}`, { method: "DELETE" }).then(handleResponse<void>);
  },
};
