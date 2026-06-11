# Nike Design Tools Dashboard

A full-stack React SPA built to simulate Nike's internal product design tooling dashboard — the kind of tool used by the creation community at Nike's India Technology Center (ITC), Bengaluru. Built as a portfolio project aligned with Nike's SWE I job description.

---

## Live Demo

> Run locally with `npm run dev` → [http://localhost:5173](http://localhost:5173)

---

## Screenshots

| Dashboard | Products Catalog |
|---|---|
| Stats, activity feed, recently updated products | Search, filter, sort, grid/list toggle |

| Product Detail | Analytics |
|---|---|
| Full product view, approve/reject workflow | Bar chart, donut chart, pipeline stages |

---

## Features

### Dashboard (`/`)
- At-a-glance stats: total products, live, in-review, draft counts
- Recently updated product grid with live API data
- Activity feed showing team actions (approvals, reviews, comments)

### Product Catalog (`/products`)
- Fetches 20 real products from FakeStore REST API
- **Search** by title or category (live, case-insensitive)
- **Filter** by category (men's, women's, electronics, jewelery)
- **Filter** by status (active / in review / draft)
- **Sort** by default, price ascending, price descending, top rated
- **Grid / List view toggle** with persistent preference
- Loading skeletons on every async fetch

### Product Detail (`/products/:id`)
- Dynamic route — every product has its own URL
- Full product image, description, specs (season, colorway, SKU, rating)
- Status badge, season tag, colorway tag
- **Approve Design** and **Request Changes** action buttons

### Analytics (`/analytics`)
- Monthly submissions bar chart (pure SVG, no external chart library)
- Category breakdown donut chart (pure SVG)
- Pipeline stage overview: Concept → Design → Review → Approved → Live

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Build Tool | Vite |
| Routing | React Router v6 |
| State Management | React Hooks (useState, useEffect, useContext) |
| Data Fetching | FakeStore REST API + custom hooks |
| Styling | Plain CSS with CSS custom properties (no framework) |
| Charts | Pure SVG (no Recharts / Chart.js dependency) |
| Testing | Vitest + React Testing Library |
| CI/CD | GitHub Actions → AWS S3 (ap-south-1) |

---

## Project Structure

```
nike-design-dashboard/
├── .github/
│   └── workflows/
│       └── ci.yml              # Test → Build → Deploy pipeline
├── src/
│   ├── components/
│   │   ├── Topbar.jsx          # Top navigation bar with avatar
│   │   ├── Sidebar.jsx         # Left nav with active-route highlighting
│   │   ├── ProductCard.jsx     # Grid view card component
│   │   ├── ProductListRow.jsx  # List view row component
│   │   └── Skeleton.jsx        # Shimmer loading placeholders
│   ├── hooks/
│   │   └── useProducts.js      # useProducts, useProduct, useProductFilter
│   ├── pages/
│   │   ├── Dashboard.jsx       # Home / overview page
│   │   ├── Products.jsx        # Catalog with search + filter
│   │   ├── ProductDetail.jsx   # Single product detail view
│   │   ├── Analytics.jsx       # Charts and pipeline stats
│   │   └── Placeholder.jsx     # Stub pages (Assets, Seasons, Team)
│   ├── __tests__/
│   │   ├── setup.js
│   │   ├── ProductCard.test.jsx       # 8 component tests
│   │   ├── Sidebar.test.jsx           # 7 component tests
│   │   └── useProductFilter.test.js   # 9 hook unit tests
│   ├── App.jsx                 # Router setup (7 routes)
│   ├── main.jsx                # React entry point
│   └── index.css               # Design system — CSS variables, layout
├── vitest.config.js
├── vite.config.js
└── package.json
```

---

## Getting Started

### Prerequisites
- Node.js 18+ ([download](https://nodejs.org))
- npm 9+

### Installation

```bash
# Clone the repo
git clone https://github.com/Bhagyasrimaddisetty/Nike-Design-Tools-Dashboard.git
cd Nike-Design-Tools-Dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

```bash
npm run dev      # Start dev server with hot reload
npm run build    # Production build → dist/
npm run preview  # Preview production build locally
npm test         # Run all 24 tests once
```

---

## Testing

24 tests across 3 files using Vitest + React Testing Library:

```
✓ useProductFilter.test.js   9 tests  — search, filter, sort, combined queries
✓ ProductCard.test.jsx        8 tests  — render, routing, all 3 status badges
✓ Sidebar.test.jsx            7 tests  — links, active-state class, badge count
```

Run tests:
```bash
npm test
```

---

## CI/CD Pipeline

GitHub Actions workflow (`.github/workflows/ci.yml`) triggers on every push to `main`:

```
Push to main
    │
    ▼
[1] Run Tests (vitest)
    │  must pass before proceeding
    ▼
[2] Build (vite build)
    │
    ▼
[3] Deploy → AWS S3 (ap-south-1)
    │
    ▼
[4] Invalidate CloudFront cache (optional)
```

### Required GitHub Secrets for deployment

| Secret | Description |
|---|---|
| `AWS_S3_BUCKET` | S3 bucket name for static hosting |
| `AWS_ACCESS_KEY_ID` | IAM user access key (least-privilege: S3 + CloudFront only) |
| `AWS_SECRET_ACCESS_KEY` | IAM user secret key |
| `CLOUDFRONT_DISTRIBUTION_ID` | Optional — for cache invalidation |

---

## Custom Hooks

### `useProducts()`
Fetches all 20 products from FakeStore API. Enriches each product with Nike-style metadata: `status`, `season`, `colorway`, `sku`, `emoji`. Returns `{ products, loading, error }`.

### `useProduct(id)`
Fetches a single product by ID. Same enrichment as above. Returns `{ product, loading, error }`.

### `useProductFilter(products)`
Pure client-side filter/sort engine. Manages `query`, `category`, `status`, `sortBy` state and returns a `filtered` array. Combines all filters simultaneously.

---

## Design Decisions

- **No CSS framework** — all styling is hand-written using CSS custom properties, making it easy to retheme and demonstrating strong CSS fundamentals
- **No chart library** — Analytics charts are pure SVG, keeping the bundle small (~80KB gzipped) and avoiding heavy dependencies
- **Custom hooks over Redux** — application state is simple enough that `useState` + custom hooks cover all use cases cleanly
- **Vite over CRA** — significantly faster HMR and build times; better aligned with modern React tooling in 2025

---

## Alignment with Nike SWE I JD

| Nike Requirement | How This Project Covers It |
|---|---|
| React experience | Entire app built in React 18 with hooks, context, Router v6 |
| REST / API-first | Custom hooks wrapping FakeStore REST API |
| CI/CD | GitHub Actions pipeline: test → build → S3 deploy |
| AWS (S3) | Static hosting via S3 + CloudFront invalidation |
| Jest / testing | 24 tests with Vitest + React Testing Library |
| Domain-driven design | Components, hooks, and pages separated by concern |
| Microservices / modular | Each hook is a standalone data-fetching module |
| Agile / sprint delivery | Structured with feature branches and commit messages |

---

## Author

**Maddisetty Bhagya Sri**  
B.Tech CSE (AI/ML) · Mohan Babu University · CGPA 9.3  
[LinkedIn](https://www.linkedin.com/in/bhagya-sri-maddisetty-064102305/) · [GitHub](https://github.com/Bhagyasrimaddisetty)

---

*Built as a portfolio project for the Nike Software Engineer I role at ITC Bengaluru (Job ID: R-85669)*
