<!--
Sync Impact Report
- Version change: template (unversioned) -> 1.0.0
- Modified principles:
	- PRINCIPLE_1_NAME -> I. NestJS-First Service Architecture
	- PRINCIPLE_2_NAME -> II. In-Memory Data Only (NON-NEGOTIABLE)
	- PRINCIPLE_3_NAME -> III. Contract-Driven API and Validation
	- PRINCIPLE_4_NAME -> IV. Test Gate for Behavior and State
	- PRINCIPLE_5_NAME -> V. Secure Defaults and Observability
- Added sections:
	- Technical Guardrails
	- Workflow and Quality Gates
- Removed sections:
	- SECTION_2_NAME
	- SECTION_3_NAME
- Templates requiring updates:
	- ✅ updated: .specify/templates/plan-template.md
	- ✅ updated: .specify/templates/spec-template.md
	- ✅ updated: .specify/templates/tasks-template.md
	- ⚠ pending: .specify/templates/commands/*.md (directory not present)
	- ✅ updated: README.md
- Follow-up TODOs:
	- None
-->

# Provider Subscription Constitution

## Core Principles

### I. NestJS-First Service Architecture
All backend features MUST be implemented with NestJS module boundaries and dependency
injection. Each feature MUST expose behavior through controllers, services, and DTOs
instead of ad hoc scripts. Cross-module coupling MUST be explicit via exported
providers. Rationale: consistent architecture keeps the codebase composable and
maintainable as features grow.

### II. In-Memory Data Only (NON-NEGOTIABLE)
This project MUST use in-memory storage only. No real database connections are
allowed in application code, tests, configuration, or dependencies. Features that
need persistence semantics MUST implement repository interfaces backed by in-memory
collections and deterministic seed/reset behavior. Rationale: this project is a
POC and must remain fully runnable without external infrastructure.

### III. Contract-Driven API and Validation
Every externally reachable endpoint MUST define request and response contracts,
including validation constraints and error shapes. DTO validation MUST run at the
boundary before business logic executes. Any contract change MUST include explicit
backward-compatibility notes in the feature spec. Rationale: clear API contracts
prevent regressions and unclear client behavior.

### IV. Test Gate for Behavior and State
All feature work MUST include automated tests that cover both business behavior and
in-memory state transitions. At minimum, one unit test and one integration or e2e
test MUST validate each new feature path. Test suites MUST reset in-memory state
between cases. Rationale: ephemeral storage is prone to order-dependent bugs unless
state isolation is enforced.

### V. Secure Defaults and Observability
Input handling MUST fail closed with explicit validation errors. Sensitive values
MUST NOT be logged. Runtime logs SHOULD be structured and include request context,
route, and failure reason without exposing secrets or PII. Rationale: even in a
POC, secure and debuggable defaults reduce risk and rework.

## Technical Guardrails

- Language/runtime MUST be TypeScript on Node.js with NestJS.
- Storage MUST remain in-memory until a future constitution amendment explicitly
  permits external persistence.
- New dependencies that introduce database clients or ORMs MUST NOT be added.
- Configuration MUST keep local startup zero-dependency: `npm install` then
  `npm run start:dev` is sufficient.
- Feature plans MUST identify state reset strategy for tests and local runs.

## Workflow and Quality Gates

1. Specification phase MUST state that data is in-memory and define repository
	behavior constraints.
2. Plan phase MUST pass Constitution Check gates for architecture, in-memory-only
	storage, contract clarity, and tests.
3. Tasks phase MUST include explicit tasks for DTO validation, in-memory repository
	implementation, test isolation, and logging/error handling.
4. Implementation MUST fail the gate if new database dependencies or connection
	code appears.
5. Pull requests MUST include evidence of passing unit and e2e tests.

## Governance
This constitution overrides conflicting guidance in local templates and docs.
Amendments require: (1) a documented rationale, (2) template impact review,
and (3) updates to affected artifacts in the same change set.

Versioning policy:
- MAJOR: Remove or redefine a core principle in a backward-incompatible way.
- MINOR: Add a new principle/section or materially expand governance requirements.
- PATCH: Clarify wording, fix ambiguities, or make non-semantic editorial updates.

Compliance review expectations:
- Every plan and task set MUST include a Constitution Check.
- Every pull request SHOULD cite how it satisfies each relevant principle.
- Any temporary exception MUST be time-bound and tracked in writing.

**Version**: 1.0.0 | **Ratified**: 2026-05-01 | **Last Amended**: 2026-05-01
