# Our Home — E-Commerce

## What This Does
The customer-facing storefront for the Our Home e-commerce site: browse products
by category, search, view product details, manage a cart, and check out via Stripe.

## Tech Stack
- React 18 (Create React App) + React Router v6
- Tailwind CSS
- Axios for API calls
- Stripe Checkout (redirect)

## Prerequisites
- Node.js 18+
- The backend API running (see `../our-home-server`)

## Setup
1. `cp .env.example .env` and fill in the values
2. `npm install`
3. `npm start` — runs on http://localhost:3000

## Environment Variables
| Variable | Description |
|----------|-------------|
| `REACT_APP_API_URL` | Backend base URL, including `/api` |
| `REACT_APP_STRIPE_PUBLIC_KEY` | Stripe **publishable** key (`pk_`) |

> ⚠️ Every `REACT_APP_*` value is compiled into the public JS bundle. Never put a
> secret (server token, `sk_` key, DB password) in this file.

## Pages
| Route | Page |
|-------|------|
| `/` | Home |
| `/products/:id` | Products by category |
| `/product/:id` | Product detail |
| `/search?query=` | Search results |
| `/cart` | Cart + checkout |
| `/success`, `/cancel` | Stripe redirect results |

## Project Structure
- `src/pages/` — route components
- `src/components/` — UI + feature components
- `src/context/CartContext.jsx` — cart state (persisted to localStorage)
- `src/hook/useFetch.jsx` — data-fetching hook (abortable)
- `src/request.js` — configured Axios instance
