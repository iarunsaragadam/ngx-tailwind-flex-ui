# AGENTS.md

## Purpose

This document outlines QA expectations, behavioral contracts, and validation protocols for UI components in this Angular library. While this is not an AI agent system, we treat each component as an autonomous "agent" responsible for its behavior, accessibility, and integration correctness.

---

## Component Responsibilities

Each UI component must adhere to the following principles:

### 1. **Self-Containment**
- Accepts inputs via `@Input()` and emits outputs via `@Output()`.
- Should not have hidden side effects or depend on global state.

### 2. **Accessibility**
- Implements proper ARIA roles and keyboard navigation.
- Uses semantic HTML where possible.
- Ensures focus management and screen reader compatibility.

### 3. **Test Coverage**
- Unit tests must validate:
  - Input/output bindings
  - DOM rendering logic
  - User interaction outcomes
- Snapshot or visual diff testing encouraged (via Storybook or similar).

### 4. **Styling and Theming**
- Uses Tailwind CSS utility classes consistently.
- Should respect container styling (no global overrides).
- Theming hooks (CSS vars or config-based) should be used if applicable.

### 5. **Documentation**
- Every component must include:
  - Usage example (code block)
  - API reference (inputs/outputs)
  - Notes on accessibility and behavior
- Add to central documentation under `docs/` or the README section.

---

## QA Checklist for New Components

Before merging a new component:

- [ ] All inputs/outputs are documented and tested.
- [ ] ARIA roles and keyboard interactions verified.
- [ ] Unit tests cover all logic paths.
- [ ] Edge cases handled (e.g. empty state, rapid interaction).
- [ ] Component added to a demo app or Storybook.
- [ ] Mobile responsiveness validated.
- [ ] Readme or docs updated with usage.

---

## Example: `AccordionComponent`

| Aspect        | Required Behavior                         |
|---------------|-------------------------------------------|
| Toggle Mode   | Expand/collapse with single or multiple panels |
| Keyboard Nav  | Arrow keys, Enter, Space supported        |
| A11y          | Uses `aria-expanded`, `aria-controls`     |
| Tests         | Open/close behavior, disabled state, emitters |

---

## Continuous Improvement

We aim to evolve this library with best-in-class accessibility, design flexibility, and test reliability. Contributors are encouraged to update this file when introducing new component patterns or QA protocols.

