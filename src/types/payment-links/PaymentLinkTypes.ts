export interface PaymentLinkRequest {
    amount: number
    currency: string,
    expiresAt: Date,
    notificationUrl: string,
    returnUrl: string
}

export interface PaymentLinkResponse {
    link: string
}

export interface PaymentLinkDetailsRequest {
    paymentLinkId: string
}

export interface TransactionDetails {
    status: string
    amount: string
    currency: string
    paymentMethod: string
    returnUrl: string
}

export interface PaymentLinkDetailsResponse {
    payment: {
        paymentLinkId: string
        amount: string
        currency: string
    };
    transaction: TransactionDetails | null
}

export interface ConfirmPaymentLinkRequest {
    paymentLinkId: string
    amount: number
    currency: string
    paymentMethod: string
    fullname: string
    email: string
}

export interface ConfirmPaymentLinkResponse {
    link: string
}