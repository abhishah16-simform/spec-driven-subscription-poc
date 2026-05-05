# Data Model: Provider User Subscriptions

## Entity: Company
- Purpose: Provider organization that owns users and company-level subscription.
- Fields:
  - `id` (string, required, unique)
  - `name` (string, required, min length 2)
  - `legalName` (string, required)
  - `websiteUrl` (string, optional, valid URL when present)
  - `email` (string, optional, valid email when present)
  - `phone` (string, optional)
  - `address` (string, optional)
  - `createdAt` (ISO datetime string)
  - `updatedAt` (ISO datetime string)
- Relationships:
  - One-to-many with `User` via `companyId`.
  - One-to-zero-or-one active `Subscription` at a time.
- Validation rules:
  - `name` and `legalName` cannot be blank.
  - `websiteUrl` must be URL if provided.
- State transitions:
  - On delete: cascade-delete associated users and company subscriptions.

## Entity: User
- Purpose: Company member used for admin checks and company ownership context.
- Fields:
  - `id` (string, required, unique)
  - `companyId` (string, required, references Company)
  - `name` (string, required)
  - `email` (string, required, unique within in-memory store)
  - `isAdmin` (boolean, required)
  - `phone` (string, optional)
  - `title` (string, optional)
  - `createdAt` (ISO datetime string)
  - `updatedAt` (ISO datetime string)
- Relationships:
  - Belongs to one `Company`.
- Validation rules:
  - `companyId` must reference existing company.
  - `email` must be valid format.
- State transitions:
  - Delete via user CRUD.
  - Delete via company cascade.

## Entity: PlanCatalogEntry
- Purpose: Immutable in-memory lookup for allowed plans and prices.
- Fields:
  - `code` (enum string: BASIC_MONTHLY, BASIC_YEARLY, STANDARD_MONTHLY, STANDARD_YEARLY)
  - `displayName` (string)
  - `billingCycle` (enum string: MONTHLY, YEARLY)
  - `price` (number)
- Validation rules:
  - Purchases must reference a valid plan code.

## Entity: Subscription
- Purpose: Company-level subscription lifecycle record.
- Fields:
  - `id` (string, required, unique)
  - `companyId` (string, required, references Company)
  - `planCode` (enum, required)
  - `planName` (string, denormalized from catalog)
  - `price` (number, denormalized from catalog)
  - `status` (enum string: ACTIVE, CANCELED)
  - `startedAt` (ISO datetime string)
  - `canceledAt` (ISO datetime string, nullable)
  - `createdByUserId` (string, required)
  - `canceledByUserId` (string, nullable)
- Relationships:
  - Belongs to one `Company`.
  - Actor linkage to `User` for buy/cancel actions.
- Validation rules:
  - Buy/cancel requires `actorUserId` that exists, belongs to same company, and has `isAdmin=true`.
  - Buy is rejected if company already has active subscription.
  - Cancel is rejected if no active subscription exists.
- State transitions:
  - `NONE -> ACTIVE` on successful buy.
  - `ACTIVE -> CANCELED` on successful cancel.
  - `CANCELED -> ACTIVE` allowed by creating a new subscription record via a new buy.

## Cross-Entity Business Rules
- Exactly one active subscription per company at any time.
- Company deletion cascades user and subscription records.
- All data remains in process memory and resets on application restart.
- Seed data includes at least:
  - 2 companies
  - 4 users (at least 1 admin per company)
  - plan catalog entries
  - at least 1 active and 1 canceled subscription sample across companies
