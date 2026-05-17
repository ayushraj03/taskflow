import { useState } from 'react';
import { TaskSummary } from '../../components/tasks/TaskSummary';
import { TaskFilter } from '../../components/tasks/TaskFilter';
import { TaskList } from '../../components/tasks/TaskList';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';
import { TaskForm } from '../../components/tasks/TaskForm';
import { useTasks } from '../../hooks/useTasks';
import styles from './AllTasksPage.module.css';

export function AllTasksPage() {
  const [addOpen, setAddOpen] = useState(false);
  const { addTask, tasks } = useTasks();

  const handleAdd = (values) => {
    addTask(values);
    setAddOpen(false);
  };

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Task Dashboard</h1>
          <p className={styles.pageSubtitle}>
            Manage and track your team's progress — {tasks.length} task{tasks.length !== 1 ? 's' : ''} total
          </p>
        </div>
        <Button
          variant="primary"
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

      <section className={styles.section}>
        <TaskSummary />
      </section>

      <section className={styles.section}>
        <TaskFilter />
      </section>

      <section>
        <TaskList />
      </section>

      <Modal isOpen={addOpen} onClose={() => setAddOpen(false)} title="Create New Task">
        <TaskForm
          onSubmit={handleAdd}
          onCancel={() => setAddOpen(false)}
          submitLabel="Create Task"
        />
      </Modal>
    </div>
  );
}
