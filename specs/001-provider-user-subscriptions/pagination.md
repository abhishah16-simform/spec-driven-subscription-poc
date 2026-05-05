# Pagination

## Overview

All list endpoints in this API return paginated results. Pagination lets you
retrieve a large collection in smaller, manageable pages. You control which page
you want and how many items appear on each page using query parameters.

---

## Query Parameters

| Parameter | Type    | Default | Min | Max | Description                     |
|-----------|---------|---------|-----|-----|---------------------------------|
| `page`    | integer | `1`     | `1` | —   | Page number to fetch (1-based)  |
| `limit`   | integer | `10`    | `1` | `100` | Number of items per page      |

If you omit `page` or `limit`, the API applies the defaults (`page=1`,
`limit=10`) automatically.

---

## Response Structure

Every paginated response contains two top-level fields:

```json
{
  "data": [ /* array of items for the current page */ ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 12,
    "totalPages": 2
  }
}
```

| `meta` field | Description                                       |
|--------------|---------------------------------------------------|
| `page`       | The current page number                           |
| `limit`      | The number of items requested per page            |
| `total`      | Total number of items across all pages            |
| `totalPages` | Total number of pages (`ceil(total / limit)`)     |

---

## Paginated Endpoints

### List Companies

```
GET /companies
```

**Query parameters:** `page`, `limit`

**Example — first page with defaults:**

```
GET /companies
```

```json
{
  "data": [
    { "id": "c1000000-0000-0000-0000-000000000001", "name": "Acme Corp", ... },
    { "id": "c2000000-0000-0000-0000-000000000002", "name": "Globex Inc", ... },
    ...
  ],
  "meta": { "page": 1, "limit": 10, "total": 12, "totalPages": 2 }
}
```

**Example — second page with a custom limit:**

```
GET /companies?page=2&limit=5
```

```json
{
  "data": [
    { "id": "c6000000-0000-0000-0000-000000000006", "name": "Wayne Enterprises", ... },
    ...
  ],
  "meta": { "page": 2, "limit": 5, "total": 12, "totalPages": 3 }
}
```

---

### List Users

```
GET /users
```

**Query parameters:** `page`, `limit`, `companyId` *(optional filter)*

**Example — all users, page 2:**

```
GET /users?page=2&limit=10
```

```json
{
  "data": [
    { "id": "u11000000-...", "name": "Karen Admin", "companyId": "c6...", ... },
    ...
  ],
  "meta": { "page": 2, "limit": 10, "total": 24, "totalPages": 3 }
}
```

**Example — users filtered by company:**

```
GET /users?companyId=c1000000-0000-0000-0000-000000000001&page=1&limit=10
```

```json
{
  "data": [
    { "id": "u1000000-...", "name": "Alice Admin", ... },
    { "id": "u2000000-...", "name": "Bob User", ... }
  ],
  "meta": { "page": 1, "limit": 10, "total": 2, "totalPages": 1 }
}
```

---

## Navigating Multiple Pages

Use `meta.totalPages` to know how many pages exist, then increment `page` to
fetch subsequent pages:

```
GET /companies?page=1&limit=5   # items 1-5
GET /companies?page=2&limit=5   # items 6-10
GET /companies?page=3&limit=5   # items 11-12 (last, partial page)
```

When `page` exceeds `totalPages`, the `data` array is empty but `meta.total`
and `meta.totalPages` still reflect the true collection size.

---

## Bug Fix: `transform: true` in ValidationPipe

**Symptom (before fix):** Calling any list endpoint *without* explicit `page` or
`limit` query parameters returned an empty `data` array, even though data
existed in the store.

**Root cause:** The NestJS `ValidationPipe` was configured without
`transform: true`:

```ts
// Before — missing transform: true
app.useGlobalPipes(
  new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
);
```

Without `transform: true`, the pipe validates the incoming request but returns
the **raw query-string object** to the controller, rather than the typed DTO
class instance. Because the raw object has no default values, `query.page` and
`query.limit` were both `undefined` when the parameters were omitted. The
`paginate()` utility then computed `(undefined - 1) * undefined = NaN`, and
`Array.prototype.slice(NaN, NaN)` returns `[]`.

**Fix:**

```ts
// After — transform: true ensures the controller receives the class instance
// with default values (page=1, limit=10) applied
app.useGlobalPipes(
  new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
);
```

With `transform: true`, the controller always receives a proper `PaginationQueryDto`
instance carrying the declared defaults, and pagination works correctly for all
combinations of supplied and omitted parameters.
