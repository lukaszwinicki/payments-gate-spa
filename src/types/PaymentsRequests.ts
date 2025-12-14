export interface PaymentRequest {
    paymentLinkId: string
    amount: number
    currency: string
    paymentMethod: string
    fullname: string
    email: string
}

export interface PaymentResponse {
    link: string
}

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

export interface PaymentResponse {
    link: string
}

export interface PaymentDetailsRequest {
    paymentLinkId: string
}

export interface TransactionDetails {
    status: string
    amount: string
    currency: string
    paymentMethod: string
    returnUrl: string
}

export interface PaymentDetailsResponse {
    payment: {
        paymentLinkId: string
        amount: string
        currency: string
    };
    transaction: TransactionDetails | null
}

export interface PaymentStatusRequest {
    uuid: string
}

export interface PaymentStatusResponse {
    status: string
    amount: string
    currency: string
    paymentMethod: string
    returnUrl: string
}