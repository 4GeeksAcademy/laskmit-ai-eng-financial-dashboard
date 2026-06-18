# Purpose: Mantener imports internos consistentes y legibles en frontend.
# Scope: proyecto
---
title: "Use @ alias for internal imports"
description: "Usar alias @/ para imports internos de frontend cuando sea posible."
globs:
  - "frontend/src/**/*.ts"
  - "frontend/src/**/*.tsx"
applicationType: "Always"
alwaysApply: true
content: |
  Regla:
  - Priorizar imports internos con alias @/ en lugar de rutas relativas largas.

  Soporte de configuracion:
  - frontend/tsconfig.app.json
  - frontend/vite.config.ts

  Ejemplo esperado:
  - import { KPIRow } from '@/components/dashboard/kpi-row'
