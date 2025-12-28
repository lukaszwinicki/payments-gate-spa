import { HttpStatus } from '@/enums/HttpStatus';

export function isHttpStatus(
    status: number
): status is HttpStatus {
    return Object.values(HttpStatus).includes(status)
}