import type { PaymentDetailsRequest, PaymentDetailsResponse, PaymentRequest, PaymentResponse } from '@/types/Payment'

export class PaymentService {

    constructor(private baseUrl = import.meta.env.VITE_API_BASE_URL) {}

    private getHeaders(): HeadersInit {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
        return headers
    }

    async confirmPaymentLink(PaymentData: PaymentRequest): Promise<PaymentResponse> {

        try {
            const paymentResponse = await fetch(`${this.baseUrl}/api/confirm-payment-link`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify(PaymentData)
            })

            const paymentResult = await paymentResponse.json()

            if (!paymentResponse.ok) {
                const backendMessage = paymentResult?.error ?? `HTTP error! status: ${paymentResponse.status}`
                throw new Error(backendMessage)
            }

            return paymentResult
        } catch (err: any) {
            throw new Error(err.message ?? 'Failed to process payment. Please try again.')
        }
    }

    async paymentDetails(id: PaymentDetailsRequest): Promise<PaymentDetailsResponse> {

        const { paymentLinkId } = id;
        const paymentResponse = await fetch(`${this.baseUrl}/api/payment/${paymentLinkId}`, {
            method: 'GET',
            headers: this.getHeaders(),
        })

        const paymentResult = await paymentResponse.json()

        if (!paymentResponse.ok) {
            throw { status: paymentResponse.status, data: paymentResult };
        }
        return paymentResult
    }
}

export const paymentService = new PaymentService()