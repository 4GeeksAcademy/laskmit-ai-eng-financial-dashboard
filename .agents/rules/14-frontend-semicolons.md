# Purpose: Corregir inconsistencia de punto y coma en frontend.
# Scope: proyecto
---
title: "Frontend semicolon consistency"
description: "Definir una politica unica de uso de punto y coma en frontend y aplicarla de forma uniforme."
globs:
  - "frontend/**/*.{ts,tsx,js}"
applicationType: "Manual (Mencion)"
alwaysApply: false
content: |
  Regla:
  - Elegir una sola convencion para punto y coma (con o sin) y mantenerla en todo frontend.
  - Evitar mezcla de estilos por archivo o feature.

  Recomendacion:
  - Respaldar la decision con formatter/linter para enforcement automatico.
