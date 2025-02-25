## tRPC Starter Template

Welcome to the `tRPC` starter template. This template is designed to help you quickly bootstrap a new project with a modern stack, including `tRPC` for type-safe APIs, `MongoDB` for database storage, and `Redis` for caching and other use cases.

This template includes basic configurations, folder structures, and example code to get you started. Feel free to customize it according to your project requirements.

### Features
* **`tRPC`** Type-safe API endpoints with tRPC for seamless communication between the client and server.
* **`MongoDB`** Integrated MongoDB for database storage with a basic connection setup adnd `DB` operations.
* **`Redis`** Redis integration for caching, session management, or other use cases.
* **`TypeScript`** Full TypeScript support for type safety and better developer experience.
* **`Modular Structure`** MOrganized folder structure for scalability.
* **`Example Code`** Includes basic tRPC routers, MongoDB models, and Redis usage examples.

### Prerequisites
Before you begin, ensure you have the following installed:

* `Node.js` (v18 or higher recommended)

* `MongoDB` (running locally or accessible via a connection string)

* `Redis` (running locally or accessible via a connection string)

* `yarn` or `npm` or `pnpm` (package manager)

* `Docker` (if want to run the `mongodb` and `redis` locally without installing in machine)

### Installation

1. Clone the repository

    ```bash
    git clone https://github.com/PrantaDas/trpc-starter.git
    ```

2. Change the dirctory

    ```bash
    cd trpc-starter
    ```

3. Install dependencies

    Using npm 

    ```bash
    npm install
    ```

    Using pnpm 

    ```bash
    pnpm install
    ```

    Using yarn 

    ```bash
    yarn install
    ```

4. Set up environment variables:
    ```bash
    NODE_ENV=""
    PORT=""
    MONGO_URL=""
    COOKE_KEY=""
    X_API_KEY=""
    JWT_SECRET=""
    REDIS_HOST=""
    REDIS_PORT=""
    ```

### Folder Structure

```typescript
.
├── src/
|   ├── cache/
|   |   └── redis.ts
|   |
|   ├── config/
|   |   └── index.ts
|   |
|   ├── db/
|   |   ├── models
|   |   |   └── User.ts
|   |   |
|   |   ├── db.ts
|   |   └── operations.ts
|   |
|   ├── errors/
|   |   └── appError.ts
|   |
|   ├── middlewares/
|   |   ├── apiKey.ts
|   |   ├── auth.ts
|   |   ├── cache.ts
|   |   ├── checkRole.ts
|   |   └── errorHandler.ts
|   |
|   ├── modules/
|   |   └── User
|   |       ├── auth.router.ts
|   |       └── auth.service.ts
|   |
|   ├── trpc/
|   |   ├── context.ts
|   |   ├── index.ts
|   |   └── routes.ts
|   ├── utils/
|   ├── validations/
|   |
|   ├── app.ts
|   ├── server.ts
|   └── types.ts
├── .dockerignore
├── .env
├── .nvmrc
├── docker-compose.yml
├── LICENSE
├── package.json
├── README.md
└── tsconfig.json
```

### Scripts
* `dev`: Start the development server with hot reloading.

* `build`: Compile TypeScript code to JavaScript.

* `start`: Start the production server.

### Contributing
If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request. Contributions are welcome!

### License
This project is licensed under the MIT License. See the [LICENSE](https://github.com/PrantaDas/trpc-starter/blob/main/LICENSE) file for details.