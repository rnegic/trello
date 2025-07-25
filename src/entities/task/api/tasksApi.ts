import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Task } from '@/shared/types';

export const tasksApi = createApi({
    reducerPath: 'tasksApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://trello-api-git-main-rnegs-projects.vercel.app/api',
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    tagTypes: ['Task'],
    endpoints: (builder) => ({
        getTasks: builder.query<Task[], void>({
            query: () => '/tasks',
            providesTags: ['Task'],
            transformResponse: (response: any): Task[] => {
                console.log('API Response:', response);
                // Убеждаемся, что ответ является массивом
                if (Array.isArray(response)) {
                    return response;
                }
                // Если ответ содержит данные в поле (например, { data: [...] })
                if (response && Array.isArray(response.data)) {
                    return response.data;
                }
                // Если ответ содержит tasks в поле (например, { tasks: [...] })
                if (response && Array.isArray(response.tasks)) {
                    return response.tasks;
                }
                // В случае неожиданного формата возвращаем пустой массив
                console.warn('Unexpected response format:', response);
                return [];
            },
        }),
        createTask: builder.mutation<Task, Omit<Task, 'id'>>({
            query: (task) => ({
                url: '/tasks',
                method: 'POST',
                body: task,
            }),
            invalidatesTags: ['Task'],
        }),
        updateTask: builder.mutation<Task, Task>({
            query: (task) => ({
                url: `/tasks/${task.id}`,
                method: 'PUT',
                body: task,
            }),
            invalidatesTags: ['Task'],
        }),
        deleteTask: builder.mutation<void, string>({
            query: (id) => ({
                url: `/tasks/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Task'],
        }),
    }),
});

export const {
    useGetTasksQuery,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
} = tasksApi;
