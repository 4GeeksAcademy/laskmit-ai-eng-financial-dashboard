# Resumen del Proyecto y Stack Tecnológico

## Resumen del Proyecto

Este proyecto es un dashboard financiero desarrollado para el análisis y visualización de datos económicos. El objetivo principal es proporcionar una herramienta interactiva que permita a los usuarios consultar, visualizar y analizar indicadores clave de rendimiento (KPIs), ingresos, gastos y porcentajes de beneficio, todo presentado de manera clara y visual.

El proyecto está estructurado en dos partes principales:
- **Backend**: Se encarga de la gestión de datos, lógica de negocio y exposición de APIs.
- **Frontend**: Proporciona la interfaz de usuario para la visualización e interacción con los datos.

## Stack Tecnológico

### Backend
- **Lenguaje**: Python
- **Framework**: FastAPI
- **Gestión de dependencias**: requirements.txt
- **Testing**: pytest
- **Contenerización**: Docker (Dockerfile y docker-compose.yml)

### Frontend
- **Lenguaje**: TypeScript
- **Framework**: React
- **Gestor de paquetes**: npm
- **Herramienta de build**: Vite
- **Eslint**: Para el estilo y calidad del código
- **Contenerización**: Docker (Dockerfile)

### Otros
- **Gestión de componentes**: Estructura modular con componentes reutilizables (dashboard, UI, etc.)
- **Estilos**: CSS
- **Testing**: Incluye archivos de test para utilidades financieras

## Estructura de Carpetas

- `backend/`: Código fuente del backend, tests y configuración de Docker
- `frontend/`: Código fuente del frontend, componentes, assets, configuración de build y Docker
- `docker-compose.yml`: Orquestación de servicios backend y frontend

## Resumen
El proyecto ofrece una solución completa para la visualización de datos financieros, aprovechando tecnologías modernas tanto en el backend como en el frontend, y facilitando el despliegue mediante contenedores Docker.