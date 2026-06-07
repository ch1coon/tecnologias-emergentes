import { Task } from "../types/task";
import { formatDate } from "./labels";

export type DueProgressVariant = "ok" | "warning" | "danger" | "overdue";

const DAY_MS = 24 * 60 * 60 * 1000;

export interface DueProgress {
  show: boolean;
  percent: number;
  label: string;
  startLabel: string;
  endLabel: string;
  variant: DueProgressVariant;
}

function startOfDay(timestamp: number): number {
  const date = new Date(timestamp);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

export function getDueProgress(task: Task, now = Date.now()): DueProgress {
  if (task.status === "CONCLUIDA" || !task.dueDate) {
    return { show: false, percent: 0, label: "", startLabel: "", endLabel: "", variant: "ok" };
  }

  const start = startOfDay(new Date(task.createdAt).getTime());
  let end = startOfDay(new Date(task.dueDate).getTime());

  if (end < start) {
    return {
      show: true,
      percent: 100,
      label: "Prazo vencido",
      startLabel: formatDate(task.createdAt),
      endLabel: formatDate(task.dueDate),
      variant: "overdue",
    };
  }

  if (end === start) {
    end = start + DAY_MS;
  }

  const today = startOfDay(now);
  const total = end - start;
  const elapsed = today - start;
  const percent = Math.min(100, Math.max(0, (elapsed / total) * 100));
  const daysLeft = Math.max(0, Math.ceil((end - today) / DAY_MS));

  const startLabel = formatDate(task.createdAt);
  const endLabel = formatDate(task.dueDate);

  if (today > end) {
    return {
      show: true,
      percent: 100,
      label: "Prazo vencido",
      startLabel,
      endLabel,
      variant: "overdue",
    };
  }

  if (percent >= 85 || daysLeft <= 1) {
    return {
      show: true,
      percent,
      label: daysLeft <= 1 ? "Vence hoje" : `${daysLeft} dias restantes`,
      startLabel,
      endLabel,
      variant: "danger",
    };
  }

  if (percent >= 60) {
    return {
      show: true,
      percent,
      label: `${daysLeft} dias restantes`,
      startLabel,
      endLabel,
      variant: "warning",
    };
  }

  return {
    show: true,
    percent,
    label: `${daysLeft} dias restantes`,
    startLabel,
    endLabel,
    variant: "ok",
  };
}
