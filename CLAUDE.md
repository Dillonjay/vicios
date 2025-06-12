# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vicios Ocultos is a bilingual (English/Spanish) band website built with React, TypeScript, and Vite. The site features smooth animations, internationalization, and a modern single-page application architecture.

## Essential Commands

```bash
# Development
npm run dev              # Start development server on http://localhost:5173

# Build & Preview
npm run build           # Build for production
npm run preview         # Preview production build locally

# Code Quality (run these before committing)
npm run lint            # Check ESLint errors
npm run typecheck       # Check TypeScript types
npm run verify          # Run all checks (lint + typecheck + prettier)

# Deployment
./deploy.sh             # Deploy to viciososocultos.com (requires SSH access)
```

## Architecture Overview

### Key Technologies
- **React 18** with TypeScript for type safety
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for styling with custom Aileron font family
- **Framer Motion** for animations
- **React Intl** for internationalization (en/es)
- **Lenis** for smooth scrolling

### Project Structure
```
src/
├── components/      # Reusable UI components (AlbumShowcase, Navigation, etc.)
├── sections/        # Page sections (About, Connect, Lyrics, Project)
├── config/locales/  # i18n translations (en.json, es.json)
├── hooks/          # Custom React hooks
├── layouts/        # App.tsx main layout
├── pages/          # Home.tsx (single page app)
└── types/          # TypeScript type definitions
```

### Important Patterns

1. **Internationalization**: All text content should use React Intl's `useIntl()` hook:
   ```typescript
   const intl = useIntl();
   const text = intl.formatMessage({ id: 'message.key' });
   ```

2. **Component Structure**: Components follow a consistent pattern with TypeScript interfaces and default exports.

3. **Styling**: Use Tailwind CSS classes. Custom styles go in component-specific CSS modules when needed.

4. **Path Aliases**: Use `@/` to import from `src/` directory.

## Key Files to Know

- `src/config/locales/*.json` - All translatable content
- `src/components/LanguageToggle/` - Language switching functionality
- `src/sections/*` - Main content sections of the site
- `vite.config.ts` - Build configuration and path aliases
- `deploy.sh` - Deployment script with server details

## Development Notes

- The site is a single-page application with smooth scroll navigation
- All images should be placed in both `public/images/` and `src/assets/images/` for proper handling
- The Aileron font family is loaded from `public/fonts/`
- No testing framework is configured; rely on TypeScript and ESLint for code quality
- Always run `npm run verify` before committing changes