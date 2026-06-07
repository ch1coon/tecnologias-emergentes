import { Task } from "../types/task";
import { getDueProgress } from "../utils/dueProgress";

interface TaskDueProgressProps {
  task: Task;
}

export function TaskDueProgress({ task }: TaskDueProgressProps) {
  const progress = getDueProgress(task);

  if (!progress.show) return null;

  return (
    <div className="task-due-progress">
      <div className="task-due-progress-meta">
        <span>{progress.label}</span>
      </div>

      <div className="task-due-progress-timeline">
        <span className="task-due-progress-date">{progress.startLabel}</span>

        <div
          className="task-due-progress-track"
          role="progressbar"
          aria-valuenow={Math.round(progress.percent)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Progresso de ${progress.startLabel} até ${progress.endLabel}`}
        >
          <div
            className={`task-due-progress-fill ${progress.variant}`}
            style={{ width: `${progress.percent}%` }}
          />
          <span
            className="task-due-progress-marker"
            style={{ left: `${progress.percent}%` }}
            aria-hidden="true"
          />
        </div>

        <span className="task-due-progress-date">{progress.endLabel}</span>
      </div>
    </div>
  );
}
