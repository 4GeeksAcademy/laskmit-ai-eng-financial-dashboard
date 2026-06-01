# Stack Tecnológico del Proyecto

## Backend
- **Lenguaje:** Python 3.x
- **Framework principal:** FastAPI ([backend/app/main.py](../../backend/app/main.py))
- **Validación de datos:** Pydantic ([backend/app/routes.py](../../backend/app/routes.py))
- **Testing:** pytest ([backend/tests/test_routes.py](../../backend/tests/test_routes.py))
- **Contenerización:** Docker ([backend/Dockerfile](../../backend/Dockerfile), [docker-compose.yml](../../docker-compose.yml))
- **Gestión de dependencias:** requirements.txt ([backend/requirements.txt](../../backend/requirements.txt))

## Frontend
- **Lenguaje:** TypeScript
- **Framework principal:** React ([frontend/src/App.tsx](../../frontend/src/App.tsx))
- **Gestor de paquetes:** npm ([frontend/package.json](../../frontend/package.json))
- **Herramienta de build:** Vite ([frontend/vite.config.ts](../../frontend/vite.config.ts))
- **Estilos:** Tailwind CSS ([frontend/src/index.css](../../frontend/src/index.css)), Shadcn/UI
- **Testing:** Pruebas de utilidades ([frontend/src/lib/financial-utils.test.ts](../../frontend/src/lib/financial-utils.test.ts))
- **Contenerización:** Docker ([frontend/Dockerfile](../../frontend/Dockerfile))

## Infraestructura y DevOps
- **Orquestación de servicios:** docker-compose ([docker-compose.yml](../../docker-compose.yml))
- **Estructura modular:** Separación clara entre backend y frontend

## Observaciones
- El stack está alineado con buenas prácticas modernas para aplicaciones web fullstack.
- Se recomienda añadir una base de datos real y herramientas de CI/CD para completar el ciclo DevOps.
