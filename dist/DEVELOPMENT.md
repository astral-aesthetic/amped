# Amped - Gaming at Lightspeed

An AI-powered game creation platform built with Three.js and hosted on GitHub Pages.

## 🚀 Quick Start

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Opens local server at `http://localhost:3000` with live reloading.

### Build
```bash
npm run build
```
Creates a production build in the `dist/` folder.

### Deploy
```bash
npm run deploy
```
Automatically builds and pushes to GitHub Pages.

## 📋 Available Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start local dev server with CORS enabled |
| `npm run build` | Build production-ready files to dist/ |
| `npm run preview` | Preview production build locally (port 43001) |
| `npm run watch` | Watch files and auto-rebuild on changes |
| `npm run deploy` | Build and push to GitHub Pages |

## 🔄 Automatic Deployment

GitHub Actions automatically:
- **Builds** on every push to `gh-pages` or `main`
- **Tests** the build (extensible)
- **Deploys** to GitHub Pages
- **Notifies** when deployment completes

### GitHub Actions Workflow
See `.github/workflows/deploy.yml` for configuration.

Status: Check the "Actions" tab in your GitHub repository.

## 📁 Project Structure

```
plex-/
├── index.html           # Main entry point (SPA)
├── waitlist.html        # Waitlist landing page
├── 404.html            # SPA routing fallback
├── package.json        # Dependencies and scripts
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Actions workflow
├── assets/             # Compiled JS/CSS bundles
├── models/             # 3D GLB models
├── data/               # JSON data files
├── images/             # Image assets
└── api/                # API endpoints
```

## 🎨 Features

- **3D Graphics** - Three.js rendering (chibi.glb, gunner_game_asset.glb)
- **Responsive Design** - Mobile, tablet, desktop
- **GitHub Pages Hosting** - Automatic deployment
- **SPA Routing** - Client-side navigation with 404 redirect
- **CORS Enabled** - Local dev server ready

## 🌐 Live Site

- **Production**: `https://astral-aesthetic.github.io/plex-/`
- **Waitlist**: `https://astral-aesthetic.github.io/plex-/waitlist.html`

## 🛠️ Development Workflow

1. **Make changes** to HTML, CSS, or JS files
2. **Auto-rebuild** (with `npm run watch`)
3. **Commit & push** to GitHub
4. **GitHub Actions** automatically deploys

## 📦 Dependencies

- **serve** - Local development server
- **chokidar-cli** - File watching for auto-rebuild

## 🔧 Troubleshooting

### Server not starting?
```bash
# Kill any existing process
killall serve

# Start fresh
npm run dev
```

### Models not loading?
- Check `.github/workflows/deploy.yml` - paths use `/plex-/models/`
- Verify models exist in `./models/` directory

### Build failing?
```bash
# Clean rebuild
npm run build:clean && npm run build:copy
```

## 📝 Notes

- The `dist/` folder is auto-generated and should not be committed
- GitHub Pages serves from the `gh-pages` branch
- CORS is enabled in dev for local testing
- Models use absolute paths for GitHub Pages deployment

## 🚀 Ready to Deploy?

Push to `gh-pages` branch:
```bash
git add .
git commit -m "Your changes"
git push origin gh-pages
```

GitHub Actions will automatically build and deploy! ✨
