import { showDialog } from '@/lib/errors/showDialog';
import { mapApiErrorToMessage } from '@/lib/errors/mapApiErrorToMessage';
import type { ApiError } from '@/types/api/ApiErrorTypes';

export function useApiError() {
    async function handleApiError(
        error: unknown,
        title?: string,
        icon?: 'error' | 'info' | 'success' | 'warning'
    ) {

        const apiError = error as ApiError
        if (apiError?.status === 401) {
            return
        }

        const message = mapApiErrorToMessage(error)
        await showDialog(icon ?? 'error', message, title)
    }

    return { handleApiError }
}