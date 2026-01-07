import { api } from '@/lib/http/api';
import type {
    CreateTransactionRequest,
    CreateTransactionResponse,
    RefundTransactionRequest,
    RefundTransactionResponse,
    TransactionStatusRequest,
    TransactionStatusResponse,
    TransactionsListDto,
} from '@/types/transactions/TransactionTypes'

import type { TransactionNotificationsListDto } from '@/types/transactions/NotificationTypes';
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

    async getTransactionList(): Promise<TransactionsListDto> {
        const { data } = await api.get<TransactionsListDto>('/transactions')
        return data
    }

    async getNotificationList(): Promise<TransactionNotificationsListDto> {
        const { data } = await api.get<TransactionNotificationsListDto>('/notifications')
        return data
    }

    async getApiCredentials(): Promise<ApiCredentials> {
        const { data } = await api.get<ApiCredentials>('/api-credentials')
        return data
    }
}
export const transactionService = new TransactionService() 