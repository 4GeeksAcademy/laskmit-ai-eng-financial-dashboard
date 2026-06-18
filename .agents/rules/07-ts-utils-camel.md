# Purpose: Homogeneizar nombres de funciones utilitarias en TypeScript.
# Scope: proyecto
---
title: "TypeScript utility functions camelCase"
description: "Funciones utilitarias y helpers en frontend deben usar camelCase."
globs:
  - "frontend/src/lib/**/*.ts"
  - "frontend/src/**/*.tsx"
applicationType: "Always"
alwaysApply: true
content: |
  Regla:
  - Helpers y utilidades en frontend usan camelCase.

  Ejemplos esperados:
  - computeKPIs
  - computeMonthlyData
  - formatCurrency
  - formatPercent
  - toYearMonthKey
