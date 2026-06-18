# Technological Stack

## Frontend
- Runtime/UI:
  - React 19
  - React DOM 19
  - TypeScript 6
- Build/dev server:
  - Vite 8
  - @vitejs/plugin-react
- Styling:
  - Tailwind CSS 4
  - @tailwindcss/vite
  - class-variance-authority
  - clsx
  - tailwind-merge
- Charts/icons:
  - Recharts
  - lucide-react
- Quality/testing:
  - ESLint 9 + typescript-eslint + react-hooks + react-refresh
  - Vitest 4 + @vitest/coverage-v8

## Backend
- Framework/API:
  - FastAPI
  - Pydantic (via FastAPI BaseModel)
- Server/debug:
  - uvicorn[standard]
  - debugpy
- Testing:
  - pytest
  - pytest-cov
  - httpx (usado por ecosistema de test client)

## Infrastructure and tooling
- Containerization:
  - Docker (frontend y backend con Dockerfile separados)
  - Docker Compose para orquestacion local
- Ports:
  - Frontend: 5173
  - Backend API: 8000
  - Debug backend: 5678
- Dev workflow:
  - Hot reload en frontend (`vite`)
  - Uvicorn con `--reload` en backend
  - Vite proxy `/api` -> `http://backend:8000`

## Key dependencies by area
- Data visualization: `recharts`
- UI primitives/utilities: `class-variance-authority`, `clsx`, `tailwind-merge`
- API framework: `fastapi`
- Python app server: `uvicorn[standard]`
- FE unit testing: `vitest`
- BE testing: `pytest`

## Verified evidence
- `frontend/package.json`
- `backend/requirements.txt`
- `frontend/vite.config.ts`
- `frontend/eslint.config.js`
- `frontend/Dockerfile`
- `backend/Dockerfile`
- `docker-compose.yml`
