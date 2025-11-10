# GitHub Pages Deployment Guide

## Prerequisites

✅ Your website is now ready to deploy to GitHub Pages with the Vue.js rebuild!

## Automatic Deployment (Recommended)

### Initial Setup

1. **Enable GitHub Pages in your repository settings:**
   - Go to repository **Settings** → **Pages**
   - Under "Source", select **GitHub Actions**

2. **Update the base path** in `vite.config.ts` if needed:
   ```typescript
   base: '/website/', // Change to your repo name
   ```
   - If your repo is `username.github.io`, use `base: '/'`
   - If your repo is `website`, use `base: '/website/'`

3. **Push your changes:**
   ```bash
   git add .
   git commit -m "Configure GitHub Pages deployment"
   git push origin master
   ```

4. **Automatic deployment starts!**
   - GitHub Actions will automatically build and deploy
   - Check the **Actions** tab to see progress
   - Site will be live at: `https://username.github.io/website/`

### Workflow Details

The deployment workflow (`.github/workflows/deploy.yml`) will:
1. ✅ Checkout code
2. ✅ Install dependencies
3. ✅ Build production bundle
4. ✅ Deploy to GitHub Pages

## Manual Deployment (Alternative)

If you prefer manual deployment:

### Build Locally

```bash
# Build for production
npm run build

# Preview the build
npm run preview
```

### Deploy dist folder

```bash
# Install gh-pages
npm install -D gh-pages

# Add to package.json scripts:
"deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

## Configuration Files

### `vite.config.ts`
- ✅ Base path configured
- ✅ Build optimizations enabled
- ✅ Code splitting configured
- ✅ Source maps disabled for production

### `.github/workflows/deploy.yml`
- ✅ Automatic deployment on push to master
- ✅ Proper permissions configured
- ✅ Build caching enabled

### `public/_headers`
- ✅ Security headers configured
- ⚠️ Note: GitHub Pages has limited header support

## Important Configuration

### Base URL

The `base` in `vite.config.ts` **must match your repository name**:

```typescript
// For username.github.io (user/org site):
base: '/'

// For project repositories:
base: '/repository-name/'
```

**Current setting:** `base: '/website/'`

### CNAME for Custom Domain

If using a custom domain (like jellemax.be):

1. Create `public/CNAME` file:
   ```
   jellemax.be
   ```

2. Update `vite.config.ts`:
   ```typescript
   base: '/'
   ```

3. Configure DNS:
   - A records pointing to GitHub Pages IPs
   - Or CNAME record pointing to `username.github.io`

## Deployment Checklist

Before deploying:

- [ ] Update `base` in `vite.config.ts` to match repository name
- [ ] Run `npm run build` locally to test
- [ ] Check `npm audit` shows 0 vulnerabilities
- [ ] Update content in `public/data.json`
- [ ] Test on multiple devices
- [ ] Commit and push changes

## Troubleshooting

### 404 on Refresh

**Problem:** Page refreshes give 404 errors

**Solution:** GitHub Pages doesn't support client-side routing by default. The router is configured with `createWebHistory` which works, but direct URL access may fail.

**Fix:** Add `404.html` that redirects:
```bash
cp dist/index.html dist/404.html
```

### Assets Not Loading

**Problem:** CSS/JS files return 404

**Solution:** Check the `base` path in `vite.config.ts` matches your repo name exactly.

### Deployment Not Triggering

**Problem:** Push doesn't trigger deployment

**Solution:**
1. Check `.github/workflows/deploy.yml` exists
2. Verify GitHub Actions is enabled in Settings → Actions
3. Check branch name matches (currently set to `master`)

## Monitoring

### Check Deployment Status

```bash
# View recent deployments
# Go to: https://github.com/username/repository/deployments
```

### Build Logs

- Go to repository → **Actions** tab
- Click on latest workflow run
- View build and deployment logs

## Performance

After deployment, test performance:

- **Lighthouse:** Run audit in Chrome DevTools
- **PageSpeed Insights:** https://pagespeed.web.dev/
- **Web.dev Measure:** https://web.dev/measure/

Expected scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 100
- SEO: 90+

## Rollback

To rollback to previous version:

```bash
# View deployments
gh api repos/username/repository/deployments

# Revert commit
git revert HEAD
git push

# Or redeploy specific commit
git checkout <commit-hash>
npm run build
# Deploy manually
```

## Support

For deployment issues:
1. Check GitHub Pages status: https://www.githubstatus.com/
2. Review GitHub Actions logs
3. Verify repository settings

---

**Happy deploying! 🚀**
