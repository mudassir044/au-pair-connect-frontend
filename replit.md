# AuPairConnect Platform

## Overview

AuPairConnect is a full-stack web application that connects au pairs with host families worldwide. The platform provides a secure, user-friendly environment for cultural exchange matching, featuring real-time messaging, comprehensive profile management, and streamlined onboarding processes.

## System Architecture

The application follows a modern full-stack architecture with clear separation between client and server components:

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for development
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with HSL-based design system
- **State Management**: React Query for server state, React Context for auth
- **Routing**: React Router with protected routes
- **Animation**: Framer Motion for smooth transitions

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for REST API
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Development Mode**: Vite integration for hot reload

### Build Strategy
- **Development**: TSX for server execution with Vite middleware
- **Production**: ESBuild for server bundling, Vite for client build
- **Deployment**: Unified dist folder with static file serving

## Key Components

### Authentication System
- JWT-based authentication with localStorage persistence
- Role-based access control (au_pair, host_family, admin)
- Protected routes with automatic redirects
- Context-based auth state management

### User Onboarding
- Multi-step wizard with role-specific flows
- Cookie-based progress persistence
- Comprehensive profile building (personal info, preferences, requirements)
- Form validation with Zod schemas

### Messaging System
- Real-time messaging interface
- Conversation management with unread counts
- User presence indicators
- File attachment support (planned)

### UI/UX Design
- Professional blue and warm teal color scheme
- Responsive design with mobile-first approach
- Accessible components using Radix UI
- Consistent design tokens and CSS variables

## Data Flow

### Client-Server Communication
1. Client makes API requests through axios instance
2. Request interceptor adds JWT authentication headers
3. Server processes requests with role-based middleware
4. Response interceptor handles global error states
5. React Query manages caching and synchronization

### State Management Flow
1. Authentication state managed via React Context
2. Server state cached with React Query
3. Form state handled by React Hook Form
4. UI state maintained in component state

### Database Operations
1. Drizzle ORM provides type-safe database access
2. Schema definitions shared between client and server
3. Migrations managed through Drizzle Kit
4. Connection pooling handled by Neon serverless

## External Dependencies

### Core Technologies
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **drizzle-orm**: Type-safe ORM with PostgreSQL dialect
- **@tanstack/react-query**: Server state management
- **@radix-ui/**: Accessible UI component primitives
- **framer-motion**: Animation library
- **zod**: Schema validation
- **react-hook-form**: Form management

### Development Tools
- **vite**: Build tool and dev server
- **typescript**: Type safety
- **tailwindcss**: Utility-first CSS framework
- **eslint**: Code linting

### Authentication & Security
- **jsonwebtoken**: JWT token handling
- **bcrypt**: Password hashing
- **cors**: Cross-origin resource sharing

## Deployment Strategy

### Development Environment
- Vite dev server for client with HMR
- TSX execution for server with auto-restart
- Database migrations via Drizzle Kit
- Environment variables for configuration

### Production Build
- Client built to `dist/public` with Vite
- Server bundled to `dist/index.js` with ESBuild
- Static file serving integrated into Express
- Database schema pushed to production

### Environment Configuration
- `DATABASE_URL` for PostgreSQL connection
- `NODE_ENV` for environment detection
- JWT secrets and other sensitive data

## Changelog

- July 02, 2025. Initial setup
- July 02, 2025. Migrated from Lovable to Replit environment
- July 02, 2025. Fixed dark/light mode visibility issue in CTA section
- July 02, 2025. Created Netlify deployment configuration files

## User Preferences

Preferred communication style: Simple, everyday language.