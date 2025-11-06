# Payments Gate SPA

A modern, responsive Single Page Application (SPA) for processing online payments through multiple payment gateways. Built with Vue 3, TypeScript, and Tailwind CSS.

## Features

- 💳 **Multiple Payment Methods**: Support for TPAY, PAYNOW, and NODA payment providers
- 🔒 **Secure Transactions**: Secure payment processing with transaction status tracking
- 📱 **Responsive Design**: Modern, mobile-friendly UI built with Tailwind CSS
- ⚡ **Fast & Modern**: Built with Vue 3 Composition API and Vite for optimal performance
- 🎯 **Type Safety**: Full TypeScript support for better development experience
- 🔄 **Real-time Status**: Track payment status and transaction details
- ✨ **User-Friendly**: Intuitive interface with form validation and error handling

## Tech Stack

- **Framework**: Vue 3 (Composition API)
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: Vue Router
- **State Management**: Pinia
- **HTTP Client**: Axios
- **Notifications**: SweetAlert2

## Prerequisites

- Node.js `^20.19.0` or `>=22.12.0`
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd payments-gate-spa
```

2. Install dependencies:
```bash
npm install
```

## Configuration

Create a `.env` file in the root directory with the following environment variables:

```env
VITE_API_BASE_URL=http://your-api-base-url
```

Replace `http://your-api-base-url` with your actual API base URL.

## Development

### Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in the terminal).

### Type Checking

```bash
npm run type-check
```

## Building for Production

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
payments-gate-spa/
├── public/
│   ├── icons/          # Payment method icons (TPAY, PAYNOW, NODA)
│   └── favicon.ico
├── src/
│   ├── components/     # Reusable Vue components
│   │   ├── FormField.vue
│   │   ├── PaymentMethodTile.vue
│   │   ├── Section.vue
│   │   └── SummaryRow.vue
│   ├── constants/      # Application constants
│   │   └── PaymentMethods.ts
│   ├── enums/          # TypeScript enums
│   │   ├── PaymentMethod.ts
│   │   └── TransactionStatus.ts
│   ├── router/         # Vue Router configuration
│   │   └── index.ts
│   ├── services/       # API services and utilities
│   │   ├── PaymentService.ts
│   │   └── TransactionStatus.ts
│   ├── types/          # TypeScript type definitions
│   │   └── PaymentsRequests.ts
│   ├── views/          # Page components
│   │   ├── PaymentDetailsView.vue
│   │   └── PaymentStatusView.vue
│   ├── App.vue         # Root component
│   ├── main.ts         # Application entry point
│   └── style.css       # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── vitest.config.ts
```

## API Integration

The application integrates with a payment API that provides the following endpoints:

- `POST /api/confirm-payment-link` - Confirm and create a payment transaction
- `GET /api/payment/:paymentLinkId` - Get payment details
- `GET /api/transaction/:uuid/status` - Get transaction status

### Payment Flow

1. User accesses payment link via `/payment/:payment_link_id`
2. Application fetches payment details from the API
3. User enters personal information (name, email)
4. User selects a payment method
5. User confirms payment and is redirected to the payment provider
6. After payment, user can check status via `/payment-status`

## Supported Payment Methods

- **TPAY**: Fast and secure online payments
- **PAYNOW**: Quick payment method
- **NODA**: Secure payment solution

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (includes type checking)
- `npm run build-only` - Build without type checking
- `npm run preview` - Preview production build
- `npm run type-check` - Run TypeScript type checking
- `npm run test:unit` - Run unit tests

## License

This project is private and proprietary.

## Contributing

This is a private project. For issues or questions, please contact the project maintainers.
