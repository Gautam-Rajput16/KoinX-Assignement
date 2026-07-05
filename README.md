# KoinX — Tax Loss Harvesting Tool

A production-quality React dashboard for crypto **Tax Loss Harvesting**, built with Vite, TypeScript, and Tailwind CSS. This tool helps users identify loss-making crypto assets that can be sold to offset capital gains and reduce tax liability.

![Tax Harvesting Dashboard](https://img.shields.io/badge/React-18-61DAFB?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss) ![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone <repo-url>
cd Koinx

# Install dependencies
npm install

# Start dev server
npm run dev

# Production build
npm run build
```

The app runs at `http://localhost:5173` by default.

---

## 📁 Project Structure

```
src/
├── api/
│   ├── holdingsApi.ts          # Mock holdings API (12 coins, ~700ms delay)
│   └── capitalGainsApi.ts      # Mock capital gains API (~600ms delay)
├── types/
│   └── index.ts                # TypeScript interfaces (Holding, CapitalGains, etc.)
├── context/
│   └── TaxHarvestingContext.tsx # Global state: holdings, gains, selections
├── hooks/
│   └── useCapitalGainsCalculations.ts  # Pure calculation + formatting functions
├── components/
│   ├── Header/
│   │   └── Header.tsx          # KoinX branding header
│   ├── Disclaimers/
│   │   └── Disclaimers.tsx     # Collapsible accordion with tax notes
│   ├── CapitalGainsCard/
│   │   ├── CapitalGainsCard.tsx   # Shared card (dark/blue variant)
│   │   ├── PreHarvestingCard.tsx   # Dark card wrapper
│   │   └── AfterHarvestingCard.tsx # Blue card wrapper + savings banner
│   ├── HoldingsTable/
│   │   ├── HoldingsTable.tsx   # Table with select-all, view-all
│   │   ├── HoldingRow.tsx      # Individual row with checkbox
│   │   └── TableCheckbox.tsx   # Custom checkbox (indeterminate support)
│   └── common/
│       ├── Loader.tsx          # Skeleton loader
│       ├── ErrorState.tsx      # Error UI with retry
│       └── SavingsBanner.tsx   # Green savings notification
├── App.tsx
├── main.tsx
└── index.css                   # Tailwind + custom theme + animations
```

---

## 🧮 Business Logic

### Calculation Rules

All math lives in `useCapitalGainsCalculations.ts` as **pure, testable functions**.

| Metric | Formula |
|--------|---------|
| Net STCG | `stcg.profits - stcg.losses` |
| Net LTCG | `ltcg.profits - ltcg.losses` |
| Realised Capital Gains | `Net STCG + Net LTCG` |

### Harvesting Adjustment (per selected holding)

- If `holding.stcg.gain > 0` → add to `stcg.profits`
- If `holding.stcg.gain < 0` → add `|gain|` to `stcg.losses`
- Same logic for `ltcg.gain`

### Idempotency

After-harvesting values are **always recomputed from base API data + current selection set**. This avoids floating-point drift from incremental add/subtract.

```
afterHarvesting = f(baseCapitalGains, holdings[], selectedAssetIds[])
```

### Savings

```
savings = preHarvesting.realisedCapitalGains - afterHarvesting.realisedCapitalGains
```

Banner shown only when `savings > 0`.

---

## 💰 Currency Formatting

All values use **Indian Rupee (₹)** with **Indian comma grouping**:

```
₹1,23,456    (not ₹123,456)
- ₹74,300    (negative with space)
+₹55,32,015  (positive with sign)
```

Implemented via `toLocaleString('en-IN')`.

---

## 🎨 Design Decisions

| Decision | Choice | Why |
|----------|--------|-----|
| **Sort order** | By absolute STCG gain (descending) | Shows highest-impact harvesting candidates first |
| **View-all threshold** | 8 rows | Good balance for initial viewport without scrolling |
| **Error rate** | 5% random failure (1-in-20) | Enough to demo retry UI without frustrating devs |
| **Decimal precision** | 2 for currency, up to 6 for tiny holdings | Standard crypto display practice |
| **State management** | React Context API | Sufficient for this complexity; avoids Redux boilerplate |
| **Coin logos** | CoinGecko CDN | Free, reliable, no API key needed |
| **Responsive breakpoints** | Mobile (<640), Tablet (<768), Desktop (≥1024) | Standard Tailwind breakpoints |

---

## 📱 Responsive Design

| Breakpoint | Layout |
|-----------|--------|
| **Desktop** (≥768px) | Cards side by side, full table with all columns |
| **Tablet** (640–768px) | Cards side by side, table hides Short/Long-term columns |
| **Mobile** (<640px) | Cards stacked vertically, table shows Asset + Holdings + minimal columns |

The table container is horizontally scrollable on smaller screens.

---

## 🔄 Mock API Behavior

| API | Delay | Failure Rate |
|-----|-------|-------------|
| Holdings | 600–800ms | 5% |
| Capital Gains | 500–700ms | 5% |

Both APIs use `Promise + setTimeout` to simulate real network latency, enabling visible loading states (skeleton loaders).

When a failure occurs, the **ErrorState** component displays with a "Try Again" button that retries only the failed API.

---

## ✨ Features

- ✅ Two-card layout (Pre Harvesting dark + After Harvesting blue)
- ✅ Live-updating numbers when holdings are toggled
- ✅ Savings banner with Indian currency formatting
- ✅ Select All / Deselect All with indeterminate checkbox state
- ✅ View All / View Less for large holding lists
- ✅ Collapsible disclaimers accordion
- ✅ Green/red color coding for gains/losses
- ✅ Blue highlight on selected table rows
- ✅ Skeleton loaders during API fetch
- ✅ Error state with retry capability
- ✅ Smooth number transition animations
- ✅ Full mobile responsiveness
- ✅ Coin logo fallback for broken images
- ✅ TypeScript strict typing (no `any`)
- ✅ Zero-config deployment (Vercel/Netlify ready)

---

## 🚢 Deployment

The app is fully client-side with mocked APIs — no backend, no environment variables, no hardcoded URLs.

**Vercel:**
```bash
npm run build
# Deploy the `dist/` folder
```

**Netlify:**
```bash
npm run build
# Set publish directory to `dist/`
```

Or simply connect the repo to Vercel/Netlify for automatic deployments.

---

## 🛠 Tech Stack

- **React 18** — Functional components + hooks
- **TypeScript 5** — Strict mode, no `any`
- **Vite 8** — Lightning-fast dev server + build
- **Tailwind CSS 4** — Utility-first styling with `@theme` custom tokens
- **React Context API** — Global state management
- **Inter (Google Fonts)** — Modern, clean typography

---

## 📄 License

MIT
