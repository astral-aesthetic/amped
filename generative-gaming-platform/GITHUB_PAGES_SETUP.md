# GitHub Pages Deployment Guide for Amped

This guide explains how to deploy the Amped gaming platform to GitHub Pages.

## Prerequisites

- Repository pushed to GitHub
- GitHub Pages enabled in repository settings
- Main branch is the default branch

## Automatic Deployment (Recommended)

The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically builds and deploys the app whenever you push to the `main` branch.

### Step 1: Enable GitHub Pages

1. Go to your GitHub repository
2. Navigate to **Settings** → **Pages**
3. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
   - This allows the workflow to deploy automatically

### Step 2: Configure Repository Settings

1. Go to **Settings** → **Pages**
2. Verify the build source is set to use GitHub Actions
3. No need to set a specific branch - the workflow handles it

### Step 3: Deploy

Simply push your changes to the `main` branch:

```bash
git add .
git commit -m "Update Amped app"
git push origin main
```

The GitHub Actions workflow will:
- ✅ Install dependencies
- ✅ Build the app (`npm run build`)
- ✅ Upload the `dist/` folder as artifact
- ✅ Deploy to GitHub Pages
- ✅ Provide a deployment URL

### Step 4: Access Your Site

After deployment completes, your site will be available at:

```
https://astral-aesthetic.github.io/amped/
```

(Replace `astral-aesthetic` with your GitHub username)

## Manual Deployment (Alternative)

If you prefer to manage deployments manually:

### 1. Build locally

```bash
npm run build
```

This creates a `dist/` folder with the compiled app.

### 2. Push dist to gh-pages branch

```bash
# Build the app
npm run build

# Push dist folder to gh-pages branch
git subtree push --prefix dist origin gh-pages
```

### 3. Configure GitHub Pages

1. Go to repository **Settings** → **Pages**
2. Under "Build and deployment":
   - **Source**: Select "Deploy from a branch"
   - **Branch**: Select `gh-pages` and `/root` folder
3. Click Save

## File Structure

The deployment setup includes:

```
.github/
└── workflows/
    └── deploy.yml          # GitHub Actions workflow for auto-deployment

vite.config.ts             # Updated with base: '/amped/' for GitHub Pages
package.json               # Contains build scripts
```

## Configuration Details

### Vite Base Path

The `vite.config.ts` includes:

```typescript
export default defineConfig({
  base: '/amped/',  // GitHub Pages subdirectory
  // ... other config
})
```

This ensures all assets are loaded from the correct path on GitHub Pages.

### GitHub Actions Workflow

The workflow (`.github/workflows/deploy.yml`):
- Triggers on push to `main` branch
- Uses Node.js 18
- Installs dependencies with npm cache
- Builds the app
- Deploys to GitHub Pages automatically

## Troubleshooting

### Site shows 404 errors on assets

- Verify `base: '/amped/'` is set in `vite.config.ts`
- Check that the workflow ran successfully in Actions tab
- Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)

### Deployment workflow failing

1. Check GitHub Actions tab for error messages
2. Verify Node.js version is compatible (18+ recommended)
3. Ensure `npm install` succeeds locally
4. Try running `npm run build` locally to reproduce issues

### Site not updating

- Verify you pushed to the `main` branch
- Check GitHub Actions tab to confirm workflow ran
- Wait a few minutes for deployment to complete
- Hard refresh browser (Ctrl+F5 or Cmd+Shift+R)

## Environment Variables

If your app needs environment variables:

1. Create a `.env.production` file for production-only variables
2. Add to `.gitignore` if it contains secrets
3. Use GitHub Actions secrets for sensitive values:
   - Settings → Secrets and variables → Actions
   - Add secret in workflow with `${{ secrets.SECRET_NAME }}`

## Next Steps

1. ✅ Commit and push changes to GitHub
2. ✅ Watch GitHub Actions tab for deployment
3. ✅ Visit https://astral-aesthetic.github.io/amped/
4. ✅ Share your site!

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#github-pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
