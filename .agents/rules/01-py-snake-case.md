# Purpose: Definir una convencion unica para nombres de funciones y variables en Python.
# Scope: proyecto
---
title: "Python snake_case naming"
description: "Usar snake_case para funciones, parametros, variables locales y variables de modulo en backend."
globs:
  - "backend/**/*.py"
applicationType: "Always"
alwaysApply: true
content: |
  Regla:
  - Los nombres de funciones, parametros y variables en Python deben seguir snake_case.

  Ejemplos esperados:
  - generate_mock_movements
  - filter_movements_by_date
  - start_date, end_date

  No permitido:
  - camelCase o PascalCase para funciones/variables de backend.
