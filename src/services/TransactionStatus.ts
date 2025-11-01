import { TransactionStatus } from '@/enums/Status'

export function getTransactionHeader(status: TransactionStatus | undefined) {
  switch (status) {
    case TransactionStatus.SUCCESS: return 'Payment Successful'
    case TransactionStatus.FAIL: return 'Payment Failed'
    case TransactionStatus.PENDING: return 'Payment Pending'
    case TransactionStatus.REFUND_SUCCESS: return 'Refund Successful'
    case TransactionStatus.REFUND_FAIL: return 'Refund Failed'
    case TransactionStatus.REFUND_PENDING: return 'Refund Pending'
    default: return 'Transaction Info'
  }
}

export function getTransactionMessage(status: TransactionStatus | undefined) {
  switch (status) {
    case TransactionStatus.SUCCESS: return 'Your payment has been processed successfully.'
    case TransactionStatus.FAIL: return 'Your payment could not be processed.'
    case TransactionStatus.PENDING: return 'Your payment is being processed.'
    case TransactionStatus.REFUND_SUCCESS: return 'Your refund has been processed successfully.'
    case TransactionStatus.REFUND_FAIL: return 'Your refund could not be processed.'
    case TransactionStatus.REFUND_PENDING: return 'Your refund is being processed.'
    default: return ''
  }
}

export function getStatusColorClass(status: TransactionStatus | undefined) {
  switch (status) {
    case TransactionStatus.SUCCESS: return 'text-green-600 bg-green-50'
    case TransactionStatus.FAIL: return 'text-red-600 bg-red-50'
    case TransactionStatus.PENDING: return 'text-yellow-500 bg-yellow-50'
    case TransactionStatus.REFUND_SUCCESS: return 'text-green-600 bg-green-50'
    case TransactionStatus.REFUND_FAIL: return 'text-red-600 bg-red-50'
    case TransactionStatus.REFUND_PENDING: return 'text-yellow-500 bg-yellow-50'
    default: return 'text-gray-700 bg-gray-50'
  }
}
