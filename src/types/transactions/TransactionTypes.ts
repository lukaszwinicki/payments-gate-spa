export interface TransactionStatusRequest {
    uuid: string
}

export interface TransactionStatusResponse {
    status: string
    amount: string
    currency: string
    paymentMethod: string
    returnUrl: string
}