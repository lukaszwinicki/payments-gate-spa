import { HttpStatus } from '@/enums/HttpStatus';

export const STATUS_MESSAGES: Record<HttpStatus, string> = {
    [HttpStatus.BadRequest]: 'Invalid request. Please check your input.',
    [HttpStatus.Unauthorized]: 'Your session has expired. Please log in again.',
    [HttpStatus.Forbidden]: 'You do not have permission to perform this action.',
    [HttpStatus.NotFound]: 'Requested resource not found.',
    [HttpStatus.Conflict]: 'Conflict detected. Please refresh and try again.',
    [HttpStatus.UnprocessableEntity]: 'Validation error. Please correct the highlighted fields.',
    [HttpStatus.TooManyRequests]: 'Too many requests. Please slow down.',
    [HttpStatus.InternalServerError]: 'Server error. Please try again later.',
    [HttpStatus.BadGateway]: 'Bad gateway. Server is temporarily unavailable.',
    [HttpStatus.ServiceUnavailable]: 'Service unavailable. Please try again later.',
    [HttpStatus.GatewayTimeout]: 'Gateway timeout. Please try again later.',
}