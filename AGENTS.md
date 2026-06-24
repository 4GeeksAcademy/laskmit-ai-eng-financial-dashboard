# Agent Guidance

Agents working on this project **must**:

- Look for **work instructions and rules** in the directory:  
  `./.agents/rules`

- Look for available **agent skills** in the directory:  
  `./.agents/skills`

- Look for the **project memory bank** in:  
  `./memory-bank`  

- Progreso para **acciones futuras** documentadas en memory bank:
  `aplicacion-futura-skill-error-management`
  `aplicacion-futura-skill-performance`
  


Before taking action (analyzing code, modifying files, or generating outputs), always review the latest files in these locations to ensure compliance with project conventions, context, and operational constraints.

## Tabla resumen de reglas

| Regla | Globs | applicationType | alwaysApply |
| --- | --- | --- | --- |
| Python snake_case naming | `backend/**/*.py` | Always | true |
| Python models in PascalCase | `backend/**/*.py` | Always | true |
| Python constants UPPER_SNAKE_CASE | `backend/**/*.py` | Always | true |
| Domain payload fields in snake_case | `backend/**/*.py`, `frontend/src/lib/**/*.ts` | Always | true |
| Pytest test_ prefix | `backend/tests/**/*.py` | Always | true |
| React components in PascalCase | `frontend/src/**/*.tsx` | Always | true |
| TypeScript utility functions camelCase | `frontend/src/lib/**/*.ts`, `frontend/src/**/*.tsx` | Always | true |
| Type aliases and interfaces PascalCase | `frontend/src/**/*.ts`, `frontend/src/**/*.tsx` | Always | true |
| Feature files in kebab-case | `frontend/src/components/**/*.tsx`, `frontend/src/lib/**/*.ts` | Auto Attached | false |
| Use @ alias for internal imports | `frontend/src/**/*.ts`, `frontend/src/**/*.tsx` | Always | true |
| Frontend tests use .test suffix | `frontend/src/**/*.test.ts`, `frontend/src/**/*.test.tsx` | Always | true |
| Keep API contract field names stable | `backend/app/**/*.py`, `frontend/src/lib/**/*.ts`, `frontend/src/**/*.tsx` | Always | true |
| Frontend quote style consistency | `frontend/**/*.{ts,tsx,js}` | Manual (Mencion) | false |
| Frontend semicolon consistency | `frontend/**/*.{ts,tsx,js}` | Manual (Mencion) | false |
| Top-level frontend filename convention | `frontend/src/*.tsx` | Agent Requested | false |
| UI copy language consistency | `frontend/src/**/*.tsx` | LLM Oriente | false |
| Agent directories must exist | `AGENTS.md`, `.agents/rules/**/*.md`, `.agents/skills/**` | Always | true |

Para el detalle completo de cada regla, revisar los archivos individuales en `./.agents/rules`.
Las reglas ya están creadas en este directorio y habia entendido en paso 2 que debia crearlas. Por eso pongo esta nota en Paso 3.
