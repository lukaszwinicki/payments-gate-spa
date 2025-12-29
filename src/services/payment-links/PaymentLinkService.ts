import { api } from '@/lib/http/api';
import type {
    PaymentLinkRequest,
    PaymentLinkResponse,
    PaymentLinkDetailsRequest,
    PaymentLinkDetailsResponse,
    ConfirmPaymentLinkRequest,
    ConfirmPaymentLinkResponse
} from '@/types/payment-links/PaymentLinkTypes'

export class PaymentLinkService {

    async createPaymentLink(paymentLinkData: PaymentLinkRequest): Promise<PaymentLinkResponse> {
        const { data } = await api.post<{paymentLink: string}>('/create-payment-link', paymentLinkData)
        return {
            link: data.paymentLink
        }
    }

    async confirmPaymentLink(paymentData: ConfirmPaymentLinkRequest): Promise<ConfirmPaymentLinkResponse> {
        const { data } = await api.post<ConfirmPaymentLinkResponse>('confirm-payment-link', paymentData)
        return data
    }

    async paymentLinkDetails({ paymentLinkId }: PaymentLinkDetailsRequest): Promise<PaymentLinkDetailsResponse> {
        const { data } = await api.get<PaymentLinkDetailsResponse>(`payment/${paymentLinkId}`)
        return data
    }
}
export const paymentLinkService = new PaymentLinkService()