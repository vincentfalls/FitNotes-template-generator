# 🚀 Deploying FitNotes Template Generator to Vercel

The web application is 100% static and client-side (running SQLite in WebAssembly via `sql.js`). It requires zero server-side state, zero database provisioning, and deploys to **Vercel** in seconds for free.

---

## Method 1: Deploy via GitHub (Recommended)

1. **Push your repository to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/fitnotes-template-generator.git
   git branch -M main
   git push -u origin main
   ```

2. **Import into Vercel**:
   - Go to [https://vercel.com/new](https://vercel.com/new).
   - Select your `fitnotes-template-generator` GitHub repository.
   - Vercel will automatically detect `vercel.json` and set the **Output Directory** to `src/web`.
   - Click **Deploy**.

3. **Live!**
   - Your web app is now live at `https://fitnotes-template-generator.vercel.app` (or your custom domain).
   - Every `git push` to `main` will automatically build and deploy preview and production updates.

---

## Method 2: Deploy via Vercel CLI

If you have Node.js and the Vercel CLI installed:

```bash
# Install Vercel CLI globally (if not already installed)
npm i -g vercel

# Deploy directly from the project directory
vercel

# Deploy to production
vercel --prod
```

---

## Configuration Reference (`vercel.json`)

The project includes pre-configured settings in `vercel.json`:

```json
{
  "version": 2,
  "outputDirectory": "src/web",
  "cleanUrls": true,
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
```
