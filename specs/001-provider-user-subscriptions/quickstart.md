# Quickstart: Provider User Subscriptions (In-Memory)

## Goal
Run and manually verify company, user, and company-level subscription flows entirely in memory via Swagger UI.

## Prerequisites
- Node.js 18+
- npm

## Start the service
```bash
npm install
npm run start:dev
```

## Open API docs
- Swagger UI: `http://localhost:3000/api`

## Seed expectations
On startup, in-memory seed should include:
- At least 2 companies
- At least 4 users (including at least one admin per company)
- Plan catalog:
  - BASIC_MONTHLY = 250
  - BASIC_YEARLY = 2500
  - STANDARD_MONTHLY = 750
  - STANDARD_YEARLY = 7500
- At least one subscription sample

## Validation checklist in Swagger
1. Company CRUD
- Create a company
- Update it
- List companies with pagination (`page`, `limit`)
- Delete a company and verify related users/subscriptions are removed

2. User CRUD
- Create user with valid `companyId`
- Create user with invalid `companyId` and verify validation/business error
- Set `isAdmin` true for at least one user in a company
- List users with pagination and optional company filter

3. Subscription buy (company-level)
- Call `POST /subscriptions/{companyId}/buy` with:
  - valid `actorUserId` (admin of same company)
  - valid `planCode`
- Verify success with `GET /subscriptions/{companyId}`
- Attempt second buy while active subscription exists and verify rejection

4. Subscription cancel
- Call `POST /subscriptions/{companyId}/cancel` with valid admin `actorUserId`
- Verify status becomes canceled
- Attempt cancel again and verify business error

5. Admin enforcement without JWT
- Buy/cancel with non-admin `actorUserId` and verify rejection
- Buy/cancel with actor from another company and verify rejection
- Confirm no JWT token is required for endpoint access

## Non-goals
- No real database
- No Stripe or external billing
- No AWS or third-party integrations
- No JWT authentication layer

## Test execution
```bash
npm run test
npm run test:e2e
```

## Notes
- Data is ephemeral and resets on process restart.
- This feature is intentionally infrastructure-free and in-memory only.
