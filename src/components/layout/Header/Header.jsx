import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Modal } from '../../common/Modal';
import { Button } from '../../common/Button';
import { TaskForm } from '../../tasks/TaskForm';
import { useTasks } from '../../../hooks/useTasks';
import styles from './Header.module.css';

export function Header() {
  const [addOpen, setAddOpen] = useState(false);
  const { addTask } = useTasks();

  const handleAdd = (values) => {
    addTask(values);
    setAddOpen(false);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <span className={styles.brandName}>TaskFlow</span>
          </div>

          <nav className={styles.nav}>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
              }
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
                <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
                <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
                <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
              </svg>
              All Tasks
            </NavLink>
            <NavLink
              to="/completed"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
              }
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Completed
            </NavLink>
          </nav>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setAddOpen(true)}
            icon={
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            }
          >
            New Task
          </Button>
        </div>
      </header>

      <Modal isOpen={addOpen} onClose={() => setAddOpen(false)} title="Create New Task">
        <TaskForm
          onSubmit={handleAdd}
          onCancel={() => setAddOpen(false)}
          submitLabel="Create Task"
        />
      </Modal>
    </>
  );
}
