import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '@/types';

interface TasksState {
    tasks: Task[];
}

const initialTasks: Task[] = [
    {
        id: '1',
        title: 'Fix login bug',
        description: 'Ошибка при входе на страницу профиля',
        category: 'Bug',
        status: 'To Do',
        priority: 'High',
    },
    {
        id: '2',
        title: 'Write documentation',
        description: 'Добавить раздел API в документацию',
        category: 'Documentation',
        status: 'In Progress',
        priority: 'Medium',
    },
    {
        id: '3',
        title: 'Refactor project structure',
        description: 'Улучшить структуру папок и файлов',
        category: 'Refactor',
        status: 'To Do',
        priority: 'Low',
    },
    {
        id: '4',
        title: 'Add unit tests',
        description: 'Покрыть основные функции тестами',
        category: 'Test',
        status: 'Done',
        priority: 'Medium',
    },
    {
        id: '5',
        title: 'Implement new feature',
        description: 'Добавить фильтрацию задач по статусу',
        category: 'Feature',
        status: 'In Progress',
        priority: 'High',
    },
];

const initialState: TasksState = {
    tasks: initialTasks,
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        createTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload);
        },
        updateTask: (state, action: PayloadAction<Task>) => {
            const index = state.tasks.findIndex(task => task.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        },
    },
});

export const { createTask, updateTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
