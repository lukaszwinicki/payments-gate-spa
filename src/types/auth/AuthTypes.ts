export interface LoginRequest {
    email: string,
    password: string,
}

export interface LoginResponse {
    token: string,
    expiresAt: string,
}

export interface RegisterRequest {
    name: string,
    email: string,
    password: string,
    password_confirmation: string
}

export interface RegisterResponse {
    token: string,
    expiresAt: string,
}

export interface ForgotPasswordRequest {
    email: string
}

export interface ForgotPasswordResponse {
    message: string
}

export interface ResetPasswordRequest {
    token: string,
    email: string,
    password: string,
    password_confirmation: string
}

export interface ResetPasswordResponse {
    message: string
}
