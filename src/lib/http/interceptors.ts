import { api } from './api';
import type { Pinia } from 'pinia'
import type { Router } from 'vue-router'
import type { ApiError } from '@/types/api/ApiErrorTypes'
import { useAuthStore } from '@/stores/auth';

export const setupInterceptors = (pinia: Pinia, router: Router) => {
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
            if (error.code === 'ERR_NETWORK') {
                return Promise.reject({
                    status: 0,
                    message: 'Cannot connect to server',
                })
            }

            const response = error.response

            if (
                response &&
                typeof response.data === 'string'
            ) {
                return Promise.reject({
                    status: 0,
                    message: 'Backend is not running',
                })
            }

            const status = error.response?.status ?? 0
            const data = error.response?.data

            if (status === 401 && !isLoggingOut) {
                isLoggingOut = true
                const auth = useAuthStore(pinia)
                auth.logout()
                if (router.currentRoute.value.name !== 'unauthorized') {
                    router.push({ name: 'unauthorized' })
                }
                return Promise.reject({
                    status,
                    message: data?.message ?? 'Unauthorized',
                    errors: data?.errors,
                    data,
                } as ApiError)
            }

            if (status === 400 && router.currentRoute.value.name !== 'bad-request') {
                router.push({ name: 'bad-request' })
                return Promise.reject({
                    status,
                    message: data?.message ?? 'Bad Request',
                    errors: data?.errors,
                    data,
                } as ApiError)
            }

            if (status === 403 && router.currentRoute.value.name !== 'forbidden') {
                router.push({ name: 'forbidden' })
                return Promise.reject({
                    status,
                    message: data?.message ?? 'Forbidden',
                    errors: data?.errors,
                    data,
                } as ApiError)
            }

            if (status === 422 && router.currentRoute.value.name !== 'unprocessable-entity') {
                router.push({ name: 'unprocessable-entity' })
                return Promise.reject({
                    status,
                    message: data?.message ?? 'Unprocessable Entity',
                    errors: data?.errors,
                    data,
                } as ApiError)
            }

            if (status === 500 && router.currentRoute.value.name !== 'internal-server-error') {
                router.push({ name: 'internal-server-error' })
                return Promise.reject({
                    status,
                    message: data?.message ?? 'Internal Server Error',
                    errors: data?.errors,
                    data,
                } as ApiError)
            }

            if (status === 503 && router.currentRoute.value.name !== 'service-unavailable') {
                router.push({ name: 'service-unavailable' })
                return Promise.reject({
                    status,
                    message: data?.message ?? 'Service Unavailable',
                    errors: data?.errors,
                    data,
                } as ApiError)
            }

            let message = data?.message ?? 'Unexpected error'

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