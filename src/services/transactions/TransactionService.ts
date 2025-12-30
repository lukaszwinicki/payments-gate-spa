import { api } from '@/lib/http/api';
import type {
    CreateTransactionRequest,
    CreateTransactionResponse,
    RefundTransactionRequest,
    RefundTransactionResponse,
    TransactionStatusRequest,
    TransactionStatusResponse,
    Transaction
} from '@/types/transactions/TransactionTypes'

import type { Notification } from '@/types/transactions/NotificationTypes';
import type { ApiCredentials } from '@/types/transactions/ApiCredentialsTypes';

export class TransactionService {

    async createTransaction(paymentData: CreateTransactionRequest): Promise<CreateTransactionResponse> {
        const { data } = await api.post<CreateTransactionResponse>('/create-transaction', paymentData)
        return data
    }

    async refundTransaction(transactionUuid: RefundTransactionRequest): Promise<RefundTransactionResponse> {
        const { data } = await api.post<RefundTransactionResponse>('/refund', transactionUuid)
        return data
    }

    async getPaymentStatus({ uuid }: TransactionStatusRequest): Promise<TransactionStatusResponse> {
        const { data } = await api.get<TransactionStatusResponse>(`/transaction/${uuid}/status`)
        return data
    }

    async getTransctionsList(): Promise<Transaction[]> {
        const { data } = await api.get<Transaction[]>('/transactions')
        return data
    }

    async getNotificationList(): Promise<Notification[]> {
        const { data } = await api.get<Notification[]>('/notifications')
        return data
    }

    async getApiCredentials(): Promise<ApiCredentials> {
        const { data } = await api.get<ApiCredentials>('/api-credentials')
        return data
    }
}
export const transactionService = new TransactionService() 