import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DatePicker } from "./DatePicker";

describe("DatePicker", () => {
  it("abre o calendário e seleciona uma data", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<DatePicker value="" onChange={onChange} />);

    await user.click(screen.getByRole("button", { name: /vencimento/i }));

    expect(screen.getByRole("dialog", { name: /selecionar data/i })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "15" }));

    expect(onChange).toHaveBeenCalled();
    expect(onChange.mock.calls[0][0]).toMatch(/^\d{4}-\d{2}-15$/);
  });

  it("limpa a data selecionada", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<DatePicker value="2026-06-07" onChange={onChange} />);

    await user.click(screen.getByRole("button", { name: "Limpar data" }));

    expect(onChange).toHaveBeenCalledWith("");
  });
});
