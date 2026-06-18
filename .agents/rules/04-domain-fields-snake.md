# Purpose: Mantener consistencia en los nombres de campos de dominio entre capas.
# Scope: proyecto
---
title: "Domain payload fields in snake_case"
description: "Los campos del dominio financiero deben permanecer en snake_case en backend y contrato API."
globs:
  - "backend/**/*.py"
  - "frontend/src/lib/**/*.ts"
applicationType: "Always"
alwaysApply: true
content: |
  Regla:
  - Los campos del payload financiero se mantienen en snake_case.

  Ejemplos esperados:
  - create_date
  - operation_type
  - business_type
  - total_amount
  - delta_pct

  No aplicar conversiones automaticas a camelCase para estos campos de contrato.
