# Amped - AI-Powered Gaming Platform

A modern gaming platform built with React, TypeScript, and Vite. Create, discover, and share games powered by AI.

## Features

- 🎮 **AI Game Generator** - Create games from text prompts
- 🔍 **Game Discovery** - Browse and explore community games
- 👥 **Community** - Connect with other creators
- 🏆 **Leaderboards** - Compete and track achievements
- 💰 **Credit System** - Earn and spend credits on platform
- 📱 **Responsive Design** - Works on desktop and mobile
- ⚡ **Fast Performance** - Built with Vite for instant HMR

## Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at http://localhost:5173/

### Build for Production

```bash
npm run build
```

This creates an optimized `dist/` folder ready for deployment.

### Preview Production Build

```bash
npm run preview
```

## Deployment

### GitHub Pages

This project is configured for automatic deployment to GitHub Pages via GitHub Actions.

**Setup Instructions:**

1. Go to repository **Settings** → **Pages**
2. Set source to **GitHub Actions**
3. Push to `main` branch
4. The workflow automatically builds and deploys

Your site will be available at: `https://astral-aesthetic.github.io/amped/`

📖 **For detailed setup:** See [GITHUB_PAGES_SETUP.md](./GITHUB_PAGES_SETUP.md)

### Alternative Deployment Options

- **Vercel** - `vercel deploy`
- **Netlify** - Connect repo and auto-deploy
- **Self-hosted** - Upload `dist/` folder to any static host

## Project Structure

```
generative-gaming-platform/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── layout/         # Layout components (Header, Sidebar, Footer)
│   │   ├── ui/             # UI components
│   │   └── ...
│   ├── pages/              # Page components
│   ├── contexts/           # React contexts (auth, credits, etc)
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── App.tsx             # Main app component
│   └── main.tsx            # React entry point
├── public/                 # Static assets
├── index.html              # HTML entry point
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies & scripts
```

## Available Scripts

- `npm run dev` - Start development server (HMR enabled)
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Technologies

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Lucide Icons** - Beautiful icons

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
