# Investigation Platform

A comprehensive, scalable, and maintainable investigation platform built with React, TypeScript, and modern web technologies. This platform provides 6 specialized investigation service modules for digital forensics and intelligence gathering.

## 🚀 Features

### Investigation Services
- **📰 News Analysis:** Monitors news articles and extracts key entities such as names of people, locations, organizations, and vehicle numbers.
- **🖼️ Reverse Image Search:** Accepts an image to perform a comprehensive reverse search across engines like Google, Yandex, and Bing to find its online presence.
- **📱 Social Media Scraping:** Scrapes public data from platforms like Facebook, Instagram, X, and LinkedIn based on identifiers like a phone number, email, or username.
- **🏛️ Government Site Scraping:** Retrieves official records from public Indian government portals like VAHAN (for vehicle details) and e-Courts (for case records).
- **📧 Email Analysis:** Analyzes an email address to check for exposure in data breaches, verify domain records, and discover associated social media or Gravatar profiles.
- **🕸️ Dark Web Monitoring:** Performs targeted scraping of known dark web forums and marketplaces for specific keywords, email addresses, or phone numbers.


### Technical Features
- **🔒 Authentication & Authorization** - Protected routes and user management
- **🏪 State Management** - Zustand for lightweight, type-safe state management across all services
- **🎨 Modern UI** - Tailwind CSS with custom component library
- **🛡️ Type Safety** - Full TypeScript integration with Zod validation
- **🧪 Testing** - Comprehensive testing with Vitest and Playwright
- **📱 Responsive Design** - Mobile-first design approach

## 🛠️ Tech Stack

### Core Technologies
- **React 19** - Modern React with latest features
- **TypeScript** - Full type safety and developer experience
- **Vite** - Fast build tool and development server
- **TanStack Router** - Type-safe routing with file-based structure

### State Management & Data
- **Zustand** - Lightweight state management for all investigation services
- **TanStack Query** - Legacy caching (being phased out)
- **Axios** - HTTP client with interceptors and error handling
- **Zod** - Runtime type validation and schema definition

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library

### Testing & Quality
- **Vitest** - Fast unit and integration testing
- **Playwright** - End-to-end testing
- **ESLint** - Code linting and formatting
- **Husky** - Git hooks for code quality

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment setup**
   ```bash
   cp .env.local .env.development
   # Edit .env.development with your configuration
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to `http://localhost:5173`

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run preview         # Preview production build

# Testing
npm test                # Run unit tests
npm run test:ui         # Run tests with UI
npm run test:coverage   # Run tests with coverage
npm run test:e2e        # Run end-to-end tests

# Code Quality
npm run lint            # Lint code
npm run lint:fix        # Fix linting issues
npm run type-check      # Type checking
npm run format          # Format code

# Routes
npm run routes:generate # Generate route tree
npm run routes:watch    # Watch for route changes
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   └── ui/             # Base UI component library
├── config/             # Application configuration
├── contexts/           # React contexts
├── hooks/              # Custom React hooks (6 services)
├── lib/                # Utility libraries
├── routes/             # File-based routing
│   └── _authenticated/ # Protected routes
│       └── services/   # Investigation service pages
├── services/           # API service layers
└── test/               # Test configuration
```

## 🧪 Testing

```bash
npm test                 # Unit tests
npm run test:e2e         # End-to-end tests
npm run test:coverage    # Coverage report
```

## 🚀 Deployment

```bash
npm run build           # Production build
npm run preview         # Test build locally
```

## 📚 Services Overview

Each investigation service provides specialized capabilities:

- **News Analysis**: Article sentiment, entity extraction, credibility scoring
- **Image Search**: Reverse image search across multiple engines
- **Social Media**: Profile analysis, content monitoring, trend detection
- **Government Records**: Public records, court documents, vehicle records
- **Email Analysis**: Header analysis, breach checking, domain validation
- **Dark Web Monitoring**: Threat detection, credential monitoring, keyword tracking

---

