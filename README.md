# tRPC Starter

> A production-ready Node.js boilerplate built with **tRPC**, **MongoDB**, and **Redis** — featuring end-to-end type safety, JWT authentication, role-based access control, real-time WebSocket subscriptions, and Redis caching out of the box.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.x-brightgreen)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![tRPC](https://img.shields.io/badge/tRPC-10.x-398CCB?logo=trpc)](https://trpc.io/)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [1. Clone the repository](#1-clone-the-repository)
  - [2. Install dependencies](#2-install-dependencies)
  - [3. Configure environment variables](#3-configure-environment-variables)
  - [4. Start infrastructure services](#4-start-infrastructure-services)
  - [5. Run the development server](#5-run-the-development-server)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Docker](#docker)
- [API Reference](#api-reference)
  - [Procedure Types](#procedure-types)
  - [Auth Module](#auth-module)
  - [Adding a New Module](#adding-a-new-module)
  - [Using the Cache Middleware](#using-the-cache-middleware)
- [Architecture](#architecture)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

`tRPC Starter` is a batteries-included backend starter template for building type-safe APIs with Node.js. It eliminates the boilerplate of setting up authentication, caching, logging, error handling, and real-time communication from scratch, so you can focus on building your product.

---

## Features

- **End-to-end type safety** — tRPC with SuperJSON serialization; share types directly between server and client
- **HTTP + WebSocket transport** — single tRPC router served over both HTTP and WebSockets on the same port
- **Real-time subscriptions** — event-emitter–based pub/sub with observable subscriptions
- **JWT authentication** — Bearer token and cookie-based auth via reusable tRPC middleware
- **Role-based access control** — `publicProcedure`, `privateProcedure`, and `adminProcedure` out of the box
- **API key guard** — header-level `x-api-key` validation middleware
- **Redis caching** — singleton `RedisCache` client with configurable TTL per procedure
- **MongoDB integration** — Mongoose ODM with pagination support (`mongoose-paginate-v2`)
- **Input validation** — Zod schemas with descriptive error messages
- **Structured logging** — Winston with JSON formatting and file transport for errors
- **Security hardening** — Helmet, CORS, bcrypt password hashing
- **Docker-ready** — `Dockerfile` and `docker-compose.yml` for MongoDB and Redis

---

## Tech Stack

| Layer           | Technology                        |
| --------------- | --------------------------------- |
| Runtime         | Node.js 20+                       |
| Language        | TypeScript 5 (strict mode)        |
| API Framework   | tRPC 10                           |
| HTTP Server     | `@trpc/server` standalone adapter |
| WebSockets      | `ws` + `@trpc/server` WS adapter  |
| Database        | MongoDB via Mongoose 8            |
| Cache           | Redis via ioredis 5               |
| Authentication  | JSON Web Tokens (`jsonwebtoken`)  |
| Validation      | Zod                               |
| Serialization   | SuperJSON + devalue               |
| Logging         | Winston                           |
| Security        | Helmet, CORS, bcrypt              |
| Package Manager | pnpm                              |

---

## Project Structure

```
.
├── src/
│   ├── app.ts                    # Server factory — HTTP + WebSocket setup
│   ├── server.ts                 # Application entry point
│   ├── types.ts                  # Shared TypeScript types and interfaces
│   │
│   ├── config/
│   │   └── index.ts              # Centralised environment configuration
│   │
│   ├── trpc/
│   │   ├── index.ts              # tRPC initialisation; procedure builders exported here
│   │   ├── context.ts            # Request context factory
│   │   └── routes.ts             # Root router — compose all sub-routers here
│   │
│   ├── modules/
│   │   └── auth/
│   │       ├── auth.router.ts    # Auth tRPC router (register, login, subscription)
│   │       └── auth.service.ts   # Auth business logic
│   │
│   ├── db/
│   │   ├── db.ts                 # MongoDB connection
│   │   ├── operations.ts         # Generic DB query helpers with pagination
│   │   └── models/
│   │       └── User.ts           # Mongoose User model
│   │
│   ├── middlewares/
│   │   ├── auth.ts               # JWT authentication middleware
│   │   ├── apiKey.ts             # API key validation middleware
│   │   ├── cache.ts              # Redis caching middleware (configurable TTL)
│   │   ├── checkRole.ts          # Admin role-guard middleware
│   │   ├── errorHandler.ts       # Global tRPC error handler middleware
│   │   └── combinedMiddleware.ts # Express-level CORS + Helmet chain
│   │
│   ├── cache/
│   │   └── redis.ts              # Singleton RedisCache client
│   │
│   ├── errors/
│   │   └── appError.ts           # Custom AppError class
│   │
│   ├── utils/
│   │   ├── getUserFromToken.ts   # JWT verification helper
│   │   ├── logger.ts             # Winston logger instance
│   │   ├── parseCookie.ts        # Cookie string parser
│   │   ├── response.ts           # Standardised success response helper
│   │   └── validApiKey.ts        # API key validation helper
│   │
│   └── validations/
│       └── auth.ts               # Zod schemas for auth input
│
├── Dockerfile
├── docker-compose.yml            # MongoDB + Redis services
├── tsconfig.json
└── package.json
```

---

## Prerequisites

- **Node.js** >= 20.x
- **pnpm** >= 9.x — install with `npm i -g pnpm`
- **MongoDB** >= 6.x (or Docker)
- **Redis** >= 7.x (or Docker)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/PrantaDas/tRPC-starter.git
cd tRPC-starter
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

Create a `.env` file in the project root. See the [Environment Variables](#environment-variables) section for a description of each key:

```bash
cp .env.example .env
```

### 4. Start infrastructure services

The included `docker-compose.yml` spins up MongoDB and Redis with persistent volumes:

```bash
docker compose up -d
```

### 5. Run the development server

```bash
pnpm dev
```

The server starts on the port defined in your `.env` (default `7000`). Both HTTP and WebSocket connections are accepted on the same port.

---

## Environment Variables

Create a `.env` file in the project root. All variables are required.

| Variable       | Description                                      | Example                                   |
| -------------- | ------------------------------------------------ | ----------------------------------------- |
| `NODE_ENV`     | Runtime environment                              | `development`                             |
| `PORT`         | Port the server listens on                       | `7000`                                    |
| `MONGO_URL`    | MongoDB connection string                        | `mongodb://localhost:27017/trpc-starter`  |
| `JWT_SECRET`   | Secret key used to sign and verify JWTs          | `a-long-random-string`                    |
| `COOKE_KEY`    | Secret key for signed cookies                    | `another-secret`                          |
| `X_API_KEY`    | Static API key for `x-api-key` header validation | `my-secret-api-key`                       |
| `REDIS_HOST`   | Redis host                                       | `localhost`                               |
| `REDIS_PORT`   | Redis port                                       | `6379`                                    |
| `CORS_ORIGINS` | Comma-separated list of allowed CORS origins     | `http://localhost:3000,https://myapp.com` |

> **Security note:** Never commit `.env` to source control. Add it to `.gitignore`.

---

## Available Scripts

| Script       | Description                                                |
| ------------ | ---------------------------------------------------------- |
| `pnpm dev`   | Start the development server with hot-reload via `nodemon` |
| `pnpm build` | Compile TypeScript to `dist/`                              |
| `pnpm start` | Run the compiled production build from `dist/server.js`    |

---

## Docker

### Infrastructure only (recommended for local development)

```bash
docker compose up -d
```

Starts MongoDB on port `27017` and Redis on port `6379` with named volumes for data persistence.

### Full application container

```bash
# Build the image
docker build -t trpc-starter .

# Run with environment variables
docker run -p 7000:7000 --env-file .env trpc-starter
```

The `Dockerfile` uses Node.js 20, installs pnpm globally, compiles TypeScript, and launches the production server.

---

## API Reference

tRPC does not expose REST endpoints. The client calls procedures by name using a type-safe client generated from the `Routes` type exported from `src/trpc/routes.ts`.

### Procedure Types

Three procedure builders are provided in `src/trpc/index.ts`. Use them when adding new routers.

| Procedure          | Auth Required | Role Required     | Use Case                                         |
| ------------------ | ------------- | ----------------- | ------------------------------------------------ |
| `publicProcedure`  | No            | —                 | Unauthenticated endpoints (e.g. login, register) |
| `privateProcedure` | Yes (JWT)     | `user` or `admin` | Any authenticated user                           |
| `adminProcedure`   | Yes (JWT)     | `admin` only      | Admin-only operations                            |

All three automatically include the global `errorHandler` middleware.

Authentication is resolved via:

1. `Authorization: Bearer <token>` header, or
2. A signed cookie named `some-cookie`

### Auth Module

Base path: `auth`

#### `auth.register` — Mutation

Register a new user account.

**Input**

```ts
{
  name: string; // min 2 characters
  email: string; // valid email format
  password: string; // min 6 characters
}
```

**Response**

```ts
{
  success: true;
  message: "User Created";
  data: {
    _id: string;
    name: string;
    email: string;
    role: "user" | "admin";
    createdAt: string;
    updatedAt: string;
  }
}
```

Fires a `user-registered` event on successful registration, consumed by the `onUserRegister` subscription.

---

#### `auth.login` — Mutation

Authenticate with email and password. Returns a signed JWT.

**Input**

```ts
{
  email: string;
  password: string; // min 6 characters
}
```

**Response**

```ts
{
  success: true;
  message: "User Logged In";
  data: {
    token: string;
    user: {
      (_id, name, email, role, createdAt, updatedAt);
    }
  }
}
```

---

#### `auth.onUserRegister` — Subscription

Real-time event stream that emits an `IUser` object whenever a new user registers. Requires a WebSocket connection.

---

### Adding a New Module

1. Create a directory under `src/modules/<module-name>/`
2. Define your router in `<module-name>.router.ts` using the appropriate procedure builder
3. Register it in `src/trpc/routes.ts`:

```ts
import { myRouter } from "../modules/my-module/my-module.router";

export const routes = router({
  auth: authRouter,
  myModule: myRouter, // add here
});
```

### Using the Cache Middleware

Wrap any query procedure with the `cache` middleware to add Redis-backed caching:

```ts
import { cache } from "../../middlewares/cache";

export const myRouter = router({
  getItems: privateProcedure
    .use(cache(120)) // TTL in seconds
    .query(async () => {
      // result is automatically cached for 120 seconds
    }),
});
```

Cache keys are automatically scoped to the procedure path and serialized input, so different callers with different inputs receive independent cache entries.

---

## Architecture

```
Client (HTTP or WebSocket)
        │
        ▼
 combinedMiddleware
  (CORS + Helmet)
        │
        ▼
   tRPC Router
        │
   ┌────┼──────────────────────────────────────┐
   │    │                                      │
publicProcedure          privateProcedure          adminProcedure
(errorHandler)      (auth → errorHandler)   (auth → checkRole → errorHandler)
   │
   │  [optional] cache middleware (Redis TTL)
   │
   └──► Module Router (e.g. authRouter)
               │
         Service Layer (e.g. AuthService)
               │
         ┌─────┴──────┐
         │            │
      MongoDB        Redis
     (Mongoose)    (ioredis)
```

**Key design decisions:**

- **Singleton Redis client** — `RedisCache.getInstance()` ensures a single connection is reused across the entire application lifecycle.
- **Procedure builders as access-control primitives** — security tiers are enforced at the procedure definition level, not inside handler logic.
- **Event-emitter subscriptions** — WebSocket subscriptions use Node's built-in `EventEmitter` for a zero-dependency pub/sub mechanism.
- **Centralised config** — all `process.env` reads are funnelled through `src/config/index.ts`; no other module reads environment variables directly.
- **Layered middleware** — Express-level middleware (CORS, Helmet) handles transport concerns; tRPC middleware handles application concerns (auth, caching, error handling).

---

## Security

This template applies the following security practices by default:

- **Password hashing** — bcrypt with a cost factor of 10 before any persistence
- **HTTP security headers** — Helmet sets `Content-Security-Policy`, `X-Frame-Options`, and other protective headers on every response
- **CORS allowlist** — only origins listed in `CORS_ORIGINS` are permitted
- **Secrets via environment variables** — JWT secrets and API keys are never hardcoded
- **Sensitive field stripping** — `password` and `__v` are removed from all User model JSON responses via a `toJSON` override
- **Input validation** — Zod schemas reject malformed data before it reaches service or database layers
- **Structured error responses** — internal errors are caught and re-thrown as `TRPCError` to prevent leaking stack traces to clients

---

## Contributing

Contributions are welcome. Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature-name`
3. Commit your changes following [Conventional Commits](https://www.conventionalcommits.org/)
4. Push the branch and open a Pull Request

Ensure your changes compile without errors (`pnpm build`) before submitting.

---

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/PrantaDas/trpc-starter/blob/main/LICENSE) file for details.
