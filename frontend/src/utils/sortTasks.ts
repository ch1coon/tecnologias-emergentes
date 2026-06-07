import { Task, TaskSortBy } from "../types/task";

function dueDateValue(task: Task, sortBy: TaskSortBy): number {
  if (!task.dueDate) {
    return sortBy === "dueDate_asc" ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
  }
  return new Date(task.dueDate).getTime();
}

export function sortTasks(tasks: Task[], sortBy?: TaskSortBy | ""): Task[] {
  if (!sortBy) return tasks;

  const sorted = [...tasks];

  sorted.sort((a, b) => {
    if (sortBy === "dueDate_asc") {
      return dueDateValue(a, sortBy) - dueDateValue(b, sortBy);
    }

    return dueDateValue(b, sortBy) - dueDateValue(a, sortBy);
  });

  return sorted;
}
