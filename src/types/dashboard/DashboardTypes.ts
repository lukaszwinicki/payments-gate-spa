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

export type RecentTransactionResponse = RecentTransaction[]
export type PaymentMethodShareResponse = PaymentMethodShare[]