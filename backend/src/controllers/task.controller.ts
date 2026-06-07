import { Request, Response, NextFunction } from "express";
import { TaskService } from "../services/task.service";
import { createTaskSchema, taskFiltersSchema, updateTaskSchema } from "../validators/task.validator";

function getParamId(req: Request): string {
  const id = req.params.id;
  return Array.isArray(id) ? id[0] : id;
}

export class TaskController {
  constructor(private readonly service: TaskService) {}

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = createTaskSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({ error: "Dados inválidos", details: parsed.error.flatten() });
        return;
      }

      const task = await this.service.create(parsed.data);
      res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  };

  list = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = taskFiltersSchema.safeParse(req.query);
      if (!parsed.success) {
        res.status(400).json({ error: "Filtros inválidos", details: parsed.error.flatten() });
        return;
      }

      const tasks = await this.service.list(parsed.data);
      res.json(tasks);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const task = await this.service.getById(getParamId(req));
      res.json(task);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = updateTaskSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({ error: "Dados inválidos", details: parsed.error.flatten() });
        return;
      }

      const task = await this.service.update(getParamId(req), parsed.data);
      res.json(task);
    } catch (error) {
      next(error);
    }
  };

  remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.service.delete(getParamId(req));
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
