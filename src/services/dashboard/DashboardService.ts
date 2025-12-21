import { getAuthHeaders } from '@/lib/http/getAuthHeaders'
import type { PaymentMethodShareResponse, RecentTransactionResponse } from '@/types/dashboard/DashboardTypes';

export class DashboardService {

    async getRecentTransaction(): Promise<RecentTransactionResponse> {
        try {
            const recentTransactionResponse = await fetch('/api/recent-transactions/', {
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
}
export const dashboardService = new DashboardService()