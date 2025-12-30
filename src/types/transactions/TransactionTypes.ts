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

export interface Transaction {
    id: string,
    transactionUuid: string
    transactionId: string
    refundCode: string | null
    amount: number
    fullname: string
    email: string
    currency: string
    status: string
    notificationUrl: string
    returnUrl: string
    paymentMethod: string
    createdAt: string
    updatedAt?: string
}

export interface TransactionRow {
    id: string;
    transactionUuid: string;
    fullname: string;
    email: string;
    status: { text: string; class: string; };
}

export type RefundTransactionRequest = { transactionUuid: string };
export type RefundTransactionResponse = { transactionUuid: string };
