# Purpose: Estandarizar el nombrado de tipos y modelos en backend.
# Scope: proyecto
---
title: "Python models in PascalCase"
description: "Los modelos, clases y tipos de dominio en Python deben nombrarse en PascalCase."
globs:
  - "backend/**/*.py"
applicationType: "Always"
alwaysApply: true
content: |
  Regla:
  - Toda clase o tipo de dominio debe estar en PascalCase.

  Ejemplos esperados:
  - FinancialMovement
  - MetricsFacets
  - MetricsComparison

  Objetivo:
  - Diferenciar claramente tipos/clases de funciones y variables.
