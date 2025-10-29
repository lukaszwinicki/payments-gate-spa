import { PaymentMethod } from '@/enums/PaymentMethod'

export const paymentMethods = [
  {
    id: PaymentMethod.PAYMENT_METHOD_TPAY,
    name: 'TPAY',
    description: 'Fast and secure online payments',
    speed: 'Instant',
    icon: '/icons/tpay.svg',
  },
  {
    id: PaymentMethod.PAYMENT_METHOD_PAYNOW,
    name: 'PAYNOW',
    description: 'Quick payment method',
    speed: 'Instant',
    icon: '/icons/paynow.jpg',
  },
  {
    id: PaymentMethod.PAYMENT_METHOD_NODA,
    name: 'NODA',
    description: 'Secure payment solution',
    speed: 'Instant',
    icon: '/icons/noda.png',
  },
]
