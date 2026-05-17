import { useTasks } from '../../../hooks/useTasks';
import { FILTER_OPTIONS, SORT_OPTIONS } from '../../../constants/taskConstants';
import styles from './TaskFilter.module.css';

export function TaskFilter() {
  const { filterStatus, setFilterStatus, sortKey, setSortKey } = useTasks();

  return (
    <div className={styles.toolbar}>
      <div className={styles.filterGroup}>
        {FILTER_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            className={`${styles.filterBtn} ${filterStatus === opt.value ? styles.active : ''}`}
            onClick={() => setFilterStatus(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className={styles.sortGroup}>
        <span className={styles.sortLabel}>
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Sort
        </span>
        <div className={styles.selectWrapper}>
          <select
            className={styles.sortSelect}
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
            aria-label="Sort tasks"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <svg className={styles.selectArrow} width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
