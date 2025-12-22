import { getAuthHeaders } from '@/lib/http/getAuthHeaders'
import type { PaymentMethodShareResponse, RecentTransactionResponse, TransactionBalancesResponse, TransactionsTotalResponse } from '@/types/dashboard/DashboardTypes';

export class DashboardService {

    async getRecentTransaction(): Promise<RecentTransactionResponse> {
        try {
            const recentTransactionResponse = await fetch('/api/transactions/recent', {
                method: 'GET',
                headers: getAuthHeaders(),
            })

            const recentTransactiontResult = await recentTransactionResponse.json()

            if (!recentTransactionResponse.ok) {
                throw { status: recentTransactionResponse.status, data: recentTransactiontResult };
            }
            return recentTransactiontResult as RecentTransactionResponse;
        } catch (err: unknown) {
            if (err instanceof Error) {
                throw new Error(err.message);
            } else if (typeof err === 'object' && err !== null && 'status' in err && 'data' in err) {
                throw err;
            } else {
                throw new Error('Failed to fetch recent transactions. Please try again.');
            }
        }
    }

    async getPaymentMethodShare(): Promise<PaymentMethodShareResponse> {
        try {
            const paymentMethodShareResponse = await fetch('/api/analytics/payment-methods/share', {
                method: 'GET',
                headers: getAuthHeaders(),
            })

            const paymentMethodShareResult = await paymentMethodShareResponse.json()

            if (!paymentMethodShareResponse.ok) {
                throw { status: paymentMethodShareResponse.status, data: paymentMethodShareResult };
            }
            return paymentMethodShareResult as PaymentMethodShareResponse;
        } catch (err: unknown) {
            if (err instanceof Error) {
                throw new Error(err.message);
            } else if (typeof err === 'object' && err !== null && 'status' in err && 'data' in err) {
                throw err;
            } else {
                throw new Error('Failed. Please try again.');
            }
        }
    }

    async getTransactionTotal(): Promise<TransactionsTotalResponse> {
        try {
            const transactionsTotalResponse = await fetch('/api/analytics/transactions/total', {
                method: 'GET',
                headers: getAuthHeaders(),
            })

            const transactionsTotalResult = await transactionsTotalResponse.json()

            if (!transactionsTotalResponse.ok) {
                throw { status: transactionsTotalResponse.status, data: transactionsTotalResult };
            }
            return transactionsTotalResult as TransactionsTotalResponse;
        } catch (err: unknown) {
            if (err instanceof Error) {
                throw new Error(err.message);
            } else if (typeof err === 'object' && err !== null && 'status' in err && 'data' in err) {
                throw err;
            } else {
                throw new Error('Failed. Please try again.');
            }
        }
    }

    async getTransactionBalances(): Promise<TransactionBalancesResponse> {
        try {
            const transactionBalancesResponse = await fetch('/api/analytics/transactions/balances', {
                method: 'GET',
                headers: getAuthHeaders(),
            })

            const transactionBalancesResult = await transactionBalancesResponse.json()

            if (!transactionBalancesResponse.ok) {
                throw { status: transactionBalancesResponse.status, data: transactionBalancesResult };
            }
            return transactionBalancesResult as TransactionBalancesResponse;
        } catch (err: unknown) {
            if (err instanceof Error) {
                throw new Error(err.message);
            } else if (typeof err === 'object' && err !== null && 'status' in err && 'data' in err) {
                throw err;
            } else {
                throw new Error('Failed. Please try again.');
            }
        }
    }
}
export const dashboardService = new DashboardService()