# Vicios

## Project Overview

This project is a web application built with React, TypeScript, and Vite. It uses Tailwind CSS for styling and includes internationalization support.

## Project Structure

The project follows a well-organized structure for better maintainability:

```
src/
├── assets/        # Static assets like images, fonts, etc.
├── components/    # Reusable UI components
├── config/        # Configuration files, constants, and messages
│   └── locales/   # Internationalization files
├── hooks/         # Custom React hooks
├── layouts/       # Layout components like App.tsx
├── pages/         # Page components (full pages)
├── sections/      # Page sections for single-page layout
├── services/      # API services and data fetching
├── styles/        # CSS and styling files
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
└── main.tsx       # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Code Quality and Verification

```bash
# Run TypeScript type checking
npm run typecheck

# Run ESLint
npm run lint

# Fix ESLint issues automatically
npm run lint:fix

# Check formatting with Prettier
npm run prettier

# Fix formatting issues with Prettier
npm run prettier:fix

# Run all verification checks (typecheck, lint, prettier)
npm run verify
```

## Development Guidelines

### Component Organization

- Create new components in the `components/` directory
- For complex components, use the folder pattern with an index.ts export
- Keep components small and focused on a single responsibility

### Styling

- Use Tailwind CSS classes for styling
- For custom styles, add them to appropriate files in the `styles/` directory

### TypeScript

- Define types in the `types/` directory
- Use proper typing for all components and functions

### Internationalization

- Add new messages to the locale files in `config/locales/`
- Use the React Intl components for translated content

## Deployment

Run the deployment script:

```bash
./deploy.sh
```

## License

[Add your license information here]

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```
