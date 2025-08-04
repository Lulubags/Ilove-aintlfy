# iLove AI - Business AI Solutions Platform

## Overview

This is a modern full-stack web application for iLove AI, a South African AI solutions company. The platform serves as both a marketing website and an interactive consultation tool, featuring an AI-powered chatbot that helps potential clients understand how AI can transform their business operations.

## Recent Changes (2025-01-31)

✓ **Vercel Deployment Complete** - Successfully migrated from Replit to Vercel for SSL support
✓ **Custom Domain SSL** - www.ilove-ai.co.za now has automatic SSL certificate  
✓ **Database Integration** - PostgreSQL database added for contact forms and chat sessions
✓ **Custom Favicon** - Professional AI logo with black/white theme
✓ **SEO Optimization** - Added meta tags, Open Graph, and proper page titles
✓ **Production Ready** - Full deployment pipeline via GitHub → Vercel
✓ **Fixed Vercel 404 Errors** - Updated configuration for proper React SPA deployment
✓ **Serverless Functions** - API endpoints optimized for Vercel deployment
✓ **Fixed Production Build** - Proper dist/ folder structure for deployment platforms
✓ **Netlify Configuration** - Working serverless functions and SPA routing
✓ **Database Integration Complete** - PostgreSQL chat sessions and contact storage
✓ **AI Chatbot with Memory** - Conversations persist across sessions
✓ **Contact Form Database** - All inquiries saved for business follow-up

## User Preferences

Preferred communication style: Simple, everyday language.
Color scheme preference: Black and white (updated from blue/yellow on 2025-01-30).

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Build Tool**: Vite for fast development and optimized builds
- **UI Components**: Radix UI primitives with custom styling

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with JSON responses
- **Request Handling**: Express middleware for parsing and logging
- **Error Handling**: Centralized error handling middleware

### Data Storage Solutions
- **Database**: PostgreSQL (configured for Neon Database)
- **ORM**: Drizzle ORM with type-safe queries
- **Schema Management**: Drizzle Kit for migrations
- **Fallback Storage**: In-memory storage implementation for development
- **Session Management**: PostgreSQL-based session storage

## Key Components

### Contact Management System
- **Contact Form**: React Hook Form with Zod validation
- **Email Integration**: Nodemailer for automated email notifications
- **Data Persistence**: Contact submissions stored in PostgreSQL
- **Validation**: Shared schema validation between client and server

### AI Chatbot System
- **OpenAI Integration**: GPT-4o model for intelligent responses
- **Session Management**: Persistent conversation history
- **UI Components**: Custom chat interface with message history
- **Context Awareness**: Business-specific prompts and responses

### UI Component Library
- **Design System**: shadcn/ui with consistent styling
- **Accessibility**: Radix UI primitives ensure WCAG compliance
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Interactive Elements**: Modals, dropdowns, forms, and navigation

## Data Flow

### Contact Form Submission
1. User fills out contact form with validation
2. Form data validated using Zod schema
3. Data sent to `/api/contact` endpoint
4. Server stores contact in database
5. Automated emails sent to both business and customer
6. Success/error feedback displayed to user

### AI Chat Interaction
1. User sends message through chat interface
2. Message sent to `/api/chat` with optional session ID
3. Server retrieves conversation history if session exists
4. OpenAI API generates contextual business response
5. Response and updated conversation stored in database
6. Real-time UI update with assistant's message

### Component Architecture
- Shared schemas between client and server ensure type safety
- React Query handles caching and synchronization
- Optimistic updates provide smooth user experience

## External Dependencies

### Core Infrastructure
- **Neon Database**: Serverless PostgreSQL hosting
- **OpenAI API**: GPT-4o for AI chat responses
- **SMTP Service**: Email delivery (configurable provider)

### Development Tools
- **Replit Integration**: Runtime error overlay and cartographer
- **TypeScript**: Full type safety across the stack
- **ESLint/Prettier**: Code quality and formatting

### Third-Party Libraries
- **Authentication**: Ready for session-based auth
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React for consistent iconography
- **Date Handling**: date-fns for date manipulation

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds React app to `dist/public`
- **Backend**: esbuild bundles Express server to `dist/index.js`
- **Assets**: Static files served from build directory

### Environment Configuration
- **Development**: tsx for TypeScript execution with hot reload
- **Production**: Compiled JavaScript with NODE_ENV=production
- **Database**: Environment variable for DATABASE_URL
- **API Keys**: Secure environment variable management

### Scaling Considerations
- **Database**: Drizzle ORM supports connection pooling
- **Session Storage**: PostgreSQL-based for horizontal scaling
- **Static Assets**: Ready for CDN deployment
- **API Caching**: TanStack Query provides client-side caching

The application follows modern full-stack patterns with strong type safety, responsive design, and production-ready architecture. The codebase is structured for maintainability and easy extension of features.