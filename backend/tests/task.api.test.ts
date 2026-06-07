import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { TaskPriority, TaskStatus } from "@prisma/client";
import { createApp } from "../src/app";

const mockTask = {
  id: "task-1",
  title: "Tarefa API",
  description: null,
  status: TaskStatus.PENDENTE,
  priority: TaskPriority.MEDIA,
  dueDate: null,
  createdAt: new Date("2026-06-01"),
  updatedAt: new Date("2026-06-01"),
};

vi.mock("../src/lib/prisma", () => ({
  prisma: {},
}));

vi.mock("../src/repositories/task.repository", () => ({
  PrismaTaskRepository: vi.fn().mockImplementation(() => ({
    create: vi.fn().mockResolvedValue(mockTask),
    findAll: vi.fn().mockResolvedValue([mockTask]),
    findById: vi.fn().mockResolvedValue(mockTask),
    update: vi.fn().mockResolvedValue({ ...mockTask, title: "Editada" }),
    delete: vi.fn().mockResolvedValue(undefined),
  })),
}));

describe("API /api/tasks", () => {
  const app = createApp();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("GET /health retorna status ok", async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("ok");
  });

  it("GET /api/tasks lista tarefas", async () => {
    const response = await request(app).get("/api/tasks");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].title).toBe("Tarefa API");
  });

  it("GET /api/tasks/:id retorna uma tarefa", async () => {
    const response = await request(app).get("/api/tasks/task-1");

    expect(response.status).toBe(200);
    expect(response.body.id).toBe("task-1");
  });

  it("POST /api/tasks cria tarefa com dados válidos", async () => {
    const response = await request(app).post("/api/tasks").send({ title: "Nova tarefa" });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe("Tarefa API");
  });

  it("POST /api/tasks rejeita título vazio", async () => {
    const response = await request(app).post("/api/tasks").send({ title: "" });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Dados inválidos");
  });

  it("PUT /api/tasks/:id atualiza tarefa", async () => {
    const response = await request(app).put("/api/tasks/task-1").send({ title: "Editada" });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Editada");
  });

  it("DELETE /api/tasks/:id remove tarefa", async () => {
    const response = await request(app).delete("/api/tasks/task-1");

    expect(response.status).toBe(204);
  });
});
