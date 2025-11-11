# Instruction

## Prerequisites

Before you start, ensure you have:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)

## Step 1: Clone Repository

```bash
git clone git@github.com:wahyuha/settlement-app.git
cd settlement-app
```

## Step 2: Install Dependencies

```bash
npm install
```

This installs all packages listed in `package.json`.

## Step 3: Create Environment File

Create `.env` in the project root:

```env
NEXT_PUBLIC_API_URL="http://localhost:8080/api/v1/transactions"
```


## Step 5: Running Project

```bash
npm run dev
```

Open http://localhost:3000 in your browser!


# Architecture

### Overview

This app uses a **Client-Side Rendered (CSR)** React application with Next.js.


### Core Technologies

| Layer | Technology | Note |
|-------|-----------|-----|
| **Framework** | React 18 + TypeScript | Type safety, component reusability |
| **React Framework** | Next.js (CSR) | Server compatibility, routing, image optimization |
| **State** | Zustand | Lightweight |

### Key Design Decisions

### Architecture Pattern
- **Separation of Concerns** 
	- Logic and presentation are separated using custom hooks and components
  - Custom hooks handle business logic, data fetching, and state management
  - Components focus purely on UI rendering and user interactions
  - To keep maintainability

### Client-Side Rendering (CSR)
- **Pros:** Faster interactivity, real-time state updates
- **Cons:** SEO limitations

### Zustand over Context API
- **Pros:** Easy
- **Cons:** Limitation usage for SSR

### Performance Considerations

- **Image Optimization** - Next.js Image component with lazy loading
- **Code Splitting** - Route based code splitting automatically

![[Screenshot 2025-11-11 at 23.33.32.png]]