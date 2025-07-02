# Au Pair Connect

A modern platform connecting au pairs with host families worldwide.

## Features

- 🏠 **Host Family Dashboard** - Manage your family profile and find the perfect au pair
- 👤 **Au Pair Dashboard** - Create your profile and connect with host families
- 💬 **Real-time Messaging** - Secure communication between families and au pairs
- 📝 **Smart Matching** - Advanced algorithm to find compatible matches
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🔐 **Secure Authentication** - JWT-based auth with role-based access

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI**: Tailwind CSS, Radix UI, Framer Motion
- **State Management**: React Query, Context API
- **Forms**: React Hook Form with Zod validation
- **Routing**: React Router DOM
- **Notifications**: React Hot Toast

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <your-repo-url>
cd au-pair-connect
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

The app will be available at `http://localhost:8080`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── dashboard/      # Dashboard layouts
│   ├── layout/         # App layout components
│   ├── messaging/      # Chat and messaging
│   ├── onboarding/     # User onboarding flow
│   └── ui/             # Base UI components
├── contexts/           # React contexts
├── hooks/              # Custom React hooks
├── lib/                # Utilities and API
├── pages/              # Page components
└── styles/             # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Deployment

The application is configured for easy deployment on platforms like Vercel, Netlify, or any static hosting service.

1. Build the project:

```bash
npm run build
```

2. Deploy the `dist` folder to your hosting platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is private and proprietary.
