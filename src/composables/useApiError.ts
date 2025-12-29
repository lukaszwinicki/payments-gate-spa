import { showDialog } from '@/lib/errors/showDialog';
import { mapApiErrorToMessage } from '@/lib/errors/mapApiErrorToMessage';

export function useApiError() {
    async function handleApiError(
        error: unknown,
        title?: string,
        icon?: 'error' | 'info' | 'success' | 'warning'
    ) {
        const message = mapApiErrorToMessage(error)
        await showDialog(icon ?? 'error', message, title)
    }

    return { handleApiError }
}