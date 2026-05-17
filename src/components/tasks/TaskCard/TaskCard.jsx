import { useState } from 'react';
import { Badge } from '../../common/Badge';
import { Button } from '../../common/Button';
import { Modal } from '../../common/Modal';
import { TaskForm } from '../TaskForm';
import { useTasks } from '../../../hooks/useTasks';
import { formatDate, isOverdue, isDueSoon, getStatusColor } from '../../../utils/taskUtils';
import { StatusLabels } from '../../../types/task.types';
import styles from './TaskCard.module.css';

export function TaskCard({ task }) {
  const { updateTask, deleteTask } = useTasks();
  const [editOpen, setEditOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const overdue = isOverdue(task.dueDate, task.status);
  const dueSoon = isDueSoon(task.dueDate, task.status);

  const handleEdit = (values) => {
    updateTask(task.id, values);
    setEditOpen(false);
  };

  const handleDelete = () => {
    deleteTask(task.id);
    setConfirmDelete(false);
  };

  return (
    <>
      <article className={`${styles.card} ${overdue ? styles.overdue : ''}`}>
        <div className={styles.header}>
          <Badge status={getStatusColor(task.status)}>
            {StatusLabels[task.status]}
          </Badge>
          {overdue && <span className={styles.overdueChip}>Overdue</span>}
          {!overdue && dueSoon && <span className={styles.dueSoonChip}>Due soon</span>}
        </div>

        <h3 className={styles.title}>{task.title}</h3>

        {task.description && (
          <p className={styles.description}>{task.description}</p>
        )}

        <div className={styles.footer}>
          <div className={styles.dateBlock}>
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" className={styles.calIcon}>
              <rect x="1" y="3" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.4"/>
              <path d="M5 1v4M11 1v4M1 7h14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            <span className={`${styles.dueDate} ${overdue ? styles.overdueDateText : ''}`}>
              {formatDate(task.dueDate)}
            </span>
          </div>

          <div className={styles.actions}>
            <button
              className={styles.iconBtn}
              onClick={() => setEditOpen(true)}
              aria-label="Edit task"
              title="Edit"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M11.5 2.5a1.5 1.5 0 012.12 2.12l-8.5 8.5-3 .88.88-3 8.5-8.5z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              className={`${styles.iconBtn} ${styles.deleteBtn}`}
              onClick={() => setConfirmDelete(true)}
              aria-label="Delete task"
              title="Delete"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 10h8l1-10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </article>

      <Modal isOpen={editOpen} onClose={() => setEditOpen(false)} title="Edit Task">
        <TaskForm
          initialValues={task}
          onSubmit={handleEdit}
          onCancel={() => setEditOpen(false)}
          submitLabel="Update Task"
        />
      </Modal>

      <Modal isOpen={confirmDelete} onClose={() => setConfirmDelete(false)} title="Delete Task" size="sm">
        <div className={styles.deleteConfirm}>
          <div className={styles.deleteIcon}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M12 9v4M12 17h.01" stroke="#f87171" strokeWidth="2" strokeLinecap="round"/>
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#f87171" strokeWidth="1.8"/>
            </svg>
          </div>
          <p className={styles.deleteMsg}>
            Are you sure you want to delete <strong>"{task.title}"</strong>? This action cannot be undone.
          </p>
          <div className={styles.deleteActions}>
            <Button variant="secondary" onClick={() => setConfirmDelete(false)}>Cancel</Button>
            <Button variant="danger" onClick={handleDelete}>Delete Task</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
