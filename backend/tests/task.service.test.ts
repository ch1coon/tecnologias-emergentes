import { TaskPriority, TaskStatus } from "@prisma/client";
import { describe, expect, it, vi } from "vitest";
import { ITaskRepository } from "../src/repositories/task.repository";
import { TaskNotFoundError, TaskService } from "../src/services/task.service";

const mockTask = {
  id: "task-1",
  title: "Tarefa de teste",
  description: "Descrição",
  status: TaskStatus.PENDENTE,
  priority: TaskPriority.MEDIA,
  dueDate: null,
  createdAt: new Date("2026-06-01"),
  updatedAt: new Date("2026-06-01"),
};

function createRepositoryMock(): ITaskRepository {
  return {
    create: vi.fn().mockResolvedValue(mockTask),
    findAll: vi.fn().mockResolvedValue([mockTask]),
    findById: vi.fn().mockResolvedValue(mockTask),
    update: vi.fn().mockResolvedValue({ ...mockTask, title: "Atualizada" }),
    delete: vi.fn().mockResolvedValue(undefined),
  };
}

describe("TaskService", () => {
  it("cria uma tarefa", async () => {
    const repository = createRepositoryMock();
    const service = new TaskService(repository);

    const result = await service.create({ title: "Nova tarefa" });

    expect(repository.create).toHaveBeenCalledWith({ title: "Nova tarefa" });
    expect(result).toEqual(mockTask);
  });

  it("lista tarefas com filtros", async () => {
    const repository = createRepositoryMock();
    const service = new TaskService(repository);

    const result = await service.list({ status: TaskStatus.PENDENTE });

    expect(repository.findAll).toHaveBeenCalledWith({ status: TaskStatus.PENDENTE });
    expect(result).toHaveLength(1);
  });

  it("retorna tarefa por id", async () => {
    const repository = createRepositoryMock();
    const service = new TaskService(repository);

    const result = await service.getById("task-1");

    expect(result.id).toBe("task-1");
  });

  it("lança erro quando tarefa não existe", async () => {
    const repository = createRepositoryMock();
    repository.findById = vi.fn().mockResolvedValue(null);
    const service = new TaskService(repository);

    await expect(service.getById("inexistente")).rejects.toBeInstanceOf(TaskNotFoundError);
  });

  it("atualiza tarefa existente", async () => {
    const repository = createRepositoryMock();
    const service = new TaskService(repository);

    const result = await service.update("task-1", { title: "Atualizada" });

    expect(repository.update).toHaveBeenCalledWith("task-1", { title: "Atualizada" });
    expect(result.title).toBe("Atualizada");
  });

  it("remove tarefa existente", async () => {
    const repository = createRepositoryMock();
    const service = new TaskService(repository);

    await service.delete("task-1");

    expect(repository.delete).toHaveBeenCalledWith("task-1");
  });
});
