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

            if (status === 401 && !isLoggingOut) {
                isLoggingOut = true
                const auth = useAuthStore(pinia)
                auth.logout()
            }

            const apiError: ApiError = {
                status,
                message: error.response?.data?.message ?? 'Unexpected error',
                errors: error.response?.data?.errors,
                data: error.response?.data,
            }

            return Promise.reject(apiError)
        }
    )
};