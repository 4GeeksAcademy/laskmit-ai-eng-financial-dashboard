# Purpose: Unificar el idioma de la interfaz para una UX consistente.
# Scope: proyecto
---
title: "UI copy language consistency"
description: "Todo el texto de interfaz debe usar un idioma principal consistente por pantalla/modulo."
globs:
  - "frontend/src/**/*.tsx"
applicationType: "LLM Oriente"
alwaysApply: false
content: |
  Regla:
  - No mezclar idiomas en labels, titulos, ayudas y mensajes de error dentro de una misma vista.
  - Si se requiere multi-idioma, aplicar estrategia i18n explicita.

  Objetivo:
  - Mejor coherencia de producto y menor friccion para el usuario final.
