import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Task } from '@/shared/types';

export const tasksApi = createApi({
    reducerPath: 'tasksApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api',
    }),
    tagTypes: ['Task'],
    endpoints: (builder) => ({
        getTasks: builder.query<Task[], void>({
            query: () => '/tasks',
            providesTags: ['Task'],
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
