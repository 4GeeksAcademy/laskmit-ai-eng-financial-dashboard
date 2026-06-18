# Purpose: Estandarizar nombres y ubicacion de tests en frontend.
# Scope: proyecto
---
title: "Frontend tests use .test suffix"
description: "Los tests de frontend deben usar sufijo .test.ts o .test.tsx y vivir junto al modulo cuando aplique."
globs:
  - "frontend/src/**/*.test.ts"
  - "frontend/src/**/*.test.tsx"
applicationType: "Always"
alwaysApply: true
content: |
  Regla:
  - Nombrar pruebas con sufijo .test.ts o .test.tsx.
  - Mantener tests cercanos al modulo/feature para contexto rapido.

  Ejemplo esperado:
  - frontend/src/lib/financial-utils.test.ts
