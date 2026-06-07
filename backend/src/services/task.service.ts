import { Task } from "@prisma/client";
import { ITaskRepository } from "../repositories/task.repository";
import { CreateTaskInput, TaskFilters, UpdateTaskInput } from "../types/task";

export class TaskNotFoundError extends Error {
  constructor(id: string) {
    super(`Tarefa com id "${id}" não encontrada`);
    this.name = "TaskNotFoundError";
  }
}

export class TaskService {
  constructor(private readonly repository: ITaskRepository) {}

  create(input: CreateTaskInput): Promise<Task> {
    return this.repository.create(input);
  }

  list(filters?: TaskFilters): Promise<Task[]> {
    return this.repository.findAll(filters);
  }

  async getById(id: string): Promise<Task> {
    const task = await this.repository.findById(id);
    if (!task) {
      throw new TaskNotFoundError(id);
    }
    return task;
  }

  async update(id: string, input: UpdateTaskInput): Promise<Task> {
    await this.getById(id);
    return this.repository.update(id, input);
  }

  async delete(id: string): Promise<void> {
    await this.getById(id);
    await this.repository.delete(id);
  }
}
