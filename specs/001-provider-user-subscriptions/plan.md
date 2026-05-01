# Implementation Plan: Provider User Subscriptions

**Branch**: `001-provider-user-subscriptions` | **Date**: 2026-05-01 | **Spec**: `/specs/001-provider-user-subscriptions/spec.md`
**Input**: Feature specification from `/specs/001-provider-user-subscriptions/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Implement three clean NestJS modules (`company`, `user`, `subscription`) with fully
in-memory repositories, strict DTO validation, Swagger coverage for all endpoints,
and no external database or third-party integrations. Subscription lifecycle is
company-level, supports fixed plan catalog, enforces admin-only buy/cancel via
`actorUserId` checks, and rejects repurchase while an active subscription exists.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript 5.x on Node.js 18+ with NestJS 10.x  
**Primary Dependencies**: `@nestjs/common`, `@nestjs/core`, `@nestjs/platform-express`, `class-validator`, `class-transformer`, `@nestjs/swagger`  
**Storage**: In-memory collections only (arrays/maps in process memory)  
**Testing**: Jest unit tests and Nest e2e tests with in-memory state reset hooks  
**Target Platform**: Linux Node.js service runtime (local/dev and CI)
**Project Type**: Single NestJS web-service backend  
**Performance Goals**: p95 <= 1s for CRUD and subscription operations in local/dev; startup with seed data <= 3s  
**Constraints**: No external DB, no Stripe, no AWS, no JWT requirement, no third-party network dependencies for business flow  
**Scale/Scope**: POC scope; low concurrency; hundreds of in-memory entities per module for manual and automated validation

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- `NestJS-First Architecture`: PASS. Modules, DI services, controllers, DTO
  boundaries are planned explicitly.
- `In-Memory Only`: PASS. All persistence and transactions are in-process memory,
  no DB or external service.
- `Contract-Driven API`: PASS. Endpoint contracts and validation DTOs are defined
  in contracts and data model artifacts.
- `Test Gate`: PASS. Unit/e2e coverage and deterministic state reset strategy are
  part of implementation guidance.
- `Secure Observability`: PASS. Structured error/logging approach excludes secrets
  and PII while retaining request context.

Post-Design Constitution Re-Check:
- PASS. Phase 1 artifacts preserve in-memory-only policy and no third-party
  integrations.
- PASS. Admin-only enforcement is business-rule based (`actorUserId`) and does
  not require JWT.

## Project Structure

### Documentation (this feature)

```text
specs/001-provider-user-subscriptions/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── main.ts
├── app.module.ts
├── common/
│   ├── dto/
│   │   ├── pagination-query.dto.ts
│   │   └── api-response.dto.ts
│   └── in-memory/
│       └── in-memory-store.service.ts
├── company/
│   ├── company.module.ts
│   ├── company.controller.ts
│   ├── company.service.ts
│   └── dto/
│       ├── create-company.dto.ts
│       ├── update-company.dto.ts
│       └── company-response.dto.ts
├── user/
│   ├── user.module.ts
│   ├── user.controller.ts
│   ├── user.service.ts
│   └── dto/
│       ├── create-user.dto.ts
│       ├── update-user.dto.ts
│       └── user-response.dto.ts
└── subscription/
    ├── subscription.module.ts
    ├── subscription.controller.ts
    ├── subscription.service.ts
    └── dto/
        ├── buy-subscription.dto.ts
        ├── cancel-subscription.dto.ts
        └── subscription-response.dto.ts

test/
├── app.e2e-spec.ts
├── company.e2e-spec.ts
├── user.e2e-spec.ts
└── subscription.e2e-spec.ts
```

**Structure Decision**: Use a single NestJS backend project rooted in `src/`
with domain modules for `company`, `user`, and `subscription`, plus shared in-memory
store components in `src/common/`.

## Complexity Tracking

No constitution violations identified.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
