# Fix: "No API fetching" on deployed frontend

The frontend calls your **backend URL** to load data. If no API works on the live site, the URL is wrong or the backend is unreachable.

---

## 1. Set the backend URL (choose one)

### Option A: Edit `config.json` (no rebuild needed)

After deploy, the site reads **`/config.json`** at load time.

- **Portfolio:** edit `PORTFOLIO/public/config.json`
- **Dashboard:** edit `DASHBOARD/dashboard/public/config.json`

Set your real backend URL:

```json
{
  "apiUrl": "https://YOUR_BACKEND_URL"
}
```

Examples:

- Backend on Render: `https://your-app-name.onrender.com`
- Backend at api.sivram.in: `https://api.sivram.in`

Commit, push, and redeploy. No need to change Netlify env.

### Option B: Netlify environment variable (build-time)

In Netlify → **Site configuration** → **Environment variables**, add:

- **Key:** `VITE_API_URL`
- **Value:** `https://YOUR_BACKEND_URL` (same examples as above)

Add this for **both** the Portfolio and Dashboard sites, then **trigger a new deploy** on each.

---

## 2. Check that the backend is reachable

Open in the browser:

```
https://YOUR_BACKEND_URL/api/v1/health
```

You should see: `{"ok":true,"message":"API is running"}`.

If you get an error or nothing loads:

- Backend is not deployed or not running, or
- The URL is wrong (typo, wrong subdomain, etc.)

---

## 3. Backend CORS

The backend must allow your frontend origins. In the backend `.env` you should have:

- `PORTFOLIO_URL=https://sivram.in`
- `DASHBOARD_URL=https://dashboard.sivram.in`

The app also allows `https://www.sivram.in` and localhost for dev.

---

## Summary

1. Put your real backend URL in **`config.json`** (Portfolio and Dashboard) **or** in Netlify as **`VITE_API_URL`** and redeploy.
2. Confirm **`https://YOUR_BACKEND_URL/api/v1/health`** returns `{"ok":true,...}`.
3. Ensure backend CORS includes your live domains.

After that, the deployed frontend should fetch from the API correctly.
