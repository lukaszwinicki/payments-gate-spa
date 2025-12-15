import type { TransactionStatusRequest, TransactionStatusResponse } from '@/types/transactions/TransactionTypes'
import { getAuthHeaders } from '@/lib/http/getAuthHeaders'
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
}

export const transactionService = new TransactionService(baseUrl)