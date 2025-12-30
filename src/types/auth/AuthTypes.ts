export interface User {
    id: number
    merchantId: number
    name: string
    email: string
    emailVerifiedAt: string | null
    createdAt: string
    updatedAt: string
}

export interface LoginRequest {
    email: string
    password: string
}

export interface LoginResponse {
    token: string
    expiresAt: string
    user: User
}

export interface RegisterRequest {
    name: string
    email: string
    password: string
    passwordConfirmation: string
}

export interface RegisterResponse {
    token: string
    expiresAt: string
}

export interface ForgotPasswordRequest {
    email: string
}

export interface ResetPasswordRequest {
    token: string
    email: string
    password: string
    passwordConfirmation: string
}

export interface ApiMessageResponse {
    message: string
}

export type ForgotPasswordResponse = ApiMessageResponse
export type ResetPasswordResponse = ApiMessageResponse
