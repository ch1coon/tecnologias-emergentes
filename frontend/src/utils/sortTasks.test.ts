import { describe, expect, it } from "vitest";
import { Task } from "../types/task";
import { sortTasks } from "./sortTasks";

const tasks: Task[] = [
  {
    id: "1",
    title: "Sem data",
    description: null,
    status: "PENDENTE",
    priority: "MEDIA",
    dueDate: null,
    createdAt: "2026-06-01T00:00:00.000Z",
    updatedAt: "2026-06-01T00:00:00.000Z",
  },
  {
    id: "2",
    title: "Longe",
    description: null,
    status: "PENDENTE",
    priority: "MEDIA",
    dueDate: "2026-06-20T00:00:00.000Z",
    createdAt: "2026-06-01T00:00:00.000Z",
    updatedAt: "2026-06-01T00:00:00.000Z",
  },
  {
    id: "3",
    title: "Próximo",
    description: null,
    status: "PENDENTE",
    priority: "MEDIA",
    dueDate: "2026-06-05T00:00:00.000Z",
    createdAt: "2026-06-01T00:00:00.000Z",
    updatedAt: "2026-06-01T00:00:00.000Z",
  },
];

describe("sortTasks", () => {
  it("ordena por vencimento mais próximo", () => {
    const sorted = sortTasks(tasks, "dueDate_asc");
    expect(sorted.map((task) => task.id)).toEqual(["3", "2", "1"]);
  });

  it("ordena por vencimento mais distante", () => {
    const sorted = sortTasks(tasks, "dueDate_desc");
    expect(sorted.map((task) => task.id)).toEqual(["2", "3", "1"]);
  });
});
