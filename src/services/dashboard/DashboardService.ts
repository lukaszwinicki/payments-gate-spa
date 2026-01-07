import { api } from '@/lib/http/api';
import type {
    PaymentMethodShareResponse,
    RecentTransactionsListDto,
    TransactionBalancesResponse,
    TransactionRejectedResponse,
    TransactionsTotalResponse,
} from '@/types/dashboard/DashboardTypes';

export class DashboardService {

    async getRecentTransaction(): Promise<RecentTransactionsListDto> {
        const { data } = await api.get<RecentTransactionsListDto>('/transactions/recent')
        return data
    }

    async getPaymentMethodShare(): Promise<PaymentMethodShareResponse> {
        const { data } = await api.get<PaymentMethodShareResponse>('/transactions/payment-methods/share')
        return data
    }

    async getTransactionTotal(): Promise<TransactionsTotalResponse> {
        const { data } = await api.get<TransactionsTotalResponse>('/transactions/total')
        return data
    }

    async getTransactionBalances(): Promise<TransactionBalancesResponse> {
        const { data } = await api.get<TransactionBalancesResponse>('/transactions/balances')
        return data
    }

    async getTransactionRejected(): Promise<TransactionRejectedResponse> {
        const { data } = await api.get<TransactionRejectedResponse>('/transactions/rejected')
        return data
    }

}
export const dashboardService = new DashboardService()