import { defineStore } from 'pinia'
import { api } from '@/lib/http/api'
import router from '@/router'
import type {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
    ForgotPasswordRequest,
    ForgotPasswordResponse,
    ResetPasswordRequest,
    ResetPasswordResponse,
} from '@/types/auth/AuthTypes'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') as string | null,
        expiresAt: localStorage.getItem('expiresAt') as string | null
    }),

    getters: {
        isAuthenticated: (state) => !!state.token
    },

    actions: {
        async login(payload: LoginRequest) {
            const { data } = await api.post<LoginResponse>('/login', payload)
            this.token = data.token
            this.expiresAt = data.expiresAt
            localStorage.setItem('token', data.token)
            localStorage.setItem('expiresAt', data.expiresAt)
            router.push({ name: 'dashboard' })
        },

        async register(payload: RegisterRequest) {
            const { data } = await api.post<RegisterResponse>('/register', payload)
            this.token = data.token
            this.expiresAt = data.expiresAt
            localStorage.setItem('token', data.token)
            localStorage.setItem('expiresAt', data.expiresAt)
            router.push({ name: 'dashboard' })
        },

        logout() {
            this.token = null
            this.expiresAt = null
            localStorage.removeItem('token')
            localStorage.removeItem('expiresAt')
            router.push({ name: 'login' })
        },

        async forgotPassword(payload: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
            const { data } = await api.post<ForgotPasswordResponse>('/forgot-password', payload)
            return data
        },

        async resetPassword(payload: ResetPasswordRequest): Promise<ResetPasswordResponse> {
            const { data } = await api.post<ResetPasswordResponse>('/reset-password', payload)
            return data
        }
    }
}) 