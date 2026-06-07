import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import { TaskController } from "./controllers/task.controller";
import { TaskNotFoundError } from "./services/task.service";
import { prisma } from "./lib/prisma";
import { PrismaTaskRepository } from "./repositories/task.repository";
import { createTaskRouter } from "./routes/task.routes";
import { TaskService } from "./services/task.service";

export function createApp() {
  const app = express();

  const repository = new PrismaTaskRepository(prisma);
  const service = new TaskService(repository);
  const controller = new TaskController(service);

  app.use(cors({ origin: process.env.CORS_ORIGIN ?? "http://localhost:5173" }));
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({ status: "ok", service: "taskflow-api" });
  });

  app.use("/api/tasks", createTaskRouter(controller));

  app.use((_req, res) => {
    res.status(404).json({ error: "Rota não encontrada" });
  });

  app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
    if (error instanceof TaskNotFoundError) {
      res.status(404).json({ error: error.message });
      return;
    }
    console.error(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  });

  return app;
}
