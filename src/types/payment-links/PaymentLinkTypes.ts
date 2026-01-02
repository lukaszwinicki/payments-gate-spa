import type { PaymentMethod } from "@/enums/PaymentMethod"

export interface PaymentLinkBase {
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

export interface PaymentLinkDetailsForm {
    fullName: string
    email: string
    paymentMethod: PaymentMethod
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

export interface PaymentLinkRequest extends PaymentLinkBase { }
export interface PaymentLinkForm extends PaymentLinkBase { }