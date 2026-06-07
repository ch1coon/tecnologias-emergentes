import { describe, expect, it } from "vitest";
import { formatDate, priorityLabels, statusLabels } from "./labels";

describe("labels", () => {
  it("traduz status e prioridade", () => {
    expect(statusLabels.PENDENTE).toBe("Pendente");
    expect(priorityLabels.ALTA).toBe("Alta");
  });

  it("formata data em pt-BR", () => {
    expect(formatDate("2026-06-07T12:00:00.000Z")).toMatch(/\d{2}\/\d{2}\/2026/);
    expect(formatDate(null)).toBe("—");
  });
});
