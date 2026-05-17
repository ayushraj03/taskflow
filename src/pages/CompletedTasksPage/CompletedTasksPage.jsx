import { useTasks } from '../../hooks/useTasks';
import { TaskList } from '../../components/tasks/TaskList';
import { TaskSummary } from '../../components/tasks/TaskSummary';
import { TaskStatus } from '../../types/task.types';
import { getTaskCounts } from '../../utils/taskUtils';
import styles from './CompletedTasksPage.module.css';

export function CompletedTasksPage() {
  const { tasks } = useTasks();
  const counts = getTaskCounts(tasks);

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div className={styles.heroIcon}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <h1 className={styles.pageTitle}>Completed Tasks</h1>
          <p className={styles.pageSubtitle}>
            {counts.completed} task{counts.completed !== 1 ? 's' : ''} completed
            {counts.total > 0 && ` · ${Math.round((counts.completed / counts.total) * 100)}% of total`}
          </p>
        </div>
      </div>

      {counts.total > 0 && (
        <section className={styles.section}>
          <TaskSummary />
        </section>
      )}

      <section>
        <TaskList overrideFilter={TaskStatus.COMPLETED} />
      </section>
    </div>
  );
}
