# Purpose: Alinear la estructura del repositorio con las expectativas operativas de agentes.
# Scope: proyecto
---
title: "Agent directories must exist"
description: "Mantener .agents/rules y .agents/skills presentes y actualizados para guiar el trabajo de agentes."
globs:
  - "AGENTS.md"
  - ".agents/rules/**/*.md"
  - ".agents/skills/**"
applicationType: "Always"
alwaysApply: true
content: |
  Regla:
  - El repositorio debe contener la estructura .agents/rules y .agents/skills.
  - Las reglas deben reflejar convenciones reales del codigo y mantenerse vigentes.

  Motivo:
  - Evitar que las convenciones queden solo implicitas en el codigo.
