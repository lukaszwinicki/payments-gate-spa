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

export interface PaymentDetailsRequest {
    paymentLinkId: string
}

export interface TransactionDetails {
    status: string;
    amount: string;
    currency: string;
    paymentMethod: string;
}

export interface PaymentDetailsResponse {
    payment: {
        paymentLinkId: string,
        amount: string,
        currency: string
    };
    transaction: TransactionDetails | null;
}