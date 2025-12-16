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

export interface CreateTransactionRequest {
    name: string,
    email: string,
    amount: number,
    currency: string,
    paymentMethod: string,
    notificationUrl: string,
    returnUrl: string
}

export interface CreateTransactionResponse {
    link: string
    transactionUuid: string
}

export type RefundTransactionRequest = { transactionUuid: string };
export type RefundTransactionResponse = { transactionUuid: string };
