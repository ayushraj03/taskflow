import { createContext, useCallback, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { LOCAL_STORAGE_KEY, INITIAL_TASKS } from '../constants/taskConstants';
import { generateId } from '../utils/taskUtils';
import { TaskStatus } from '../types/task.types';

export const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useLocalStorage(LOCAL_STORAGE_KEY, INITIAL_TASKS);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortKey, setSortKey] = useState('dueDate-asc');

  const addTask = useCallback((formValues) => {
    const now = new Date().toISOString();
    const newTask = {
      id: generateId(),
      title: formValues.title.trim(),
      description: formValues.description?.trim() || '',
      status: formValues.status || TaskStatus.PENDING,
      dueDate: formValues.dueDate,
      createdAt: now,
      updatedAt: now,
    };
    setTasks((prev) => [newTask, ...prev]);
    return newTask;
  }, [setTasks]);

  const updateTask = useCallback((id, updates) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, ...updates, updatedAt: new Date().toISOString() }
          : t
      )
    );
  }, [setTasks]);

  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, [setTasks]);

  const getTaskById = useCallback((id) => {
    return tasks.find((t) => t.id === id) || null;
  }, [tasks]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filterStatus,
        setFilterStatus,
        sortKey,
        setSortKey,
        addTask,
        updateTask,
        deleteTask,
        getTaskById,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
