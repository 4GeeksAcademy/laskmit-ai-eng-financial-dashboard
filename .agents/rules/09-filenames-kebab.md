# Purpose: Definir un patron consistente para nombres de archivo por feature.
# Scope: proyecto
---
title: "Feature files in kebab-case"
description: "Los archivos de componentes y utilidades por feature deben usar kebab-case."
globs:
  - "frontend/src/components/**/*.tsx"
  - "frontend/src/lib/**/*.ts"
applicationType: "Auto Attached"
alwaysApply: false
content: |
  Regla:
  - Para archivos de feature/componentes/utilidades, usar kebab-case.

  Ejemplos esperados:
  - dashboard-header.tsx
  - income-outcome-chart.tsx
  - financial-types.ts
  - financial-utils.ts

  Nota:
  - Revisar y normalizar excepciones en archivos top-level cuando se renombren.
