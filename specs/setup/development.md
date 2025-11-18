# Development Setup Guide - SaintGrove

## Prerequisites

- **Node.js**: v20.x o superior
- **npm**: v10.x o superior
- **Git**: Latest version
- **VS Code**: Recomendado (con extensiones)

## Initial Setup

### 1. Clone Repository
```bash
git clone <repository-url>
cd SaintGrove-net
```

### 2. Install Dependencies
```bash
# Frontend
cd frontend
npm install

# CMS (cuando esté configurado)
cd ../cms
npm install
```

### 3. Environment Variables

Crear archivo `.env.local` en `frontend/`:
```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_TOKEN=your-token-here

# Contact Form
NEXT_PUBLIC_CONTACT_EMAIL=contact@saintgrove.net

# Analytics (opcional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Development
NODE_ENV=development
```

## Project Structure

```
SaintGrove-net/
├── frontend/                 # Next.js Application
│   ├── app/                 # App Router (Next.js 13+)
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Homepage
│   │   └── globals.css      # Global styles
│   ├── components/          # React Components
│   │   ├── ui/             # UI Components (Button, Card, etc.)
│   │   ├── layout/         # Layout Components (Header, Footer)
│   │   ├── sections/       # Page Sections
│   │   └── features/       # Feature-specific components
│   ├── lib/                # Utilities & helpers
│   ├── types/              # TypeScript types
│   ├── public/             # Static assets
│   ├── __tests__/          # Tests
│   │   ├── components/     # Component tests
│   │   ├── e2e/           # E2E tests
│   │   └── utils/         # Test utilities
│   └── specs/             # Documentation
├── cms/                    # Strapi CMS (futuro)
└── specs/                 # Project documentation
```

## Available Scripts

### Development
```bash
# Start dev server (http://localhost:3000)
npm run dev

# Build production
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

### Testing
```bash
# Unit tests
npm run test              # Watch mode
npm run test:ui          # UI mode
npm run test:coverage    # With coverage

# E2E tests
npm run test:e2e         # Run E2E
npm run test:e2e:ui      # UI mode
npm run test:e2e:debug   # Debug mode

# All tests
npm run test:all
```

## Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **React**: 19.x
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS 3.x
- **Animations**: Framer Motion 12.x
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **SEO**: next-seo

### Testing
- **Unit/Integration**: Vitest + React Testing Library
- **E2E**: Playwright
- **Coverage**: Vitest Coverage (v8)

### Development Tools
- **Linter**: ESLint
- **TypeScript**: Strict mode enabled

## Configuration Files

### TypeScript (`tsconfig.json`)
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "jsx": "preserve",
    "strict": true,
    "moduleResolution": "bundler",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Tailwind (`tailwind.config.ts`)
Custom theme con colores de SaintGrove:
- Primary Green: `#00FF87`
- Blue Light: `#00D4FF`
- Gradientes personalizados

### Next.js (`next.config.js`)
Configuración optimizada para producción.

## VS Code Setup

### Recommended Extensions
```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-playwright.playwright",
    "vitest.explorer"
  ]
}
```

### Settings (`.vscode/settings.json`)
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

## Development Workflow

### 1. Feature Development
```bash
# Create feature branch
git checkout -b feature/feature-name

# Make changes
# Write tests
npm run test

# Lint code
npm run lint

# Commit changes
git add .
git commit -m "feat: add feature description"
```

### 2. Testing Workflow
```bash
# During development
npm run test:watch

# Before committing
npm run test:coverage
npm run lint

# E2E tests
npm run test:e2e
```

### 3. Pull Request
```bash
# Push to remote
git push origin feature/feature-name

# Create PR on GitHub
# Ensure CI/CD passes
```

## Code Style Guidelines

### TypeScript
- Use **strict mode**
- Prefer `interface` over `type` for object shapes
- Use explicit types for function returns
- Avoid `any` - use `unknown` if needed

### React Components
```typescript
// ✅ Good - Functional component with TypeScript
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  onClick,
  children,
}) => {
  return (
    <button onClick={onClick} className={variant}>
      {children}
    </button>
  );
};
```

### File Naming
- Components: `PascalCase.tsx` (e.g., `Button.tsx`)
- Utilities: `camelCase.ts` (e.g., `formatDate.ts`)
- Tests: `ComponentName.test.tsx`
- E2E: `feature-name.spec.ts`

### Import Organization
```typescript
// 1. React & Next.js
import React from 'react';
import { useRouter } from 'next/navigation';

// 2. Third-party libraries
import { motion } from 'framer-motion';

// 3. Local components
import { Button } from '@/components/ui/Button';

// 4. Utilities & types
import { formatDate } from '@/lib/utils';
import type { ServiceType } from '@/types';

// 5. Styles
import styles from './Component.module.css';
```

## Common Tasks

### Adding a New Component
```bash
# 1. Create component file
touch components/ui/NewComponent.tsx

# 2. Create test file
touch __tests__/components/ui/NewComponent.test.tsx

# 3. Implement component with TypeScript
# 4. Write tests
# 5. Export from index (if needed)
```

### Adding a New Page
```bash
# 1. Create page in app directory
touch app/new-page/page.tsx

# 2. Add metadata & SEO
# 3. Create E2E test
touch __tests__/e2e/new-page.spec.ts
```

### Updating Styles
```bash
# Global styles
app/globals.css

# Tailwind config
tailwind.config.ts

# Component styles (inline)
className="bg-saint-green text-white"
```

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

### TypeScript Errors
```bash
# Clear TypeScript cache
rm -rf .next
rm -rf node_modules/.cache

# Restart TS server in VS Code
Cmd/Ctrl + Shift + P -> "TypeScript: Restart TS Server"
```

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Tests Failing
```bash
# Clear test cache
npm run test -- --clearCache

# Check test setup
cat vitest.setup.ts
```

### Build Errors
```bash
# Clean build
rm -rf .next
npm run build

# Check for TypeScript errors
npx tsc --noEmit
```

## Performance Optimization

### Image Optimization
- Use Next.js `<Image>` component
- Provide `width` and `height`
- Use `priority` for above-fold images

### Code Splitting
- Dynamic imports for heavy components
- Route-based splitting (automatic with App Router)

### Bundle Analysis
```bash
# Analyze bundle size
npm run build
# Check .next/analyze/
```

## Git Workflow

### Commit Messages
Follow Conventional Commits:
```
feat: add new feature
fix: fix bug
docs: update documentation
style: format code
refactor: refactor code
test: add tests
chore: update dependencies
```

### Branch Naming
```
feature/feature-name
bugfix/bug-description
hotfix/critical-fix
docs/documentation-update
```

## Next Steps

1. **Complete Testing Setup**: Ver `specs/setup/testing.md`
2. **Setup CI/CD**: GitHub Actions configuration
3. **Configure CMS**: Strapi backend setup
4. **Deploy**: Vercel/Railway deployment
5. **Monitoring**: Add error tracking (Sentry)

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React 19 Docs](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Testing Library](https://testing-library.com/)

## Team Contacts

- **Project Lead**: [TBD]
- **Development**: [TBD]
- **Design**: [TBD]
