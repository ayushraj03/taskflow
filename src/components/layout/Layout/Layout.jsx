import { Header } from '../Header';
import styles from './Layout.module.css';

export function Layout({ children }) {
  return (
    <div className={styles.root}>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>{children}</div>
      </main>
    </div>
  );
}
