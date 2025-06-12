# Vicios Ocultos - Project Analysis

## Overview

Vicios Ocultos is a modern, bilingual (English/Spanish) single-page application (SPA) built for a music band. The website features smooth animations, internationalization, and a responsive design focused on showcasing the band's music, story, and visual identity.

## Technology Stack

### Core Technologies
- **React 18.3.1** - UI library with hooks and functional components
- **TypeScript 5.6.2** - Type safety and enhanced developer experience
- **Vite 5.4.10** - Fast build tool and development server
- **Tailwind CSS 3.4.15** - Utility-first CSS framework

### Key Libraries
- **Framer Motion 11.11.17** - Advanced animation library
- **React Intl 7.0.1** - Internationalization framework
- **Lenis 1.0.42** - Smooth scroll implementation
- **Locomotive Scroll 4.1.4** - Scroll-based animations
- **React Icons 5.3.0** - Icon component library
- **React Scroll 1.9.0** - Scroll navigation utilities

### Development Tools
- **ESLint 9.13.0** - Code linting and quality checks
- **Prettier** - Code formatting
- **PostCSS** - CSS processing with Autoprefixer
- **TypeScript** - Static type checking

## Project Structure

```
vicios/
├── public/                         # Static assets (served as-is)
│   ├── fonts/                      # Aileron font family (OTF files)
│   ├── images/                     # Band photos, album covers, hero images
│   ├── svgs/                       # Decorative SVG graphics
│   ├── manifest.json               # PWA configuration
│   ├── robots.txt                  # SEO crawler rules
│   └── sitemap.xml                 # Site structure for SEO
│
├── src/                            # Source code
│   ├── assets/                     # Build-processed assets
│   ├── components/                 # Reusable UI components
│   │   ├── AlbumShowcase/          # Album display with animations
│   │   ├── ErrorBoundary/          # Error handling wrapper
│   │   ├── FallingText/            # Animated text effect
│   │   ├── HeroSection/            # Landing hero with parallax
│   │   ├── LanguageToggle/         # Bilingual toggle component
│   │   ├── LoadingSpinner/         # Loading indicator
│   │   ├── MusicButton/            # Audio player control
│   │   ├── Navigation/             # Site navigation
│   │   ├── SongItem/               # Individual song display
│   │   └── StickySection/          # Scroll-based sticky content
│   │
│   ├── config/                     # Configuration and i18n
│   │   ├── locales/                # Translation files (en.json, es.json)
│   │   └── messages files          # Section-specific message definitions
│   │
│   ├── hooks/                      # Custom React hooks
│   │   ├── useLanguage.ts          # Language state management
│   │   └── useIsInView.ts          # Intersection observer hook
│   │
│   ├── sections/                   # Page sections
│   │   ├── About.tsx               # Band story section
│   │   ├── Connect.tsx             # Contact and social links
│   │   ├── Lyrics.tsx              # Song lyrics display
│   │   └── Project.tsx             # Band projects showcase
│   │
│   ├── services/                   # External services
│   │   └── analytics.ts            # Heap Analytics integration
│   │
│   ├── styles/                     # Global styles
│   ├── types/                      # TypeScript type definitions
│   └── utils/                      # Utility functions
│
├── Configuration Files
├── deploy.sh                       # Automated deployment script
└── nginx.conf                      # Server configuration
```

## Key Features

### 1. Internationalization (i18n)
- Full bilingual support (English/Spanish)
- Browser language detection with localStorage persistence
- Animated language toggle with visual feedback
- All UI text externalized to JSON locale files
- Context-aware translations using React Intl

### 2. Animation & User Experience
- Smooth scrolling with Lenis library
- Framer Motion animations throughout
- Parallax effects on hero section
- Scroll-triggered animations
- Custom falling text effects
- Responsive design with mobile-first approach

### 3. Performance Optimizations
- Code splitting with React.lazy()
- Manual chunk optimization in Vite config:
  - `react` chunk for React core libraries
  - `animations` chunk for Framer Motion and Lenis
  - `utils` chunk for utilities and React Intl
- Optimized asset loading
- 30-day cache headers for static assets
- Gzip compression on server

### 4. Visual Design
- Custom Aileron font family
- Tailwind CSS for consistent styling
- Theme-based backgrounds (mountain for English, canyon for Spanish)
- Professional photography and album artwork
- Cohesive color scheme with gradient effects

## Development

### Available Scripts

```bash
# Development
npm run dev              # Start development server (http://localhost:5173)

# Building
npm run build           # Build for production
npm run preview         # Preview production build locally

# Code Quality
npm run lint            # Run ESLint checks
npm run lint:fix        # Auto-fix ESLint issues
npm run typecheck       # TypeScript type checking
npm run prettier        # Check code formatting
npm run prettier:fix    # Auto-fix formatting
npm run verify          # Run all checks (lint + typecheck + prettier)
```

### Environment Variables

**Development (.env.development):**
```
VITE_APP_TITLE=Vicios Ocultos | Dev
VITE_APP_URL=http://localhost:5173
VITE_APP_ENVIRONMENT=development
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Production (.env.production):**
```
VITE_APP_TITLE=Vicios Ocultos | Music Band
VITE_APP_URL=https://viciososocultos.com
VITE_APP_ENVIRONMENT=production
```

## Testing

Currently, the project does not include automated testing. Code quality is maintained through:
- TypeScript strict mode for type safety
- ESLint for code quality enforcement
- Prettier for consistent formatting
- Manual testing and the `npm run verify` command

### Recommended Testing Setup (Future Enhancement)
To add testing capabilities:
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

## Deployment

### Deployment Process

The project includes an automated deployment script (`deploy.sh`) that:

1. Builds the production bundle locally
2. Creates a compressed archive of the dist folder
3. Uploads to the server via SCP
4. Creates a timestamped backup of the current deployment
5. Preserves the `.well-known` directory (SSL certificates)
6. Extracts new files with proper permissions (755)
7. Reloads Nginx configuration

### Deployment Requirements

- SSH access to viciososocultos.com server
- User credentials with deployment permissions
- Node.js and npm installed locally
- Clean git working directory

### Server Configuration

**Infrastructure:**
- Linux server running Nginx
- SSL/TLS certificates from Let's Encrypt
- HTTP to HTTPS redirect
- Security headers (HSTS, CSP, X-Frame-Options)
- Gzip compression enabled

**Nginx Features:**
- SPA routing (all routes → index.html)
- 30-day cache for static assets
- Security headers for protection
- Optimized for performance

### Deployment Commands

```bash
# Automated deployment
./deploy.sh

# Manual deployment steps (if needed)
npm run build
tar -czf vicios-dist.tar.gz dist/
scp vicios-dist.tar.gz user@viciososocultos.com:/tmp/
ssh user@viciososocultos.com
# Then on server:
cd /var/www/viciososocultos.com
sudo tar -czf backup-$(date +%Y%m%d-%H%M%S).tar.gz .
sudo tar -xzf /tmp/vicios-dist.tar.gz --strip-components=1
sudo chmod -R 755 .
sudo nginx -s reload
```

## Component Architecture

### Key Components

1. **LanguageToggle**
   - Animated bilingual toggle with flag emojis
   - Morphs from circle to pill shape on hover
   - Background changes based on selected language
   - Full keyboard accessibility

2. **HeroSection**
   - Full-screen landing with parallax effects
   - Responsive background images
   - Animated text elements

3. **AlbumShowcase**
   - Interactive album display
   - Smooth transitions between albums
   - Integration with music player

4. **Navigation**
   - Sticky navigation bar
   - Smooth scroll to sections
   - Bilingual menu items

## Code Quality Standards

### TypeScript Configuration
- Strict mode enabled
- No implicit any
- Strict null checks
- ES2022 target with ESNext modules

### ESLint Rules
- React hooks rules
- TypeScript ESLint recommended
- Custom rules for code consistency

### Development Best Practices
- Functional components with hooks
- TypeScript interfaces for all props
- Memoization for performance
- Consistent file naming conventions
- Modular component structure

## Analytics & Monitoring

- **Heap Analytics** integration (ID: 1910401803)
- User interaction tracking
- Performance monitoring capabilities

## Security Considerations

- Content Security Policy (CSP) headers
- HTTPS enforcement via Nginx
- Secure headers (X-Frame-Options, X-Content-Type-Options)
- No exposed API keys or sensitive data
- Environment variables for configuration

## Future Enhancements

1. **Testing Infrastructure**
   - Unit tests with Vitest
   - Component testing with React Testing Library
   - E2E tests with Playwright

2. **Performance Improvements**
   - Image optimization pipeline
   - WebP format support
   - Critical CSS extraction

3. **Features**
   - Music player enhancements
   - Photo gallery expansion
   - Blog or news section
   - Event calendar integration

## Maintenance Notes

- Regularly update dependencies for security
- Monitor Nginx logs for errors
- Keep SSL certificates up to date (auto-renewal configured)
- Review and optimize bundle size periodically
- Test on various devices and browsers

## Contributing

When contributing to this project:
1. Run `npm run verify` before committing
2. Follow existing code patterns and conventions
3. Update translations in both locale files
4. Test on mobile and desktop devices
5. Ensure accessibility standards are maintained

---

**Project Status:** Production-ready, actively deployed at [viciososocultos.com](https://viciososocultos.com)