# Backend deployment (why "no data" / API not working)

## 1. Backend must be deployed and reachable

The frontend (sivram.in and dashboard.sivram.in) calls **`https://api.sivram.in`** in production.

- **If you use `api.sivram.in`:** Deploy the backend (e.g. Render, Railway), then point **api.sivram.in** to that service (CNAME to your Render/Railway URL). In the backend’s env set:
  - `NODE_ENV=production`
  - `COOKIE_DOMAIN=.sivram.in`
- **If you use a different URL (e.g. Render):** Your backend URL might be `https://your-app.onrender.com`. Then the frontend must use that URL:
  - In **Netlify** → each site (Portfolio + Dashboard) → **Site configuration** → **Environment variables** add:
    - `VITE_API_URL` = `https://your-app.onrender.com` (your real backend URL)
  - Redeploy the Portfolio and Dashboard sites so they use this API URL.

## 2. Backend env (production)

- `NODE_ENV=production` **or** `CROSS_ORIGIN_COOKIE=true` (required for dashboard login when frontend is on a different domain, e.g. dashboard.sivram.in → Render)
- `PORT` = e.g. 4000 (or the port your host uses)
- `MONGO_URI`, `JWT_SECRET_KEY`, Cloudinary, SMTP, etc.
- `PORTFOLIO_URL=https://sivram.in`
- `DASHBOARD_URL=https://dashboard.sivram.in`
- If backend is at **api.sivram.in**: `COOKIE_DOMAIN=.sivram.in` (leave unset when backend is on Render)

## 3. CORS and cookies

CORS is set to allow sivram.in, www.sivram.in, dashboard.sivram.in (and localhost for dev). Login cookie uses `COOKIE_DOMAIN` when set so auth works across subdomains.
