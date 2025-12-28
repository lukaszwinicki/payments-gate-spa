import { api } from '@/lib/http/api';
import type {
    PaymentMethodShareResponse,
    RecentTransactionResponse,
    TransactionBalancesResponse,
    TransactionRejectedResponse,
    TransactionsTotalResponse,
} from '@/types/dashboard/DashboardTypes';

export class DashboardService {

    async getRecentTransaction(): Promise<RecentTransactionResponse> {
        const { data } = await api.get<RecentTransactionResponse>('/transactions/recent')
        return data
    }

    async getPaymentMethodShare(): Promise<PaymentMethodShareResponse> {
        const { data } = await api.get<PaymentMethodShareResponse>('/analytics/payment-methods/share')
        return data
    }

    async getTransactionTotal(): Promise<TransactionsTotalResponse> {
        const { data } = await api.get<TransactionsTotalResponse>('/analytics/transactions/total')
        return data
    }

    async getTransactionBalances(): Promise<TransactionBalancesResponse> {
        const { data } = await api.get<TransactionBalancesResponse>('/analytics/transactions/balances')
        return data
    }

    async getTransactionRejected(): Promise<TransactionRejectedResponse> {
        const { data } = await api.get<TransactionRejectedResponse>('/analytics/transactions/rejected')
        return data
    }

}
export const dashboardService = new DashboardService()