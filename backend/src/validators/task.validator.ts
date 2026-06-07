import { TaskPriority, TaskStatus } from "@prisma/client";
import { z } from "zod";

const statusEnum = z.nativeEnum(TaskStatus);
const priorityEnum = z.nativeEnum(TaskPriority);

export const createTaskSchema = z.object({
  title: z.string().trim().min(1, "Título é obrigatório").max(120, "Título muito longo"),
  description: z.string().trim().max(500, "Descrição muito longa").optional().nullable(),
  status: statusEnum.optional(),
  priority: priorityEnum.optional(),
  dueDate: z.string().datetime().optional().nullable(),
});

export const updateTaskSchema = createTaskSchema.partial();

export const taskFiltersSchema = z.object({
  status: statusEnum.optional(),
  priority: priorityEnum.optional(),
  search: z.string().trim().max(120).optional(),
});
