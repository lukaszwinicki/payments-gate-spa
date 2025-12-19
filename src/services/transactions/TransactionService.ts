import type {
    CreateTransactionRequest,
    CreateTransactionResponse,
    RefundTransactionRequest,
    RefundTransactionResponse,
    TransactionList,
    TransactionStatusRequest,
    TransactionStatusResponse
} from '@/types/transactions/TransactionTypes'
import { getAuthHeaders } from '@/lib/http/getAuthHeaders'
import type { NotificationList } from '@/types/transactions/NotificationTypes';
import type { ApiCredentials } from '@/types/transactions/ApiCredentialsTypes';

const baseUrl = import.meta.env.VITE_API_BASE_URL

export class TransactionService {
    constructor(private readonly baseUrl: string) { }

    async getPaymentStatus(id: TransactionStatusRequest): Promise<TransactionStatusResponse> {
        const { uuid } = id;
        try {
            const paymentStatusResponse = await fetch(`${this.baseUrl}/api/transaction/${uuid}/status`, {
                method: 'GET',
                headers: getAuthHeaders(),
            })

            const paymentResult = await paymentStatusResponse.json()

            if (!paymentStatusResponse.ok) {
                throw { status: paymentStatusResponse.status, data: paymentResult };
            }
            return paymentResult as TransactionStatusResponse;
        } catch (err: unknown) {
            if (err instanceof Error) {
                throw new Error(err.message);
            } else if (typeof err === 'object' && err !== null && 'status' in err && 'data' in err) {
                throw err;
            } else {
                throw new Error('Failed to fetch payment status. Please try again.');
            }
        }
    }

    async createTransaction(paymentData: CreateTransactionRequest): Promise<CreateTransactionResponse> {
        try {
            const createTransactionResponse = await fetch(`${this.baseUrl}/api/create-transaction`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(paymentData)
            })

            const paymentResult = await createTransactionResponse.json()

            if (!createTransactionResponse.ok) {
                const backendMessage =
                    typeof paymentResult?.error === 'object'
                        ? Object.values(paymentResult.error).flat().join(' ')
                        : paymentResult?.error ?? `HTTP ${paymentResult.status}`

                throw new Error(backendMessage)
            }
            return paymentResult as CreateTransactionResponse
        } catch (err: unknown) {
            if (err instanceof Error) {
                throw new Error(err.message);
            } else if (typeof err === 'object' && err !== null && 'status' in err && 'data' in err) {
                throw err;
            } else {
                throw new Error('Failed to create payment. Please try again.');
            }
        }
    }

    async refundTransaction(transactionUuid: RefundTransactionRequest): Promise<RefundTransactionResponse> {
        try {
            const refundTransactionResponse = await fetch(`${this.baseUrl}/api/refund`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(transactionUuid)
            })

            const refundTransactonResult = await refundTransactionResponse.json()

            if (!refundTransactionResponse.ok) {
                const backendMessage =
                    typeof refundTransactonResult?.error === 'object'
                        ? Object.values(refundTransactonResult.error).flat().join(' ')
                        : refundTransactonResult?.error ?? `HTTP ${refundTransactonResult.status}`

                throw new Error(backendMessage)
            }
            return refundTransactonResult as RefundTransactionResponse
        }
        catch (err: unknown) {
            if (err instanceof Error) {
                throw new Error(err.message);
            } else if (typeof err === 'object' && err !== null && 'status' in err && 'data' in err) {
                throw err;
            } else {
                throw new Error('Failed to refund payment. Please try again.');
            }
        }
    }

    async getTransctionsList(): Promise<TransactionList> {
        try {
            const transactionListResponse = await fetch(`${this.baseUrl}/api/transactions`, {
                method: 'GET',
                headers: getAuthHeaders(),
            })

            const transactionListResult = await transactionListResponse.json()

            if (!transactionListResponse.ok) {
                const backendMessage =
                    typeof transactionListResult?.error === 'object'
                        ? Object.values(transactionListResult.error).flat().join(' ')
                        : transactionListResult?.error ?? `HTTP ${transactionListResult.status}`

                throw new Error(backendMessage)
            }
            return transactionListResult as TransactionList
        }
        catch (err: unknown) {
            if (err instanceof Error) {
                throw new Error(err.message);
            } else if (typeof err === 'object' && err !== null && 'status' in err && 'data' in err) {
                throw err;
            } else {
                throw new Error('Failed to list transactions. Please try again.');
            }
        }
    }

    async getNotificationList(): Promise<NotificationList> {
        try {
            const notificationListResponse = await fetch(`${this.baseUrl}/api/notifications`, {
                method: 'GET',
                headers: getAuthHeaders(),
            })
            const notificationListResult = await notificationListResponse.json()

            if (!notificationListResponse.ok) {
                const backendMessage =
                    typeof notificationListResult?.error === 'object'
                        ? Object.values(notificationListResult.error).flat().join(' ')
                        : notificationListResult?.error ?? `HTTP ${notificationListResult.status}`

                throw new Error(backendMessage)
            }
            return notificationListResult as NotificationList
        }
        catch (err: unknown) {
            if (err instanceof Error) {
                throw new Error(err.message);
            } else if (typeof err === 'object' && err !== null && 'status' in err && 'data' in err) {
                throw err;
            } else {
                throw new Error('Failed to list notifications. Please try again.');
            }
        }
    }

    async getApiCredentials(): Promise<ApiCredentials> {
        try {
            const apiCredentialsResponse = await fetch(`${this.baseUrl}/api/api-credentials`, {
                method: 'GET',
                headers: getAuthHeaders(),
            })
            const apiCredentialsResult = await apiCredentialsResponse.json()

            if (!apiCredentialsResponse.ok) {
                const backendMessage =
                    typeof apiCredentialsResult?.error === 'object'
                        ? Object.values(apiCredentialsResult.error).flat().join(' ')
                        : apiCredentialsResult?.error ?? `HTTP ${apiCredentialsResult.status}`

                throw new Error(backendMessage)
            }
            return apiCredentialsResult as ApiCredentials
        }
        catch (err: unknown) {
            if (err instanceof Error) {
                throw new Error(err.message);
            } else if (typeof err === 'object' && err !== null && 'status' in err && 'data' in err) {
                throw err;
            } else {
                throw new Error('Failed get api credentials. Please try again.');
            }
        }
    }

}
export const transactionService = new TransactionService(baseUrl)