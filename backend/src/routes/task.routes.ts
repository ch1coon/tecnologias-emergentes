import { Router } from "express";
import { TaskController } from "../controllers/task.controller";

export function createTaskRouter(controller: TaskController): Router {
  const router = Router();

  router.get("/", controller.list);
  router.get("/:id", controller.getById);
  router.post("/", controller.create);
  router.put("/:id", controller.update);
  router.delete("/:id", controller.remove);

  return router;
}
