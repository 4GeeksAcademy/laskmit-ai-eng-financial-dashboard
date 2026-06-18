# Purpose: Corregir inconsistencia de comillas en frontend.
# Scope: proyecto
---
title: "Frontend quote style consistency"
description: "Definir y aplicar un unico estilo de comillas en frontend para reducir ruido en diffs."
globs:
  - "frontend/**/*.{ts,tsx,js}"
applicationType: "Manual (Mencion)"
alwaysApply: false
content: |
  Regla:
  - Adoptar un solo estilo de comillas en frontend (recomendado: comilla simple).
  - Evitar mezclar comilla simple y doble dentro del mismo modulo sin motivo tecnico.

  Razon:
  - Mejor legibilidad y menos cambios cosmeticos en revisiones.
