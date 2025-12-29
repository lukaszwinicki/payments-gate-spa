import { api } from './api';
import type { Pinia } from 'pinia'
import type { ApiError } from '@/types/api/ApiErrorTypes'
import { useAuthStore } from '@/stores/auth';

export const setupInterceptors = (pinia: Pinia) => {
    api.interceptors.request.use((config) => {
        const token = localStorage.getItem('token');

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config;
    });

    let isLoggingOut = false

    api.interceptors.response.use(
        (response) => response,
        (error) => {
            const status = error.response?.status ?? 0
            const data = error.response?.data

            if (status === 401 && !isLoggingOut) {
                isLoggingOut = true
                const auth = useAuthStore(pinia)
                auth.logout()
            }

            let message = data?.message ?? 'Unexpected error'

            if (status === 422 && data?.error) {
                message = Object.values(data.error).flat().join(' ')
            }

            const apiError: ApiError = {
                status,
                message,
                errors: data?.errors,
                data,
            }

            return Promise.reject(apiError)
        }
    )
};