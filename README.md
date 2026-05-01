# Provider User Subscriptions

NestJS in-memory API for Company, User, and company-level Subscription management.  
No database, no third-party integrations — fully self-contained POC.

## Quick start

```bash
npm install
npm run start:dev
```

Swagger UI: **http://localhost:3000/api**

## Seed data

On startup the service seeds two companies, four users, and two sample subscriptions:

| Resource | Id prefix | Details |
|----------|-----------|---------|
| Acme Corp | `c1000000…` | Active Standard Monthly subscription |
| Globex Inc | `c2000000…` | Canceled Basic Yearly subscription |
| Alice Admin | `u1000000…` | Admin of Acme Corp |
| Bob User | `u2000000…` | Member of Acme Corp |
| Carol Admin | `u3000000…` | Admin of Globex Inc |
| Dave User | `u4000000…` | Member of Globex Inc |

## Endpoints

### Companies — `/companies`

| Method | Path | Description |
|--------|------|-------------|
| GET | /companies | List (paginated) |
| POST | /companies | Create |
| GET | /companies/:companyId | Get by id |
| PATCH | /companies/:companyId | Update |
| DELETE | /companies/:companyId | Delete (cascades users + subscriptions) |

### Users — `/users`

| Method | Path | Description |
|--------|------|-------------|
| GET | /users | List (paginated, optional `?companyId=`) |
| POST | /users | Create |
| GET | /users/:userId | Get by id |
| PATCH | /users/:userId | Update |
| DELETE | /users/:userId | Delete |

### Subscriptions — `/subscriptions`

| Method | Path | Description |
|--------|------|-------------|
| GET | /subscriptions/:companyId | Latest subscription for company |
| POST | /subscriptions/:companyId/buy | Buy plan (admin-only via `actorUserId`) |
| POST | /subscriptions/:companyId/cancel | Cancel active subscription (admin-only) |

## Plan catalog

| Code | Display name | Price |
|------|-------------|-------|
| BASIC_MONTHLY | Basic Monthly | 250 |
| BASIC_YEARLY | Basic Yearly | 2500 |
| STANDARD_MONTHLY | Standard Monthly | 750 |
| STANDARD_YEARLY | Standard Yearly | 7500 |

## Buy a subscription (example)

```json
POST /subscriptions/c1000000-0000-0000-0000-000000000001/buy
{
  "actorUserId": "u1000000-0000-0000-0000-000000000001",
  "planCode": "BASIC_MONTHLY"
}
```

> The actor must be an admin user of the same company.  
> Only one active subscription per company is allowed at a time.

## Cancel a subscription (example)

```json
POST /subscriptions/c1000000-0000-0000-0000-000000000001/cancel
{
  "actorUserId": "u1000000-0000-0000-0000-000000000001"
}
```

## Error responses

All errors follow the NestJS default shape:

```json
{ "statusCode": 409, "message": "...", "error": "Conflict" }
```

## Notes

- All data is in-process memory and resets on restart.
- No authentication — admin authorization is enforced via `actorUserId` and in-memory role data.
- Company `name` and `legalName` must each be unique.
- User `email` must be unique.

</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

This project is configured as a complete NestJS service that uses in-memory data
storage only. No real database connection is used in this repository.

Project governance and implementation rules are defined in
`.specify/memory/constitution.md`.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
