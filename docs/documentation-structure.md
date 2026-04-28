# Documentation Structure

## Introduction

This document describes the structure of the `docs/` directory, which contains all project documentation (features, design, development, testing, etc.).

## Directory Layout

```
docs/
├── project-overview.md
├── project-structure.md
├── documentation-structure.md
├── requirements/
│   └── {component}/
│       └── {feature-name}.md
├── tasks/
│   └── {component}/
│       └── {task-number}-{task-name}.md
├── design/
│   ├── system-architecture.md
│   └── {component}/
│       ├── component-design.md
│       ├── api-design.md
│       ├── database-design.md
│       └── ui-design.md
├── implementation/
│   ├── development-workflows.md
│   └── {component}/
│       ├── architectural-pattern.md
│       ├── coding-standards.md
│       └── coding-guidelines.md
├── tests/
│   └── {component}/
│       └── {feature-name}.md
└── maintenance/
    ├── deployment-guide.md
    └── monitoring-guide.md
```

- `project-overview.md`: high-level project summary.
- `project-structure.md`: project root's layout.
- `documentation-structure.md`: directory layout of `docs/`.
- `requirements/`: feature documentation, grouped by component.
- `tasks/`: project tasks, grouped by component.
- `design/`: technical design documentation.
  - `system-architecture.md`: system's high-level design.
  - `{component}/`: component-specific documentations.
    - `component-design.md`: component design.
    - `api-design.md`: API specs.
    - `database-design.md`: schema and data model.
    - `ui-design.md`: UI/UX mockups and wireframes.
- `implementation/`: implementation guidance.
  - `development-workflows.md`: branching, CI/CD, reviews.
  - `architectural-pattern.md`: architecture patterns.
  - `coding-standards.md`: style and formatting rules.
  - `coding-guidelines.md`: implementation practices.
- `tests/{component}/`: component test documentation.
  - `{feature-name}.md`: feature's test cases.
- `maintenance/`: operational documentation.
  - `deployment-guide.md`: deployment instructions.
  - `monitoring-guide.md`: monitoring and alerts.

`{component}` can be:

- `auth`: responsible for authentication, authorization, login
- `diary`: responsible for activity management, tags, statistics
