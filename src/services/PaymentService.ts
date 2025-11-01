import type { PaymentDetailsRequest, PaymentDetailsResponse, PaymentRequest, PaymentResponse, PaymentStatusRequest, PaymentStatusResponse } from '@/types/PaymentsRequests'
const baseUrl = import.meta.env.VITE_API_BASE_URL

export class PaymentService {
    constructor(private readonly baseUrl: string) { }

    private getHeaders(): HeadersInit {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
        return headers
    }

    async confirmPaymentLink(paymentData: PaymentRequest): Promise<PaymentResponse> {
        try {
            const paymentResponse = await fetch(`${this.baseUrl}/api/confirm-payment-link`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify(paymentData)
            })

            const paymentResult = await paymentResponse.json()

            if (!paymentResponse.ok) {
                const backendMessage = paymentResult?.error ?? `HTTP error! status: ${paymentResponse.status}`
                throw new Error(backendMessage)
            }

            return paymentResult
        } catch (err: unknown) {
            if (err instanceof Error) {
                throw new Error(err.message);
            } else {
                throw new Error('Failed to process payment. Please try again.');
            }
        }
    }

    async paymentDetails(id: PaymentDetailsRequest): Promise<PaymentDetailsResponse> {
        try {
            const { paymentLinkId } = id;
            const paymentResponse = await fetch(`${this.baseUrl}/api/payment/${paymentLinkId}`, {
                method: 'GET',
                headers: this.getHeaders(),
            })

            const paymentResult = await paymentResponse.json()

            if (!paymentResponse.ok) {
                throw { status: paymentResponse.status, data: paymentResult };
            }
            return paymentResult as PaymentDetailsResponse;
        } catch (err: unknown) {
            if (err instanceof Error) {
                throw new Error(err.message);
            } else if (typeof err === 'object' && err !== null && 'status' in err && 'data' in err) {
                throw err;
            } else {
                throw new Error('Failed to fetch payment details. Please try again.');
            }
        }
    }

    async getPaymentStatus(id: PaymentStatusRequest): Promise<PaymentStatusResponse> {
        const { uuid } = id;
        try {
            const paymentStatusResponse = await fetch(`${this.baseUrl}/api/transaction/${uuid}/status`, {
                method: 'GET',
                headers: this.getHeaders(),
            })

            const paymentResult = await paymentStatusResponse.json()

            if (!paymentStatusResponse.ok) {
                throw { status: paymentStatusResponse.status, data: paymentResult };
            }
            return paymentResult as PaymentStatusResponse;
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

export const paymentService = new PaymentService(baseUrl)