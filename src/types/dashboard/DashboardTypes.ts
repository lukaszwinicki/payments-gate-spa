export interface RecentTransaction {
    transactionUuid: string,
    amount: number,
    currency: string,
    status: string,
    paymentMethod: string,
    createdAt: string
}

export interface RecentTransactionsListDto {
    transactions: RecentTransaction[]
}

export interface PaymentMethodShare {
    paymentMethod: string,
    count: number,
    percentage: number
}

export interface PaymentMethodShareResponse {
    shares: PaymentMethodShare[]
}

export interface TransactionsTotalResponse {
    total: string
}

export interface TransactionBalancesResponse {
    pln: string,
    eur: string,
    usd: string
}

export interface TransactionRejectedResponse {
    total: string
}

export interface RecentTransactionDisplay {
    transactionUuid: string,
    amount: string,
    paymentMethod: string,
    status: {
        text: string,
        class: string
    },
    date: string
}
