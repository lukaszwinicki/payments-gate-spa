import type { ApiError, BackendErrorData } from '@/types/api/ApiErrorTypes'
import { STATUS_MESSAGES } from '@/constants/StatusMessages'
import { isHttpStatus } from './isHttpStatus'

export function mapApiErrorToMessage(error: ApiError | unknown): string {
    const err = error as ApiError<BackendErrorData>

    if (err?.data?.error) return err.data.error

    if (err?.message) return err.message

    if (typeof err?.status === 'number' && isHttpStatus(err.status)) {
        return STATUS_MESSAGES[err.status]
    }

    const validationMessage = Object.values(err?.errors ?? {})[0]?.[0]
    if (validationMessage) return validationMessage

    if (err?.data?.error) return err.data.error

    return 'Unexpected error'
}