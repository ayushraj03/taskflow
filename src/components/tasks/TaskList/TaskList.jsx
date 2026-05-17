import { useTasks } from '../../../hooks/useTasks';
import { filterTasks, sortTasks } from '../../../utils/taskUtils';
import { TaskCard } from '../TaskCard';
import styles from './TaskList.module.css';

export function TaskList({ overrideFilter }) {
  const { tasks, filterStatus, sortKey } = useTasks();

  const activeFilter = overrideFilter !== undefined ? overrideFilter : filterStatus;
  const filtered = filterTasks(tasks, activeFilter);
  const sorted = sortTasks(filtered, sortKey);

  if (sorted.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <rect x="9" y="3" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <p className={styles.emptyTitle}>No tasks found</p>
        <p className={styles.emptySubtitle}>
          {activeFilter === 'all'
            ? 'Add your first task to get started.'
            : `No tasks with "${activeFilter}" status.`}
        </p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {sorted.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
