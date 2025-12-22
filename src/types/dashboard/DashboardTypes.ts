export interface RecentTransaction {
    transactionUuid: string,
    amount: number,
    currency: string,
    status: string,
    paymentMethod: string,
    createdAt: string
}

export interface PaymentMethodShare {
    paymentMethod: string,
    count: number,
    percentage: number
}

export interface TransactionsTotalResponse {
    total: string
}

export interface TransactionBalancesResponse {
    pln: string,
    eur: string,
    usd: string
}

export type RecentTransactionResponse = RecentTransaction[]
export type PaymentMethodShareResponse = PaymentMethodShare[]