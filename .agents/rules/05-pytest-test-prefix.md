# Purpose: Unificar nomenclatura de pruebas en backend.
# Scope: proyecto
---
title: "Pytest test_ prefix"
description: "Las funciones de prueba en backend deben iniciar con test_."
globs:
  - "backend/tests/**/*.py"
applicationType: "Always"
alwaysApply: true
content: |
  Regla:
  - Cada test en pytest debe llamarse con prefijo test_.

  Ejemplos esperados:
  - test_metrics_endpoint_respects_date_filters
  - test_metrics_alerts_returns_anomaly_candidates

  Esto mantiene descubrimiento automatico de tests y trazabilidad clara.
