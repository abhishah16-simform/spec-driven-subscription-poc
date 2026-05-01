# Research: Provider User Subscriptions

## Decision 1: Persistence strategy remains strictly in-memory
- Decision: Use process-local in-memory repositories (maps/arrays) for all entities and lifecycle operations.
- Rationale: Meets constitution non-negotiable requirement and user request for no real DB or external infrastructure.
- Alternatives considered:
  - SQLite/PostgreSQL: Rejected due to explicit no-database constraint.
  - Redis/in-memory external service: Rejected as third-party dependency.

## Decision 2: Admin-only enforcement without authentication
- Decision: Enforce subscription buy/cancel authorization via `actorUserId` request field and in-memory role/company checks.
- Rationale: Supports admin-only business rule while preserving requirement that no JWT/auth integration is required.
- Alternatives considered:
  - JWT claims-based roles: Rejected because authentication is out of scope.
  - Trusting header flags (e.g., `x-is-admin`): Rejected as non-deterministic and unsafe.

## Decision 3: Company-level subscription lifecycle model
- Decision: Maintain one active subscription maximum per company and reject new purchase while active exists.
- Rationale: Directly matches clarified requirement and simplifies lifecycle consistency.
- Alternatives considered:
  - Auto-replace active subscription: Rejected due to explicit clarified behavior.
  - Multiple active subscriptions per company: Rejected because it complicates billing semantics for this POC.

## Decision 4: API documentation and validation strategy
- Decision: Use Nest Swagger decorators for controllers/DTOs and class-validator/class-transformer for request validation.
- Rationale: Produces fully testable Swagger UI and consistent contract-level validation.
- Alternatives considered:
  - Manual OpenAPI JSON maintenance: Rejected due to drift risk.
  - Minimal validation only in services: Rejected since boundary validation is constitution requirement.

## Decision 5: Seed and reset behavior
- Decision: Seed sample companies, users (including admin users), and sample subscription entries at startup; provide deterministic reset utility for tests.
- Rationale: Ensures immediate usability in Swagger and reliable test reproducibility.
- Alternatives considered:
  - Randomized seed data: Rejected due to unstable tests.
  - No seed data: Rejected because it adds manual setup friction.

## Decision 6: Pagination model
- Decision: Standard query parameters `page` and `limit` with total count and metadata in list responses.
- Rationale: Matches feature requirement and keeps list behavior uniform across company/user resources.
- Alternatives considered:
  - Cursor pagination: Rejected as unnecessary complexity for a POC.
  - Unpaginated lists: Rejected because pagination is explicit requirement.
