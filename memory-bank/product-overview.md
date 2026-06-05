# Product Overview

## Product purpose
Financial Metrics Dashboard for exploring operational financial performance with a web UI and API.

## Verified product statement
- Repository describes the product as a financial metrics dashboard with React + TypeScript frontend and FastAPI backend.
- Local execution and service URLs are documented for frontend, backend, and API docs.

## Core user flow (as implemented)
1. User opens frontend dashboard.
2. Frontend requests GET /api/metrics.
3. Backend returns filtered and chronologically sorted mock financial movements.
4. Frontend computes KPIs and monthly chart data.
5. UI renders KPI cards plus two trend charts.

## Domain model (current)
- Financial movement fields: create_date, amount, operation_type, category, business_type.
- operation_type: income | outcome.
- business_type: B2B | B2C.
- category: suppliers | sales | operational | administrative | others.

## API capabilities currently exposed
- Health: /health.
- Metrics base dataset with optional filters: /api/metrics.
- Facets for filters: /api/metrics/facets.
- Time-grouped summary: /api/metrics/summary.
- Top categories by operation type: /api/metrics/categories/top.
- Period comparison and deltas: /api/metrics/comparison.
- Outcome anomaly alerts: /api/metrics/alerts.
- Business-segment subsets: /api/metrics/b2b and /api/metrics/b2c.

## Evidence
- README and Spanish README: README.md, README.es.md.
- Frontend data fetch and dashboard composition: frontend/src/App.tsx.
- Shared financial model in frontend: frontend/src/lib/financial-types.ts.
- Backend model and endpoints: backend/app/routes.py.
- API app wiring and CORS: backend/app/main.py.
