import { showErrorDialog } from '@/lib/errors/showErrorDialog';
import { mapApiErrorToMessage } from '@/lib/errors/mapApiErrorToMessage';

export function useApiError() {
    async function handleApiError(error: unknown, title?: string) {
        const message = mapApiErrorToMessage(error)
        await showErrorDialog(message, title)
    }

    return { handleApiError }
}