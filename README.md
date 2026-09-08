# Fable

Fable is a premium digital bookstore and ebook marketplace built with Next.js. Readers can discover and purchase original ebooks, writers can publish and manage their books, and administrators can moderate the catalogue and monitor platform activity.

## Live Demo

[Open the live application](https://fable-six-alpha.vercel.app/)

## Source Code

[GitHub repository](https://github.com/sourjo-ghosh/fable-ass10)

## Overview

The application provides a role-based reading and publishing experience:

- Guests can explore the public home page, catalogue, genres, and ebook details.
- Readers can bookmark books, purchase ebooks through Stripe Checkout, and view their library and purchase history.
- Writers can add, edit, publish, unpublish, and delete ebooks, then review their sales history.
- Administrators can manage users and ebooks, change user roles, review transactions, and view platform analytics.

## Core Features

### Discovery and catalogue

- Editorial-style home page with hero, featured ebooks, top writers, genres, and trust sections.
- Public ebook catalogue at `/all-ebooks`.
- Search by title, author, or genre.
- Genre filtering and price/title sorting.
- Responsive ebook cards, loading skeletons, empty states, and retry states.
- Public ebook details at `/all-ebooks/[id]`.

### Authentication and roles

- Email and password authentication powered by Better Auth.
- Optional Google OAuth integration.
- MongoDB-backed authentication sessions.
- Role selection for new accounts.
- Protected dashboard routes with server and client-side session checks.
- Separate workspaces for `user`, `writer`, and `admin` roles.

### Reader workspace

- Purchased ebook library.
- Purchase history with writer, price, date, and status.
- Bookmark collection.
- Profile management.
- Stripe Checkout purchase flow with success and cancellation pages.

### Writer workspace

- Ebook creation with title, description, genre, price, and cover image.
- Image upload through ImgBB or the configured image upload endpoint.
- Ebook editing and deletion.
- Publish/unpublish controls.
- Sales history.
- Bookmarks and profile management.

### Admin workspace

- Platform analytics overview.
- User management and role changes.
- Ebook moderation, publishing controls, and deletion.
- Transaction overview.

## Tech Stack

- Next.js 16 App Router
- React 19
- Better Auth
- MongoDB with the Better Auth MongoDB adapter
- Stripe Checkout
- ImgBB image hosting
- Tailwind CSS 4
- HeroUI
- React Hot Toast
- React Icons and Gravity UI Icons
- ESLint 9

## Project Structure

```text
src/
  app/                    Next.js routes, layouts, auth, dashboards, and payment pages
  components/             Shared public and dashboard UI components
  lib/
    auth.js               Server-side Better Auth configuration
    auth-client.js        Client-side Better Auth configuration
    actions/              Server actions for catalogue and dashboard API calls
  proxy.js                Session and role-based route protection
public/                   Static assets
```

## Routes

| Route | Access | Purpose |
| --- | --- | --- |
| `/` | Public | Home page |
| `/all-ebooks` | Public | Searchable ebook catalogue |
| `/all-ebooks/[id]` | Public | Ebook details and purchase entry point |
| `/login` | Public | Sign in |
| `/signup` | Public | Create an account |
| `/role-selector` | Authenticated | Select a user or writer role |
| `/dashboard/user` | User | Reader overview |
| `/dashboard/user/purchased-ebooks` | User | Purchased ebook library |
| `/dashboard/user/purchase-history` | User | Purchase history |
| `/dashboard/user/bookmarks` | User | Saved ebooks |
| `/dashboard/writer` | Writer | Writer overview |
| `/dashboard/writer/add-ebook` | Writer | Add an ebook |
| `/dashboard/writer/manage-ebooks` | Writer | Manage owned ebooks |
| `/dashboard/writer/edit-ebook/[slug]` | Writer | Edit an ebook |
| `/dashboard/writer/sales-history` | Writer | Sales history |
| `/dashboard/admin` | Admin | Analytics overview |
| `/dashboard/admin/manage-users` | Admin | Manage users and roles |
| `/dashboard/admin/manage-ebooks` | Admin | Moderate ebooks |
| `/dashboard/admin/transactions` | Admin | Review transactions |
| `/dashboard/my-profile` | Authenticated | Manage profile |

## Getting Started

### Prerequisites

- Node.js 20 or newer is recommended.
- npm.
- A MongoDB database.
- The Fable backend API running locally or deployed.
- Stripe credentials for checkout.
- An ImgBB API key, or a compatible image upload endpoint.

### Installation

```bash
git clone <repository-url>
cd fable
npm install
```

Create a `.env.local` file in the project root and add the values described in the environment variables section.

Add the values described below, then start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

The repository intentionally ignores `.env*` files. Never commit credentials or private keys.

| Variable | Required | Description |
| --- | --- | --- |
| `MONGODB_URI` | Yes | MongoDB connection string used by Better Auth |
| `MONGODB_USERNAME` | Yes | MongoDB database name used by the auth adapter |
| `NEXT_PUBLIC_BASE_URL` | Yes | Base URL used by the Better Auth client, for example `http://localhost:3000` |
| `NEXT_PUBLIC_SERVER_URL` | Yes | Base URL of the Fable backend API, for example `http://localhost:8000` |
| `GOOGLE_CLIENT_ID` | Optional | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Optional | Google OAuth client secret |
| `NEXT_PUBLIC_IMGBB_API_KEY` | Optional | ImgBB key used for ebook and profile image uploads |
| `NEXT_PUBLIC_IMAGE_UPLOAD_API` | Optional | Alternative image upload value supported by the forms |

If both Google credentials are present, Google sign-in is enabled. The image upload forms use `NEXT_PUBLIC_IMAGE_UPLOAD_API` first and fall back to `NEXT_PUBLIC_IMGBB_API_KEY`.

## Backend API Dependency

This repository contains the Next.js client. It calls a separate backend through `NEXT_PUBLIC_SERVER_URL`. The client expects endpoints for catalogue reads, ebook CRUD, bookmarks, role management, user and writer dashboards, admin operations, and Stripe payment confirmation.

The main endpoint groups used by the client are:

- `/api/all-ebooks`, `/api/ebook/:id/:userId`
- `/api/add-ebook`, `/api/edit-ebook/:id`, `/api/delete-ebook/:id`
- `/api/publish-ebook/:userId`, `/api/admin/manage-ebook/*`
- `/api/bookmarks/:userId`, `/api/toggle-bookmark/:userId`
- `/api/user/purchased-books/:userId`, `/api/user/purchased-history/:userId`
- `/api/writer/sales-history/:userId`
- `/api/admin/all-users/:userId`, `/api/admin/all-transactions/:userId`
- `/api/admin/analytics-overview/:userId`
- `/api/create-checkout-session`, `/api/payment-success/:sessionId`
- `/api/set-role`, `/api/verify-writer`

Make sure the backend allows requests from the frontend origin and is reachable from both server actions and the browser. In production, use HTTPS URLs and configure Stripe webhook or payment confirmation behavior in the backend deployment.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Authentication Notes

Better Auth is configured in `src/lib/auth.js` with MongoDB persistence and the admin plugin. The route proxy protects `/dashboard/*` and `/role-selector`, while `DashboardShell` repeats the session check on the client for a reliable loading and redirect experience.

The role homes are:

```text
user   -> /dashboard/user
writer -> /dashboard/writer
admin  -> /dashboard/admin
```

## Deployment Checklist

1. Set every required environment variable in the hosting provider.
2. Deploy the backend API and set `NEXT_PUBLIC_SERVER_URL` to its public HTTPS URL.
3. Set `NEXT_PUBLIC_BASE_URL` to the deployed frontend URL.
4. Configure MongoDB network access for the deployed auth service.
5. Configure Google OAuth redirect URLs if Google login is enabled.
6. Configure Stripe success, cancel, and backend payment confirmation URLs.
7. Confirm backend CORS allows the deployed frontend origin.
8. Run `npm run lint` and `npm run build` before release.
9. Test public routes, authentication, role redirects, ebook purchase, bookmarks, image upload, and dashboard reloads in production.

## Demo Admin Account

Do not publish real credentials in a public repository. If a seeded admin account is required for a private demo, configure it through the backend seed process or deployment secret manager.

## License

No license has been specified for this repository yet.
