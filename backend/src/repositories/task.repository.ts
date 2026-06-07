import { Prisma, Task } from "@prisma/client";
import { CreateTaskInput, TaskFilters, UpdateTaskInput } from "../types/task";

export interface ITaskRepository {
  create(data: CreateTaskInput): Promise<Task>;
  findAll(filters?: TaskFilters): Promise<Task[]>;
  findById(id: string): Promise<Task | null>;
  update(id: string, data: UpdateTaskInput): Promise<Task>;
  delete(id: string): Promise<void>;
}

export class PrismaTaskRepository implements ITaskRepository {
  constructor(private readonly prisma: Prisma.TransactionClient | import("@prisma/client").PrismaClient) {}

  async create(data: CreateTaskInput): Promise<Task> {
    return this.prisma.task.create({
      data: {
        title: data.title,
        description: data.description ?? null,
        status: data.status,
        priority: data.priority,
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
      },
    });
  }

  async findAll(filters?: TaskFilters): Promise<Task[]> {
    const where: Prisma.TaskWhereInput = {};

    if (filters?.status) {
      where.status = filters.status;
    }

    if (filters?.priority) {
      where.priority = filters.priority;
    }

    if (filters?.search) {
      where.title = { contains: filters.search, mode: "insensitive" };
    }

    return this.prisma.task.findMany({
      where,
      orderBy: [{ priority: "desc" }, { createdAt: "desc" }],
    });
  }

  async findById(id: string): Promise<Task | null> {
    return this.prisma.task.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdateTaskInput): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
        priority: data.priority,
        dueDate: data.dueDate === undefined ? undefined : data.dueDate ? new Date(data.dueDate) : null,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.task.delete({ where: { id } });
  }
}
