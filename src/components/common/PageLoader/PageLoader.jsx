import styles from './PageLoader.module.css';

export function PageLoader() {
  return (
    <div className={styles.wrapper} role="status" aria-label="Loading page">
      <div className={styles.spinner} />
      <span className={styles.label}>Loading…</span>
    </div>
  );
}
