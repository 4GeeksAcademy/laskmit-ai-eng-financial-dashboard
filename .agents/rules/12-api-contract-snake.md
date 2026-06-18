# Purpose: Proteger el contrato API entre backend y frontend.
# Scope: proyecto
---
title: "Keep API contract field names stable"
description: "No romper ni renombrar campos del contrato financiero sin migracion explicita; mantener snake_case entre backend y frontend."
globs:
  - "backend/app/**/*.py"
  - "frontend/src/lib/**/*.ts"
  - "frontend/src/**/*.tsx"
applicationType: "Always"
alwaysApply: true
content: |
  Regla:
  - Los nombres de campos expuestos por la API deben permanecer estables y en snake_case.
  - Cualquier cambio de contrato requiere coordinacion backend+frontend y actualizacion de tests.

  Campos criticos:
  - create_date
  - operation_type
  - business_type
