# Tasks: Provider User Subscriptions

**Input**: Design documents from `/specs/001-provider-user-subscriptions/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/

**Tests**: No automated test tasks are included in this plan per request.

**Organization**: Tasks are grouped by user story to enable independent implementation and validation.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Every task includes an exact file path

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize NestJS app wiring and shared building blocks used across modules.

- [ ] T001 Enable global validation and OpenAPI bootstrap in src/main.ts
- [ ] T002 Register domain modules and shared providers in src/app.module.ts
- [ ] T003 [P] Create paginated query DTO in src/common/dto/pagination-query.dto.ts
- [ ] T004 [P] Create common API response/pagination DTOs in src/common/dto/api-response.dto.ts
- [ ] T005 Create in-memory seeded store service skeleton in src/common/in-memory/in-memory-store.service.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Implement core domain types, constants, and cross-module utility logic required by all user stories.

**CRITICAL**: Complete this phase before implementing user-story endpoints.

- [ ] T006 Define shared domain interfaces for Company/User/Subscription in src/common/in-memory/domain.types.ts
- [ ] T007 Define predefined plan catalog constants and helpers in src/subscription/plan-catalog.ts
- [ ] T008 Implement deterministic ID/timestamp utility functions in src/common/in-memory/store-utils.ts
- [ ] T009 Implement seed-data factory for companies, users, and subscriptions in src/common/in-memory/seed-data.ts
- [ ] T010 Wire seed/reset behavior and CRUD helpers in src/common/in-memory/in-memory-store.service.ts
- [ ] T011 [P] Create reusable pagination helper for list endpoints in src/common/in-memory/pagination.ts
- [ ] T012 [P] Create common not-found/conflict/forbidden guard helpers in src/common/errors/domain-errors.ts

**Checkpoint**: Foundation complete; user stories can proceed.

---

## Phase 3: User Story 1 - Manage Companies and Users (Priority: P1) MVP

**Goal**: Provide full in-memory CRUD for companies and users with pagination and company-user integrity rules including cascade delete.

**Independent Test**: Use Swagger to create/update/list/delete companies and users; verify company assignment validation and user cascade deletion when deleting a company.

### Implementation for User Story 1

- [ ] T013 [P] [US1] Create company create/update DTOs with validation in src/company/dto/create-company.dto.ts
- [ ] T014 [P] [US1] Create company update/response DTOs in src/company/dto/update-company.dto.ts
- [ ] T015 [P] [US1] Create user create/update DTOs with validation in src/user/dto/create-user.dto.ts
- [ ] T016 [P] [US1] Create user update/response DTOs in src/user/dto/update-user.dto.ts
- [ ] T017 [US1] Implement company business logic with pagination and cascade delete in src/company/company.service.ts
- [ ] T018 [US1] Implement user business logic with company existence and uniqueness checks in src/user/user.service.ts
- [ ] T019 [US1] Implement company CRUD controller endpoints and Swagger decorators in src/company/company.controller.ts
- [ ] T020 [US1] Implement user CRUD controller endpoints and Swagger decorators in src/user/user.controller.ts
- [ ] T021 [US1] Define and export company module wiring in src/company/company.module.ts
- [ ] T022 [US1] Define and export user module wiring in src/user/user.module.ts
- [ ] T023 [US1] Register company and user modules in root module imports in src/app.module.ts

**Checkpoint**: User Story 1 is fully functional and independently verifiable.

---

## Phase 4: User Story 2 - Purchase a Company Subscription (Priority: P2)

**Goal**: Allow only admin users to buy predefined subscription plans for their own company and view latest subscription details.

**Independent Test**: Use Swagger to buy valid plans as same-company admins, retrieve company subscription details, and verify rejection for unknown plan, non-admin, cross-company actor, missing actor, or already-active subscription.

### Implementation for User Story 2

- [ ] T024 [P] [US2] Create buy-subscription DTO with actor and plan validation in src/subscription/dto/buy-subscription.dto.ts
- [ ] T025 [P] [US2] Create subscription response DTO for detail/purchase responses in src/subscription/dto/subscription-response.dto.ts
- [ ] T026 [US2] Implement subscription purchase and detail business rules in src/subscription/subscription.service.ts
- [ ] T027 [US2] Implement subscription get/buy controller routes with Swagger docs in src/subscription/subscription.controller.ts
- [ ] T028 [US2] Define and export subscription module wiring in src/subscription/subscription.module.ts
- [ ] T029 [US2] Register subscription module in root module imports in src/app.module.ts

**Checkpoint**: User Stories 1 and 2 both work independently and together.

---

## Phase 5: User Story 3 - Cancel and Review Company Subscription State (Priority: P3)

**Goal**: Allow only admin users to cancel active company subscriptions and review canceled state/history.

**Independent Test**: Use Swagger to cancel active subscription as same-company admin, verify status transition, and validate failure on no-active-subscription, non-admin, cross-company actor, and invalid actor.

### Implementation for User Story 3

- [ ] T030 [P] [US3] Create cancel-subscription DTO with actor validation in src/subscription/dto/cancel-subscription.dto.ts
- [ ] T031 [US3] Extend subscription service with cancellation lifecycle and history shaping in src/subscription/subscription.service.ts
- [ ] T032 [US3] Add cancel endpoint and response contracts in src/subscription/subscription.controller.ts
- [ ] T033 [US3] Refine subscription response DTO to include canceled metadata/history in src/subscription/dto/subscription-response.dto.ts

**Checkpoint**: All user stories are independently functional and meet lifecycle requirements.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final documentation, hardening, and manual flow validation updates.

- [ ] T034 [P] Add README API usage section for company, user, and subscription workflows in README.md
- [ ] T035 [P] Align quickstart execution notes with final endpoint behavior in specs/001-provider-user-subscriptions/quickstart.md
- [ ] T036 Harden Swagger schema annotations and examples across DTOs/controllers in src/company/company.controller.ts
- [ ] T037 [P] Run manual quickstart checklist and record completion notes in specs/001-provider-user-subscriptions/checklists/requirements.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies.
- **Phase 2 (Foundational)**: Depends on Phase 1 and blocks all user stories.
- **Phase 3 (US1)**: Depends on Phase 2 completion.
- **Phase 4 (US2)**: Depends on Phase 2 and on US1 data/domain behavior.
- **Phase 5 (US3)**: Depends on US2 purchase flow existing.
- **Phase 6 (Polish)**: Depends on completion of desired user stories.

### User Story Dependencies

- **US1 (P1)**: First deliverable and MVP baseline.
- **US2 (P2)**: Requires companies/users and role/company checks from US1.
- **US3 (P3)**: Requires purchase lifecycle from US2.

### Within Each User Story

- DTOs before service logic.
- Service logic before controller routes.
- Module wiring and root registration after implementation.

### Parallel Opportunities

- Setup tasks `T003-T004` can run together.
- Foundational tasks `T011-T012` can run together after store primitives exist.
- US1 DTO tasks `T013-T016` can run together.
- US2 DTO tasks `T024-T025` can run together.
- Polish tasks `T034-T035` can run together.

---

## Parallel Example: User Story 1

```bash
# Run DTO work in parallel:
Task: "T013 Create company create/update DTOs with validation in src/company/dto/create-company.dto.ts"
Task: "T014 Create company update/response DTOs in src/company/dto/update-company.dto.ts"
Task: "T015 Create user create/update DTOs with validation in src/user/dto/create-user.dto.ts"
Task: "T016 Create user update/response DTOs in src/user/dto/update-user.dto.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 (Setup).
2. Complete Phase 2 (Foundational).
3. Complete Phase 3 (US1).
4. Validate US1 in Swagger before proceeding.

### Incremental Delivery

1. Deliver US1 CRUD baseline.
2. Add US2 purchase flow and validate business-rule rejections.
3. Add US3 cancellation lifecycle and detail/history behavior.
4. Finish polish/doc updates.

### Parallel Team Strategy

1. Team completes Setup + Foundational together.
2. One developer leads US1 services/controllers while another prepares US2 DTO/contracts.
3. After US2 merges, implement US3 cancellation logic and polish tasks.

---

## Notes

- All tasks follow required checklist format: `- [ ] Txxx [P?] [US?] Description with file path`.
- No automated test tasks or test-file creation tasks are included.
- Keep data in process memory only; do not add database or third-party integrations.
