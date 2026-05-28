# Technology Stack

## Frontend
- Runtime and language
  - React 19 + React DOM 19.
  - TypeScript 6.
  - Vite 8 build and dev server.
- UI and visualization
  - Recharts for financial trend visualizations.
  - Lucide React icons.
  - Utility/class helpers: clsx, class-variance-authority, tailwind-merge.
  - Tailwind CSS v4 toolchain via @tailwindcss/vite, postcss, autoprefixer.
- Quality and tests
  - ESLint 9 + typescript-eslint + React hooks/refresh plugins.
  - Vitest 4 + coverage-v8.

## Backend
- Runtime and framework
  - Python with FastAPI.
  - Uvicorn standard server.
- Data and validation
  - Pydantic BaseModel for API response/input models.
  - In-memory deterministic mock data generation (seeded random).
- Testing
  - Pytest + pytest-cov.
  - HTTP endpoint tests via fastapi TestClient and httpx dependency.

## Infrastructure and tooling
- Orchestration
  - Docker Compose with two services: frontend and backend.
  - Frontend exposed on port 5173.
  - Backend exposed on ports 8000 and 5678 (debug).
- Development behavior
  - Source bind mounts for hot reload style local iteration in both services.
  - Frontend Vite proxy expected for /api calls in local development.

## Key commands in repository workflow
- Root
  - docker compose up --build
- Frontend
  - npm run dev
  - npm run build
  - npm run lint
  - npm run test
  - npm run test:coverage
- Backend
  - pytest

## Key dependencies (verified)
- Frontend: react, react-dom, recharts, vite, vitest, eslint, tailwindcss.
- Backend: fastapi, uvicorn[standard], pytest, pytest-cov, httpx, debugpy.

## Evidence
- Frontend scripts and dependencies: frontend/package.json.
- Backend dependencies: backend/requirements.txt.
- Compose services and ports: docker-compose.yml.
- Frontend API base handling: frontend/src/App.tsx.
