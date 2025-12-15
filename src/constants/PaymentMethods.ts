import { PaymentMethod } from '@/enums/PaymentMethod'
import TPayIcon from '@/assets/icons/tpay.svg'
import PaynowIcon from '@/assets/icons/paynow.jpg'
import NodaIcon from '@/assets/icons/noda.png'

export const paymentMethods = [
  {
    id: PaymentMethod.PAYMENT_METHOD_TPAY,
    name: 'TPAY',
    description: 'Fast and secure online payments',
    speed: 'Instant',
    icon: TPayIcon,
  },
  {
    id: PaymentMethod.PAYMENT_METHOD_PAYNOW,
    name: 'PAYNOW',
    description: 'Quick payment method',
    speed: 'Instant',
    icon: PaynowIcon,
  },
  {
    id: PaymentMethod.PAYMENT_METHOD_NODA,
    name: 'NODA',
    description: 'Secure payment solution',
    speed: 'Instant',
    icon: NodaIcon,
  },
]
