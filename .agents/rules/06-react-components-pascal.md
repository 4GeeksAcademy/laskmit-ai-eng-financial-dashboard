# Purpose: Estandarizar el nombrado de componentes y props en React.
# Scope: proyecto
---
title: "React components in PascalCase"
description: "Componentes React y tipos de props deben escribirse en PascalCase."
globs:
  - "frontend/src/**/*.tsx"
applicationType: "Always"
alwaysApply: true
content: |
  Regla:
  - Los componentes React usan PascalCase.
  - Los tipos/interfaces de props usan PascalCase y sufijo Props cuando aplique.

  Ejemplos esperados:
  - App, KPIRow, IncomeOutcomeChart
  - DashboardHeaderProps, KPICardProps
