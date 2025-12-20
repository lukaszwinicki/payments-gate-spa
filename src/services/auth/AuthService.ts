import type {
    ForgotPasswordRequest,
    ForgotPasswordResponse,
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
    ResetPasswordRequest,
    ResetPasswordResponse
} from '@/types/auth/AuthTypes'
const baseUrl = import.meta.env.VITE_API_BASE_URL

export class AuthService {
    constructor(private readonly baseUrl: string) { }

    async login(loginData: LoginRequest): Promise<LoginResponse> {
        try {
            const loginResponse = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData)
            })

            const loginResult = await loginResponse.json()

            if (!loginResponse.ok) {
                const backendMessage =
                    typeof loginResult?.message === 'object'
                        ? Object.values(loginResult.message).flat().join(' ')
                        : loginResult?.message ?? `HTTP ${loginResult.status}`

                throw new Error(backendMessage)
            }
            return loginResult as LoginResponse
        } catch (err: unknown) {
            if (err instanceof Error) {
                throw new Error(err.message);
            } else if (typeof err === 'object' && err !== null && 'status' in err && 'data' in err) {
                throw err;
            } else {
                throw new Error('Failed to login. Please try again.');
            }
        }
    }

    async register(registerData: RegisterRequest): Promise<RegisterResponse> {
        try {
            const registerResponse = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(registerData)
            })

            const registerResult = await registerResponse.json()

            if (!registerResponse.ok) {
                throw { status: registerResponse.status, registerResult };
            }
            return registerResult as LoginResponse
        } catch (err: unknown) {
            if (err instanceof Error) {
                throw new Error(err.message);
            } else if (typeof err === 'object' && err !== null && 'status' in err && 'data' in err) {
                throw err;
            } else {
                throw new Error('Failed to register. Please try again.');
            }
        }
    }

    async forgotPassword(forgotPasswordData: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
        try {
            const forgotPasswordResponse = await fetch('/api/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(forgotPasswordData)
            })

            const forgotPasswordResult = await forgotPasswordResponse.json()

            if (!forgotPasswordResponse.ok) {
                throw { status: forgotPasswordResponse.status, data: forgotPasswordResult };
            }
            return forgotPasswordResult as ForgotPasswordResponse
        } catch (err: unknown) {
            if (err instanceof Error) {
                throw new Error(err.message);
            } else if (typeof err === 'object' && err !== null && 'status' in err && 'data' in err) {
                throw err;
            } else {
                throw new Error('Failed to send reset link. Please try again.');
            }
        }
    }

    async resetPassword(resetPasswordData: ResetPasswordRequest): Promise<ResetPasswordResponse> {
        try {
            const resetPasswordResponse = await fetch('/api/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(resetPasswordData)
            })

            const resetPasswordResult = await resetPasswordResponse.json()

            if (!resetPasswordResponse.ok) {
                throw { status: resetPasswordResponse.status, data: resetPasswordResult };
            }
            return resetPasswordResult as ResetPasswordResponse
        } catch (err: unknown) {
            if (err instanceof Error) {
                throw new Error(err.message);
            } else if (typeof err === 'object' && err !== null && 'status' in err && 'data' in err) {
                const msg = (err as any).data?.message ?? 'Failed to reset password.';
                throw new Error(msg);
            } else {
                throw new Error('Failed to reset password. Please try again.');
            }
        }
    }

}
export const authService = new AuthService(baseUrl)