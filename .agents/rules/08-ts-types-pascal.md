# Purpose: Diferenciar semanticamente tipos de datos en frontend.
# Scope: proyecto
---
title: "Type aliases and interfaces PascalCase"
description: "Type aliases e interfaces de TypeScript deben nombrarse en PascalCase."
globs:
  - "frontend/src/**/*.ts"
  - "frontend/src/**/*.tsx"
applicationType: "Always"
alwaysApply: true
content: |
  Regla:
  - Toda interface y type alias debe estar en PascalCase.

  Ejemplos esperados:
  - OperationType
  - FinancialMovement
  - KPIMetrics
  - MonthlyDataPoint
