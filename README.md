# Payments Gate SPA

A comprehensive payment processing platform built as a modern Single Page Application (SPA) for managing online payments through multiple payment gateways. The application serves both end-users (customers making payments) and merchants (managing transactions, payment links, and analytics).

## Features

### Customer Features
- 💳 **Multiple Payment Methods**: Support for TPAY, PAYNOW, and NODA payment providers
- 🔒 **Secure Payment Processing**: Secure transaction processing with real-time status tracking
- 📝 **Payment Links**: Easy payment via shareable payment links with expiration dates
- 📱 **Responsive Design**: Modern, mobile-friendly UI built with Tailwind CSS

### Merchant Features
- 📊 **Analytics Dashboard**: Real-time metrics including transaction totals, balance tracking (PLN, EUR, USD), and payment method distribution
- 💼 **Transaction Management**: Create, view, and track transactions with detailed status information
- 🔄 **Refund Processing**: Manage transaction refunds with status validation
- 🔗 **Payment Link Generation**: Create and manage shareable payment links with expiration dates
- 🔔 **Notifications**: Webhook handling and transaction status notifications
- ⚙️ **API Credentials Management**: Configure and manage API credentials for payment providers
- 🔐 **User Authentication**: Secure login, registration, and password reset functionality

### Technical Features
- ⚡ **Fast & Modern**: Built with Vue 3 Composition API and Vite for optimal performance
- 🎯 **Type Safety**: Full TypeScript support for better development experience
- 🎨 **Data Visualization**: Interactive charts and graphs using ApexCharts
- ✨ **User-Friendly**: Intuitive interface with comprehensive form validation and error handling
- 🔒 **Secure**: Laravel Sanctum bearer token-based authentication with protected routes

## Tech Stack

- **Framework**: Vue 3 (Composition API)
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: Vue Router
- **State Management**: Pinia
- **HTTP Client**: Axios
- **Data Visualization**: ApexCharts, Vue3-ApexCharts
- **UI Components**: Heroicons
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
│   ├── assets/         # Static assets
│   ├── components/     # Reusable Vue components
│   │   ├── CopyableInput.vue
│   │   ├── FormField.vue
│   │   ├── FormInput.vue
│   │   ├── FormSelect.vue
│   │   ├── KpiCard.vue
│   │   ├── PageHeader.vue
│   │   ├── PaymentMethodDonut.vue
│   │   ├── PaymentMethodTile.vue
│   │   ├── Section.vue
│   │   ├── SummaryRow.vue
│   │   └── Table.vue
│   ├── composables/    # Vue composables
│   │   └── useApiError.ts
│   ├── constants/      # Application constants
│   │   ├── PaymentMethods.ts
│   │   └── StatusMessages.ts
│   ├── enums/          # TypeScript enums
│   │   ├── HttpStatus.ts
│   │   ├── PaymentMethod.ts
│   │   └── TransactionStatus.ts
│   ├── layouts/        # Layout components
│   │   └── AdminLayout.vue
│   ├── lib/            # Utility libraries
│   │   ├── errors/     # Error handling utilities
│   │   └── http/       # HTTP client and interceptors
│   ├── router/         # Vue Router configuration
│   │   └── index.ts
│   ├── services/       # API services
│   │   ├── dashboard/
│   │   ├── payment-links/
│   │   └── transactions/
│   ├── stores/         # Pinia stores
│   │   ├── auth.ts
│   │   └── Transactions.ts
│   ├── types/          # TypeScript type definitions
│   │   ├── api/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── payment-links/
│   │   └── transactions/
│   ├── utils/          # Utility functions
│   │   └── formatters.ts
│   ├── views/          # Page components
│   │   ├── auth/       # Authentication views
│   │   ├── dashboard/  # Dashboard view
│   │   ├── payment-link/  # Payment link views
│   │   ├── profile/    # Profile settings
│   │   └── transaction/   # Transaction views
│   ├── App.vue         # Root component
│   ├── main.ts         # Application entry point
│   └── style.css       # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── vitest.config.ts
```

## Application Routes

### Public Routes
- `/login` - User login
- `/register` - User registration
- `/forgot-password` - Password recovery
- `/reset-password` - Password reset
- `/payment/:payment_link_id` - Payment link details (for customers)
- `/payment-status` - Transaction status check

### Protected Merchant Routes (`/merchant`)
- `/merchant/dashboard` - Analytics dashboard with KPIs and charts
- `/merchant/create-transaction` - Create a new transaction
- `/merchant/create-payment-link` - Create a new payment link
- `/merchant/transactions` - View all transactions
- `/merchant/transactions/:transactionUuid` - Transaction details
- `/merchant/payment-refunds` - Process transaction refunds
- `/merchant/notifications` - View transaction notifications
- `/merchant/api-credentials` - Manage API credentials

## API Integration

The application integrates with a RESTful payment API. All API requests are handled through service classes with TypeScript type definitions for type safety.

### Key API Services
- **Dashboard Service**: Fetch analytics, KPIs, and transaction summaries
- **Transaction Service**: Create, view, refund, and check transaction status
- **Payment Link Service**: Create, view payment link details, and confirm payments
- **Auth Service**: User authentication and authorization

### Payment Flow

#### Customer Payment Flow
1. Customer accesses payment link via `/payment/:payment_link_id`
2. Application fetches payment details from the API
3. Customer enters personal information (name, email)
4. Customer selects a payment method (TPAY, PAYNOW, or NODA)
5. Customer confirms payment and is redirected to the payment provider
6. After payment, customer can check status via `/payment-status`

#### Merchant Flow
1. Merchant logs in and accesses the dashboard
2. Merchant can create transactions or payment links
3. Merchant monitors transactions, refunds, and receives notifications
4. Merchant manages API credentials for payment providers

## Supported Payment Methods

- **TPAY**: Fast and secure online payments
- **PAYNOW**: Quick payment method  
- **NODA**: Secure payment solution

## Key Features in Detail

### Merchant Dashboard
- **Real-time Analytics**: View transaction totals, rejected transactions count
- **Balance Tracking**: Monitor balances across multiple currencies (PLN, EUR, USD)
- **Payment Method Distribution**: Visual representation of payment method usage via donut charts
- **Revenue Charts**: Track revenue trends over time
- **Transaction History**: View and filter recent transactions

### Transaction Management
- Create new transactions with customer details
- View detailed transaction information
- Process refunds with status validation
- Track transaction status in real-time
- Filter and search transactions

### Payment Links
- Generate shareable payment links
- Set expiration dates for payment links
- Collect customer information (name, email)
- Support multiple payment methods
- Track payment link status

### Security
- Laravel Sanctum bearer token-based authentication
- Protected routes with route guards
- Secure API credential management
- Token expiration handling
- Password reset functionality

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
