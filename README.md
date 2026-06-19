# Bloomora — Full-Stack E-Commerce Store

A complete, production-style e-commerce application for browsing and purchasing
products, with a customer storefront, full Stripe checkout, and an admin back office.
Built with Next.js (App Router), TypeScript, Prisma, and a Neon Postgres database.

🔗 **Live demo:** https://art-store-kappa.vercel.app

## Features

- **Storefront**: Product catalogue with detail pages, categories, and a paginated
  product listing
- **Cart & Checkout**: Persistent cart, multi-step checkout (shipping address →
  payment method → place order) and an order confirmation flow
- **Payments**: Stripe payment intents on the client + a server-side Stripe webhook
  that marks orders as paid
- **Authentication**: Credentials-based auth via NextAuth (Auth.js v5) with a Prisma
  adapter, JWT sessions, edge-compatible password hashing, and route protection in
  middleware
- **Admin dashboard**: Sales overview plus CRUD for products, categories, orders,
  and users (role-gated)
- **User area**: Profile management and order history
- **Image uploads**: Product/category images handled through UploadThing
- **Transactional email**: Order receipts rendered with React Email and sent via Resend
- **Type-safe & validated**: End-to-end TypeScript with Zod schemas validating form
  and server-action input
- **Server Actions**: Data mutations implemented as Next.js server actions in `lib/actions/`

## Tech Stack

- **Framework**: Next.js 15 (App Router, React 19, server actions)
- **Language**: TypeScript
- **Database**: PostgreSQL on [Neon](https://neon.tech/) (serverless driver)
- **ORM**: Prisma 6 (multi-file schema, Neon driver adapter)
- **Auth**: NextAuth / Auth.js v5 (Credentials provider, Prisma adapter)
- **Payments**: Stripe
- **File uploads**: UploadThing
- **Email**: Resend + React Email
- **Styling**: Tailwind CSS + shadcn/ui (Radix primitives)
- **Forms & validation**: React Hook Form + Zod
- **Package manager**: pnpm

## Project Structure

```
app/
├── (auth)/                 # Sign-in / sign-up
├── (root)/                 # Storefront
│   ├── product/[slug]/     # Product detail
│   ├── cart/               # Cart
│   ├── (checkout)/         # shipping-address → payment-methods → place-order
│   └── order/[id]/         # Order detail + confirmation
├── admin/                  # Admin: dashboard, products, categories, orders, users
├── user/                   # Customer: profile, orders
└── api/
    ├── auth/[...nextauth]/ # NextAuth handler
    ├── stripe/create-intent/
    ├── webhooks/stripe/    # Stripe webhook
    └── uploadthing/        # Image uploads
lib/
├── actions/                # Server actions (cart, order, product, category, user, ...)
├── validators/             # Zod schemas
├── constants/              # App defaults
└── helpers/ · types/ · utils.ts
prisma/                     # Multi-file schema (User, Product, Category, Cart,
                            # Order, OrderItem, ShippingAddress, Account, Session, ...)
email/                      # React Email templates
```

## Getting Started

### Prerequisites

- Node.js 18+
- [pnpm](https://pnpm.io/)
- A PostgreSQL database (a free [Neon](https://neon.tech/) project works well)
- Stripe, Resend, and UploadThing accounts for the respective features

### Installation

```bash
# Install dependencies (runs `prisma generate` via postinstall)
pnpm install

# Apply the Prisma schema to your database
pnpm prisma migrate dev    # or: pnpm prisma db push

# Start the dev server (runs on http://localhost:4000)
pnpm dev
```

### Environment variables

Create a `.env` file in the project root. The values below are the variables the
app reads — fill them with your own credentials:

```bash
# Database (Neon Postgres)
DATABASE_URL="postgresql://user:password@host/db?sslmode=require"
DATABASE_URL_PROD="postgresql://..."          # optional: production connection

# App
NEXT_PUBLIC_APP_NAME="Bloomora"
NEXT_PUBLIC_APP_DESCRIPTION="A place to find and purchase art."
NEXT_PUBLIC_SERVER_URL="http://localhost:4000"
NEXT_PUBLIC_LATEST_PRODUCTS_LIMIT=10
NEXT_PUBLIC_PAGE_SIZE=10

# Auth
MAX_TOKEN_LIFE=2592000                          # session/JWT lifetime (seconds)

# Payments (Stripe)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
PAYMENT_METHODS="PayPal,Stripe,Credit Card"
DEFAULT_PAYMENT_METHOD="Credit Card"

# Email (Resend)
RESEND_API_KEY="re_..."
SENDER_EMAIL="onboarding@resend.dev"
```

### Useful scripts

```bash
pnpm dev      # Start the dev server on port 4000
pnpm build    # Production build
pnpm start    # Run the production build
pnpm lint     # Lint
pnpm email    # Preview React Email templates locally (port 3001)
```

## Screenshots

> _Add screenshots here._

| Storefront | Product detail | Admin dashboard |
| --- | --- | --- |
| _(screenshot)_ | _(screenshot)_ | _(screenshot)_ |

## License

This project is for portfolio and educational purposes.
