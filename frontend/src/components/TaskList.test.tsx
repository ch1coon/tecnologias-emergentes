import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Task } from "../types/task";
import { TaskList } from "./TaskList";

const sampleTask: Task = {
  id: "1",
  title: "Tarefa de teste",
  description: "Descrição",
  status: "PENDENTE",
  priority: "MEDIA",
  dueDate: null,
  createdAt: "2026-06-01T00:00:00.000Z",
  updatedAt: "2026-06-01T00:00:00.000Z",
};

describe("TaskList", () => {
  it("exibe estado de carregamento", () => {
    render(
      <TaskList tasks={[]} loading onEdit={vi.fn()} onDelete={vi.fn()} onView={vi.fn()} />,
    );
    expect(screen.getByText("Carregando tarefas...")).toBeInTheDocument();
  });

  it("exibe mensagem quando lista está vazia", () => {
    render(
      <TaskList tasks={[]} loading={false} onEdit={vi.fn()} onDelete={vi.fn()} onView={vi.fn()} />,
    );
    expect(screen.getByText("Nenhuma tarefa encontrada.")).toBeInTheDocument();
  });

  it("exibe barra de progresso para tarefas não concluídas com vencimento", () => {
    render(
      <TaskList
        tasks={[
          {
            ...sampleTask,
            dueDate: "2026-06-11T12:00:00.000Z",
          },
        ]}
        loading={false}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onView={vi.fn()}
      />,
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("não exibe barra para tarefas concluídas", () => {
    render(
      <TaskList
        tasks={[{ ...sampleTask, status: "CONCLUIDA", dueDate: "2026-06-11T12:00:00.000Z" }]}
        loading={false}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onView={vi.fn()}
      />,
    );

    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
  });

  it("renderiza tarefas e dispara ações", async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    const onView = vi.fn();

    render(
      <TaskList
        tasks={[sampleTask]}
        loading={false}
        onEdit={onEdit}
        onDelete={onDelete}
        onView={onView}
      />,
    );

    expect(screen.getByText("Tarefa de teste")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Editar" }));
    await user.click(screen.getByRole("button", { name: "Excluir" }));
    await user.click(screen.getByRole("button", { name: "Detalhes" }));

    expect(onEdit).toHaveBeenCalledWith(sampleTask);
    expect(onDelete).toHaveBeenCalledWith(sampleTask);
    expect(onView).toHaveBeenCalledWith(sampleTask);
  });
});
