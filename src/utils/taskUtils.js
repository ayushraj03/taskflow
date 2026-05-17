import { TaskStatus } from '../types/task.types';

export function generateId() {
  return `task_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function formatDate(dateStr) {
  if (!dateStr) return '—';
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function isOverdue(dueDate, status) {
  if (status === TaskStatus.COMPLETED) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate + 'T00:00:00');
  return due < today;
}

export function isDueSoon(dueDate, status) {
  if (status === TaskStatus.COMPLETED) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate + 'T00:00:00');
  const diff = (due - today) / (1000 * 60 * 60 * 24);
  return diff >= 0 && diff <= 2;
}

export function filterTasks(tasks, filterStatus) {
  if (filterStatus === 'all') return tasks;
  return tasks.filter((t) => t.status === filterStatus);
}

export function sortTasks(tasks, sortKey) {
  const sorted = [...tasks];
  switch (sortKey) {
    case 'dueDate-asc':
      return sorted.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    case 'dueDate-desc':
      return sorted.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
    case 'createdAt-desc':
      return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    case 'createdAt-asc':
      return sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    case 'title-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return sorted;
  }
}

export function getTaskCounts(tasks) {
  return {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === TaskStatus.PENDING).length,
    inProgress: tasks.filter((t) => t.status === TaskStatus.IN_PROGRESS).length,
    completed: tasks.filter((t) => t.status === TaskStatus.COMPLETED).length,
  };
}

export function getStatusColor(status) {
  const map = {
    [TaskStatus.PENDING]: 'pending',
    [TaskStatus.IN_PROGRESS]: 'in-progress',
    [TaskStatus.COMPLETED]: 'completed',
  };
  return map[status] || 'pending';
}
