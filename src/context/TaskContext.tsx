import { createContext, useContext, useState, ReactNode } from 'react';
import { Task } from '@/types';

export interface TaskContextType {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Пофиксить баг в login',
    description: 'Ошибка при входе на страницу профиля',
    category: 'Bug',
    status: 'To Do',
    priority: 'High',
  },
  {
    id: '2',
    title: 'Написать документацию',
    description: 'Добавить раздел API в документацию',
    category: 'Documentation',
    status: 'In Progress',
    priority: 'Medium',
  },
  {
    id: '3',
    title: 'Сделать рефактор структуры проекта',
    description: 'Улучшить структуру папок и файлов',
    category: 'Refactor',
    status: 'To Do',
    priority: 'Low',
  },
  {
    id: '4',
    title: 'Добавить юнит тесты',
    description: 'Покрыть основные функции тестами',
    category: 'Test',
    status: 'Done',
    priority: 'Medium',
  },
  {
    id: '5',
    title: 'Добавить фичу',
    description: 'Добавить фильтрацию задач по статусу',
    category: 'Feature',
    status: 'In Progress',
    priority: 'High',
  },
];

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addTask = (task: Task) => setTasks((prev) => [...prev, task]);
  const updateTask = (updated: Task) =>
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));

  return (
    <TaskContext.Provider value={{ tasks, setTasks, addTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTaskContext must be used within TaskProvider');
  return context;
}
