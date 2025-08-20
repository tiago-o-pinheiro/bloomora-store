# Art Store

Art Store is a full-stack demo storefront built with Next.js and Prisma. It
showcases modern e‑commerce features and serves as a portfolio project.

## Features

- ✨ Latest products fetched via Next.js Server Actions and Prisma
- 🖼️ Product pages with image gallery, pricing, stock indicators and
  add‑to‑cart placeholder
- 🎨 Responsive UI styled with Tailwind CSS and Radix UI primitives
- 🌗 Light/dark theme toggle powered by `next-themes`
- ✅ Data validation with Zod
- 🗃️ PostgreSQL database access through Prisma and the Neon serverless driver
- 🧪 Ready-to-seed sample data for quick demos

## Tech Stack

- [Next.js 15](https://nextjs.org/) with the App Router
- [React 19](https://react.dev/) & TypeScript
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/) + [Neon](https://neon.tech/) (PostgreSQL)
- [Zod](https://zod.dev/) for schema validation
- [Radix UI](https://www.radix-ui.com/) & [Lucide Icons](https://lucide.dev/)

## Getting Started

### 1. Install dependencies

```bash
npm install
# or
pnpm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgres://USER:PASSWORD@HOST:PORT/DB"
NEXT_PUBLIC_APP_NAME="Art Store"
NEXT_PUBLIC_APP_DESCRIPTION="A place to find and purchase art."
NEXT_PUBLIC_SERVER_URL="http://localhost:3000"
NEXT_PUBLIC_LATEST_PRODUCTS_LIMIT=10
```

### 3. Set up the database and seed sample data

```bash
npx prisma db push
npx ts-node db/seed.ts
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Available Scripts

- `npm run dev` – start the development server
- `npm run build` – build for production
- `npm start` – run the production build
- `npm run lint` – run ESLint

## Project Structure

- `app/` – Next.js App Router pages and layouts
- `components/` – UI components and widgets
- `db/` – Prisma client setup and seed scripts
- `lib/` – helpers, constants and server actions
- `public/` – static assets and sample product images

---

This project is a work in progress and aims to demonstrate full-stack web
development for a portfolio.

