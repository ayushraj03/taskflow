/**
 * @typedef {'pending' | 'in-progress' | 'completed'} TaskStatus
 *
 * @typedef {Object} Task
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {TaskStatus} status
 * @property {string} dueDate  - ISO date string YYYY-MM-DD
 * @property {string} createdAt
 * @property {string} updatedAt
 */

export const TaskStatus = {
  PENDING: 'pending',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
};

export const StatusLabels = {
  [TaskStatus.PENDING]: 'Pending',
  [TaskStatus.IN_PROGRESS]: 'In Progress',
  [TaskStatus.COMPLETED]: 'Completed',
};
