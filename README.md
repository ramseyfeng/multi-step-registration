# Multi-Step Registration Form

> **Node.js version recommended:** >=18.0.0

## Introduction

Multi-Step Registration Form is a modern web application that guides users through a step-by-step registration process. It features form validation, user feedback via toast notifications, and a clean, responsive UI.

### Tech Stack

- **React 19** for building the user interface
- **TypeScript** for static typing
- **Vite** for fast development and build tooling
- **MUI (Material UI)** for UI components and theming
- **React Hook Form** for form state management and validation
- **MUI X Date Pickers** for date input
- **Vitest** and **Testing Library** for unit and integration testing
- **ESLint** and **Prettier** for code quality and formatting
- **Tailwind CSS** for utility-first styling

## Setup Instructions

1. **Install dependencies**

   Using pnpm:

   ```sh
   pnpm install
   ```

2. **Prepare Husky (for git hooks, optional):**
   ```sh
   pnpm run prepare
   ```

## How to Run the App

Start the development server:

```sh
pnpm dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) by default.

To build for production:

```sh
pnpm build
```

To preview the production build:

```sh
pnpm preview
```

## How to Run the Tests

Run all tests in watch mode:

```sh
pnpm test
```

Run tests once for CI:

```sh
pnpm test:ci
```

---

- Lint your code with:
  ```sh
  pnpm lint
  ```
- Format your code with:
  ```sh
  pnpm format
  ```
