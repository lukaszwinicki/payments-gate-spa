import type {
    PaymentLinkRequest,
    PaymentLinkResponse,
    PaymentLinkDetailsRequest,
    PaymentLinkDetailsResponse,
    ConfirmPaymentLinkRequest,
    ConfirmPaymentLinkResponse
} from '@/types/payment-links/PaymentLinkTypes'
import { getAuthHeaders } from '@/lib/http/getAuthHeaders'
const baseUrl = import.meta.env.VITE_API_BASE_URL

export class PaymentLinkService {
    constructor(private readonly baseUrl: string) { }

    async createPaymentLink(paymentLinkData: PaymentLinkRequest): Promise<PaymentLinkResponse> {
        try {
            const paymentLinkResponse = await fetch(`${this.baseUrl}/api/create-payment-link`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(paymentLinkData)
            })

            const paymentLinkResult = await paymentLinkResponse.json()

            if (!paymentLinkResponse.ok) {
                const backendMessage =
                    typeof paymentLinkResult?.error === 'object'
                        ? Object.values(paymentLinkResult.error).flat().join(' ')
                        : paymentLinkResult?.error ?? `HTTP ${paymentLinkResult.status}`

                throw new Error(backendMessage)
            }

            return {
                link: paymentLinkResult.paymentLink
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                throw new Error(err.message);
            } else {
                throw new Error('Failed to process create payment link. Please try again.')
            }
        }
    }

    async confirmPaymentLink(paymentData: ConfirmPaymentLinkRequest): Promise<ConfirmPaymentLinkResponse> {
        try {
            const paymentResponse = await fetch(`${this.baseUrl}/api/confirm-payment-link`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(paymentData)
            })

            const paymentResult = await paymentResponse.json()

            if (!paymentResponse.ok) {
                const backendMessage = paymentResult?.error ?? `HTTP error! status: ${paymentResponse.status}`
                throw new Error(backendMessage)
            }

            return paymentResult as ConfirmPaymentLinkResponse
        } catch (err: unknown) {
            if (err instanceof Error) {
                throw new Error(err.message);
            } else {
                throw new Error('Failed to process payment. Please try again.');
            }
        }
    }

    async paymentLinkDetails(id: PaymentLinkDetailsRequest): Promise<PaymentLinkDetailsResponse> {
        try {
            const { paymentLinkId } = id;
            const paymentResponse = await fetch(`${this.baseUrl}/api/payment/${paymentLinkId}`, {
                method: 'GET',
                headers: getAuthHeaders(),
            })

            const paymentResult = await paymentResponse.json()

            if (!paymentResponse.ok) {
                throw { status: paymentResponse.status, data: paymentResult };
            }
            return paymentResult as PaymentLinkDetailsResponse;
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
}

export const paymentLinkService = new PaymentLinkService(baseUrl)