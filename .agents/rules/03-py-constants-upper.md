# Purpose: Hacer visibles y consistentes las constantes globales de backend.
# Scope: proyecto
---
title: "Python constants UPPER_SNAKE_CASE"
description: "Toda constante de modulo en backend se declara en UPPER_SNAKE_CASE."
globs:
  - "backend/**/*.py"
applicationType: "Always"
alwaysApply: true
content: |
  Regla:
  - Las constantes de modulo deben escribirse en UPPER_SNAKE_CASE.

  Ejemplo esperado:
  - OUTCOME_CATEGORIES

  Beneficio:
  - Mejora la lectura y reduce ambiguedad sobre mutabilidad.
