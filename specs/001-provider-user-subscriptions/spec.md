# Feature Specification: Provider User Subscriptions

**Feature Branch**: `001-build-user-company-subscriptions`  
**Created**: 2026-05-01  
**Status**: Draft  
**Input**: User description: "Build three modules: User, Company (Provider), and Subscription. Use an in-memory database only. Do not connect to a real database or any third-party service."

## Clarifications

### Session 2026-05-01

- Q: What should happen when deleting a company that still has users? -> A: Cascade delete users in that company.
- Q: What should happen when a company already has an active subscription and a new purchase is requested? -> A: Reject new purchase while active subscription exists; subscriptions are company-level and only admin users can buy or cancel.
- Q: How should admin-only buy/cancel be enforced without authentication? -> A: Require actorUserId in buy/cancel requests and verify the actor is an admin user in the same company; no JWT required.
- Q: What does GET /subscriptions/{companyId} return when a company has had multiple subscriptions? -> A: Return only the single most-recent subscription record (latest by creation time), whether active or canceled.
- Q: What should the body of business-rule error responses look like? -> A: Use the NestJS default HttpException shape: `{ "statusCode": number, "message": string, "error": string }`.
- Q: Should company name and legalName be unique across all companies? -> A: Yes, both name and legalName must be unique across all companies in the in-memory store.
- Q: What REST path prefix should API endpoints be served under? -> A: No global prefix; endpoints are served at /companies, /users, and /subscriptions directly. Swagger UI is exposed at /api.
- Q: Should the service emit structured logs for key operations? -> A: No logging required; the service does not need to emit any structured or console logs.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Manage Companies and Users (Priority: P1)

An operator can create, read, update, and delete companies and users, with each
user assigned to exactly one company.

**Why this priority**: Subscription operations depend on having valid company and
user records first.

**Independent Test**: Can be fully tested by creating companies and users,
retrieving paginated lists, updating records, and verifying user-to-company
assignment rules.

**Acceptance Scenarios**:

1. **Given** no companies exist, **When** the operator creates a company,
   **Then** the company is returned with a generated id and saved in memory.
2. **Given** an existing company, **When** the operator creates a user with that
   company id, **Then** the user is saved and linked to that company.
3. **Given** an existing company with users, **When** the operator deletes that
  company, **Then** all users belonging to that company are also deleted.
4. **Given** existing companies and users, **When** the operator requests list
   endpoints with pagination parameters, **Then** paginated results and total
   metadata are returned.
5. **Given** a user update request with invalid input, **When** the operator
   submits the request, **Then** the system returns clear validation errors and
   does not mutate stored data.
6. **Given** a company create or update request with a `name` or `legalName`
   already in use, **When** the operator submits the request, **Then** the system
   rejects it with a conflict error and does not mutate stored data.

---

### User Story 2 - Purchase a Company Subscription (Priority: P2)

An admin user can purchase one of the predefined subscription plans for a company
and see the active company subscription details.

**Why this priority**: Purchasing is the core business action after user/company
data exists.

**Independent Test**: Can be fully tested by creating a company with an admin
user, purchasing each available plan, and validating that company subscription
details reflect the selected plan and status.

**Acceptance Scenarios**:

1. **Given** a valid company without an active subscription, **When** an admin
  user buys a predefined plan for that company, **Then** the system stores an active
   subscription with the correct plan name and price.
2. **Given** a purchase request with an unknown plan,
  **When** an admin user submits it, **Then** the request is rejected with a
   descriptive error.
3. **Given** a company with an active subscription, **When** a new purchase is
  requested for the same company, **Then** the request is rejected until the
  active subscription is canceled.
4. **Given** a buy request with `actorUserId` that is not an admin of the same
  company, **When** the request is submitted, **Then** the system rejects it.
5. **Given** a company with an active subscription, **When** the operator requests
  subscription details, **Then** the latest company subscription state is returned.

---

### User Story 3 - Cancel and Review Company Subscription State (Priority: P3)

An admin user can cancel a company subscription and review its post-cancellation
state.

**Why this priority**: Cancellation lifecycle support completes the subscription
management workflow.

**Independent Test**: Can be fully tested by purchasing a company subscription,
canceling it as an admin user, and verifying status transitions through the
details endpoint.

**Acceptance Scenarios**:

1. **Given** a company with an active subscription, **When** an admin user
  cancels it, **Then** the subscription status changes to canceled in memory.
2. **Given** a company without an active subscription, **When** an admin user
   attempts cancellation, **Then** the system returns an informative failure
   response.
3. **Given** a cancellation request with `actorUserId` that is not an admin of
  the same company, **When** the request is submitted, **Then** the system
  rejects it.
4. **Given** a canceled subscription, **When** the operator views details,
   **Then** the response includes the single most-recent subscription record with canceled status, plan name, price, and timestamps.

### Edge Cases

- Creating a user with a non-existent company id.
- Deleting a company with associated users must cascade-delete those users.
- Buying a plan for a non-existent company.
- Canceling a subscription that is already canceled.
- Non-admin user attempts to buy or cancel a company subscription.
- `actorUserId` belongs to another company.
- `actorUserId` does not exist.
- Pagination requests with invalid values (negative page, zero limit, very large
  limit).
- Application restart behavior where all in-memory state resets to seeded data.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide full CRUD operations for companies, including
  fields `id`, `name`, `legalName`, `websiteUrl`, and additional basic company
  details.
- **FR-001a**: System MUST enforce that `name` and `legalName` are each unique
  across all companies in the in-memory store; a create or update that would
  produce a duplicate `name` or `legalName` MUST be rejected with a conflict error.
- **FR-002**: System MUST provide full CRUD operations for users, including
  fields `id`, `name`, `email`, additional personal details, and `companyId`.
- **FR-003**: System MUST enforce that each user belongs to exactly one existing
  company.
- **FR-003a**: System MUST cascade-delete all users associated with a company when
  that company is deleted.
- **FR-004**: System MUST provide paginated list endpoints for modules that
  return collections.
- **FR-005**: System MUST support company-level subscription purchase using only
  predefined plans and prices:
  Basic Monthly (250), Basic Yearly (2500), Standard Monthly (750),
  Standard Yearly (7500).
- **FR-005a**: System MUST allow only admin users of a company to buy
  subscriptions for that company.
- **FR-005b**: System MUST reject a purchase request when the company already has
  an active subscription.
- **FR-005c**: System MUST require `actorUserId` in subscription purchase
  requests and validate that the actor exists, belongs to the target company,
  and has admin privileges.
- **FR-006**: System MUST support company-level subscription cancellation.
- **FR-006a**: System MUST allow only admin users of a company to cancel that
  company's subscription.
- **FR-006b**: System MUST require `actorUserId` in subscription cancellation
  requests and validate that the actor exists, belongs to the target company,
  and has admin privileges.
- **FR-007**: System MUST provide an endpoint to view subscription details for a
  company, returning the single most-recent subscription record (by creation time), whether active or canceled; multiple subscription records are not returned.
- **FR-008**: System MUST keep all data and transactions in memory and MUST NOT
  connect to any real database.
- **FR-009**: System MUST NOT call any third-party service for subscription,
  user, or company operations.
- **FR-010**: System MUST provide complete interactive API documentation for all
  request and response contracts. API endpoints MUST be served without a global
  path prefix (e.g., `/companies`, `/users`, `/subscriptions`); Swagger UI MUST
  be exposed at `/api`.
- **FR-011**: System MUST apply input validation to all create, update,
  purchase, cancel, and query inputs and return clear validation errors. All error responses (validation, business-rule, and not-found) MUST use the NestJS default `HttpException` body shape: `{ "statusCode": number, "message": string, "error": string }`.
- **FR-012**: System MUST initialize in-memory state with representative sample
  company, user, and subscription data at startup.
- **FR-013**: System MUST operate without authentication requirements for the
  defined endpoints.
- **FR-013a**: System MUST NOT require JWT tokens or external identity services;
  admin authorization for buy/cancel is determined from in-memory user role data.
- **FR-014**: System MUST NOT emit any structured or console logs; no logging
  infrastructure is required.

### Key Entities *(include if feature involves data)*

- **Company**: Represents a provider organization with key attributes such as id,
  name, legal identity, website, and profile details.
- **User**: Represents an individual account with id, personal details,
  contact details, role information including admin capability, and exactly one
  company association via `companyId`.
- **PlanCatalogEntry**: Represents predefined subscription offerings with immutable
  plan name, billing cadence, and price.
- **Subscription**: Represents a company's subscription lifecycle state including
  company linkage, selected plan, price, status (active/canceled), and
  timestamps. The detail endpoint returns only the single most-recent record per company.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of company and user CRUD endpoints are discoverable and
  executable through interactive API docs.
- **SC-002**: 95% of valid CRUD, purchase, cancel, and detail requests complete
  within 1 second in local execution.
- **SC-003**: 100% of invalid input scenarios for required fields and invalid relationships return descriptive validation errors using the `{ "statusCode", "message", "error" }` response shape.
- **SC-004**: 100% of company-level subscription purchase requests for valid
  predefined plans
  produce the expected plan and price in stored subscription details.
- **SC-005**: 100% of cancellation actions correctly transition active
  subscriptions to canceled and reflect that state on detail retrieval.
- **SC-006**: On service startup, sample in-memory data is present and usable for
  end-to-end testing in API docs without external setup.
- **SC-007**: 100% of buy/cancel attempts with invalid `actorUserId`,
  cross-company actor, or non-admin actor are rejected.

## Assumptions

- The feature is intended for local/demo and POC usage where in-memory data reset
  on restart is acceptable.
- A company has at most one current subscription record considered active at a
  time.
- Admin capability is represented in user data and enforced at request validation
  and business-rule level without introducing authentication.
- `actorUserId` is provided as an explicit input field for subscription buy/cancel
  operations.
- JWT and third-party identity integration are out of scope.
- Interactive API documentation is exposed in the running service and used as the
  primary manual testing interface.
- Monetary values are handled as fixed numeric values for this scope without
  external billing integration.
