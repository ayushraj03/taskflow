import { useTasks } from '../../../hooks/useTasks';
import { getTaskCounts } from '../../../utils/taskUtils';
import styles from './TaskSummary.module.css';

const STATS = [
  {
    key: 'total',
    label: 'Total Tasks',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
        <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
        <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
        <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
      </svg>
    ),
    color: 'total',
  },
  {
    key: 'pending',
    label: 'Pending',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    color: 'pending',
  },
  {
    key: 'inProgress',
    label: 'In Progress',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    color: 'progress',
  },
  {
    key: 'completed',
    label: 'Completed',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: 'completed',
  },
];

export function TaskSummary() {
  const { tasks } = useTasks();
  const counts = getTaskCounts(tasks);

  const completionRate = counts.total > 0
    ? Math.round((counts.completed / counts.total) * 100)
    : 0;

  return (
    <div className={styles.wrapper}>
      <div className={styles.statsGrid}>
        {STATS.map((stat) => (
          <div key={stat.key} className={`${styles.statCard} ${styles[stat.color]}`}>
            <div className={styles.iconBox}>{stat.icon}</div>
            <div className={styles.statInfo}>
              <span className={styles.statValue}>{counts[stat.key]}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
            {stat.key === 'completed' && counts.total > 0 && (
              <div className={styles.progressRing}>
                <svg width="44" height="44" viewBox="0 0 44 44">
                  <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(16,185,129,0.15)" strokeWidth="3.5"/>
                  <circle
                    cx="22" cy="22" r="18" fill="none"
                    stroke="#10b981" strokeWidth="3.5"
                    strokeDasharray={`${(completionRate / 100) * 113} 113`}
                    strokeLinecap="round"
                    transform="rotate(-90 22 22)"
                  />
                </svg>
                <span className={styles.ringLabel}>{completionRate}%</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {counts.total > 0 && (
        <div className={styles.progressBar}>
          <div className={styles.progressLabel}>
            <span>Overall Progress</span>
            <span>{completionRate}% complete</span>
          </div>
          <div className={styles.track}>
            <div
              className={styles.fill}
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
