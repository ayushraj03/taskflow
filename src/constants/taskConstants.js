import { TaskStatus } from '../types/task.types';

export const STATUS_OPTIONS = [
  { value: TaskStatus.PENDING, label: 'Pending' },
  { value: TaskStatus.IN_PROGRESS, label: 'In Progress' },
  { value: TaskStatus.COMPLETED, label: 'Completed' },
];

export const FILTER_OPTIONS = [
  { value: 'all', label: 'All Tasks' },
  { value: TaskStatus.PENDING, label: 'Pending' },
  { value: TaskStatus.IN_PROGRESS, label: 'In Progress' },
  { value: TaskStatus.COMPLETED, label: 'Completed' },
];

export const SORT_OPTIONS = [
  { value: 'dueDate-asc', label: 'Due Date (Earliest)' },
  { value: 'dueDate-desc', label: 'Due Date (Latest)' },
  { value: 'createdAt-desc', label: 'Newest First' },
  { value: 'createdAt-asc', label: 'Oldest First' },
  { value: 'title-asc', label: 'Title A–Z' },
];

export const LOCAL_STORAGE_KEY = 'taskflow_tasks';

export const INITIAL_TASKS = [
  {
    id: '1',
    title: 'Design system architecture',
    description: 'Plan the overall system architecture for the new microservices platform, including API contracts and data flow diagrams.',
    status: TaskStatus.COMPLETED,
    dueDate: '2026-05-10',
    createdAt: new Date('2026-05-01').toISOString(),
    updatedAt: new Date('2026-05-10').toISOString(),
  },
  {
    id: '2',
    title: 'Implement authentication module',
    description: 'Build JWT-based authentication with refresh token rotation. Include OAuth2 social login for Google and GitHub.',
    status: TaskStatus.IN_PROGRESS,
    dueDate: '2026-05-22',
    createdAt: new Date('2026-05-05').toISOString(),
    updatedAt: new Date('2026-05-14').toISOString(),
  },
  {
    id: '3',
    title: 'Write unit tests for core services',
    description: 'Achieve 80% code coverage for all core business logic services using Vitest and React Testing Library.',
    status: TaskStatus.PENDING,
    dueDate: '2026-05-28',
    createdAt: new Date('2026-05-08').toISOString(),
    updatedAt: new Date('2026-05-08').toISOString(),
  },
  {
    id: '4',
    title: 'Set up CI/CD pipeline',
    description: 'Configure GitHub Actions workflows for automated testing, linting, and deployment to staging and production environments.',
    status: TaskStatus.IN_PROGRESS,
    dueDate: '2026-05-20',
    createdAt: new Date('2026-05-10').toISOString(),
    updatedAt: new Date('2026-05-15').toISOString(),
  },
  {
    id: '5',
    title: 'Database schema migration',
    description: 'Migrate legacy PostgreSQL schema to the new normalized structure. Include rollback scripts and data validation steps.',
    status: TaskStatus.PENDING,
    dueDate: '2026-06-05',
    createdAt: new Date('2026-05-12').toISOString(),
    updatedAt: new Date('2026-05-12').toISOString(),
  },
  {
    id: '6',
    title: 'API documentation',
    description: 'Generate comprehensive OpenAPI 3.0 documentation for all REST endpoints. Publish to internal developer portal.',
    status: TaskStatus.PENDING,
    dueDate: '2026-06-01',
    createdAt: new Date('2026-05-13').toISOString(),
    updatedAt: new Date('2026-05-13').toISOString(),
  },
];
