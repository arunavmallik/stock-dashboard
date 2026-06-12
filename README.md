# Stock Analysis Dashboard

AI-powered stock valuation dashboard using live Yahoo Finance data + Claude analysis.

## Deploy to Vercel in 3 steps

### 1. Push to GitHub
```bash
cd stock-dashboard
git init
git add .
git commit -m "initial commit"
gh repo create stock-dashboard --public --push
# or push to an existing repo manually
```

### 2. Deploy on Vercel
1. Go to https://vercel.com → "Add New Project"
2. Import your GitHub repo
3. Click **Deploy** (no build config needed — Vercel auto-detects Next.js)

### 3. Add your API key
1. In Vercel dashboard → your project → **Settings → Environment Variables**
2. Add: `ANTHROPIC_API_KEY` = your key from https://console.anthropic.com
3. Click **Save** then **Redeploy** (top-right → Deployments → … → Redeploy)

That's it. Your dashboard is live at `https://your-project.vercel.app`

---

## Run locally

```bash
cp .env.example .env.local
# edit .env.local and add your ANTHROPIC_API_KEY

npm install
npm run dev
# open http://localhost:3000
```

## How it works

- **Frontend** (`app/page.js`): React UI that fetches live price + fundamentals from Yahoo Finance
- **API route** (`app/api/analyze/route.js`): Serverless function that calls Claude with the market data — your API key never leaves the server
- **Hosting**: Vercel's edge network serves it globally, works on any device

## Notes
- Works best with US-listed tickers (AAPL, NVDA, TSLA, etc.)
- International tickers need exchange suffix: HSBA.L, 7203.T, etc.
- Analyze 3–5 tickers at a time for best performance
