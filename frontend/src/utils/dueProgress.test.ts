import { describe, expect, it } from "vitest";
import { Task } from "../types/task";
import { getDueProgress } from "./dueProgress";

const baseTask: Task = {
  id: "1",
  title: "Tarefa",
  description: null,
  status: "PENDENTE",
  priority: "MEDIA",
  dueDate: "2026-06-11T12:00:00.000Z",
  createdAt: "2026-06-01T12:00:00.000Z",
  updatedAt: "2026-06-01T12:00:00.000Z",
};

describe("getDueProgress", () => {
  it("não exibe barra para tarefas concluídas", () => {
    const progress = getDueProgress({ ...baseTask, status: "CONCLUIDA" });
    expect(progress.show).toBe(false);
  });

  it("não exibe barra sem data de vencimento", () => {
    const progress = getDueProgress({ ...baseTask, dueDate: null });
    expect(progress.show).toBe(false);
  });

  it("calcula progresso entre criação e vencimento", () => {
    const now = new Date("2026-06-06T12:00:00.000Z").getTime();
    const progress = getDueProgress(baseTask, now);

    expect(progress.show).toBe(true);
    expect(progress.percent).toBe(50);
    expect(progress.startLabel).toBe("01/06/2026");
    expect(progress.endLabel).toBe("11/06/2026");
    expect(progress.variant).toBe("ok");
  });

  it("inicia em 0% na data de criação", () => {
    const now = new Date("2026-06-01T18:00:00.000Z").getTime();
    const progress = getDueProgress(baseTask, now);

    expect(progress.percent).toBe(0);
  });

  it("chega a 100% no dia do vencimento", () => {
    const now = new Date("2026-06-11T08:00:00.000Z").getTime();
    const progress = getDueProgress(baseTask, now);

    expect(progress.percent).toBe(100);
  });

  it("marca prazo vencido", () => {
    const now = new Date("2026-06-15T12:00:00.000Z").getTime();
    const progress = getDueProgress(baseTask, now);

    expect(progress.percent).toBe(100);
    expect(progress.variant).toBe("overdue");
    expect(progress.label).toBe("Prazo vencido");
  });
});
