# User API Module

## Overview

The User API module lets you manage users in the system. You can list users, get a user profile, create, update, and delete users.

- **Base URL:** `http://localhost:3001`
- **Swagger UI:** [http://localhost:3001/api](http://localhost:3001/api)
- **Authentication:** Not required

All user endpoints are under `/users`.

---

## Endpoints

### 1. List Users

- **Method:** GET
- **Path:** `/users`
- **Query Parameters:**
  - `page` (number, default: 1) — page number
  - `limit` (number, default: 10) — results per page
  - `companyId` (string, optional) — filter users by company

**Example Request:**
```
GET /users?page=1&limit=10
```

**Example Response (200):**
```json
{
  "data": [
    {
      "id": "u1000000-0000-0000-0000-000000000001",
      "companyId": "c1000000-0000-0000-0000-000000000001",
      "name": "Alice Admin",
      "email": "alice@acme.example.com",
      "isAdmin": true,
      "phone": "+1-555-101-0001",
      "title": "CEO",
      "createdAt": "2026-05-01T00:00:00.000Z",
      "updatedAt": "2026-05-01T00:00:00.000Z"
    }
  ],
  "total": 4,
  "page": 1,
  "limit": 10
}
```

---

### 2. Get User Profile

Returns the full profile of a single user. Use this endpoint to look up a user's name, email, role, and company.

- **Method:** GET
- **Path:** `/users/:userId`
- **Path Parameter:**
  - `userId` (string, UUID) — the user's unique ID

**Example Request:**
```
GET /users/u1000000-0000-0000-0000-000000000001
```

**Example Response (200):**
```json
{
  "id": "u1000000-0000-0000-0000-000000000001",
  "companyId": "c1000000-0000-0000-0000-000000000001",
  "name": "Alice Admin",
  "email": "alice@acme.example.com",
  "isAdmin": true,
  "phone": "+1-555-101-0001",
  "title": "CEO",
  "createdAt": "2026-05-01T00:00:00.000Z",
  "updatedAt": "2026-05-01T00:00:00.000Z"
}
```

**Response (404) — User not found:**
```json
{
  "statusCode": 404,
  "message": "User not found",
  "error": "Not Found"
}
```

---

### 3. Create User

- **Method:** POST
- **Path:** `/users`
- **Request Body:**

```json
{
  "companyId": "c1000000-0000-0000-0000-000000000001",
  "name": "Alice Admin",
  "email": "alice@acme.example.com",
  "isAdmin": true,
  "phone": "+1-555-101-0001",
  "title": "CEO"
}
```

- `companyId` (string, required) — company ID
- `name` (string, required) — full name
- `email` (string, required) — must be unique and valid
- `isAdmin` (boolean, required) — admin flag
- `phone` (string, optional)
- `title` (string, optional)

**Example Response (201):**
Returns the created user object (see Get User response).

**Validation error (400):**
```json
{
  "statusCode": 400,
  "message": ["email must be an email"],
  "error": "Bad Request"
}
```

**Email already in use (409):**
```json
{
  "statusCode": 409,
  "message": "Email already in use",
  "error": "Conflict"
}
```

---

### 4. Update User

- **Method:** PATCH
- **Path:** `/users/:userId`
- **Path Parameter:** `userId` (string, UUID)
- **Request Body:** (all fields optional)

```json
{
  "name": "Alice Smith",
  "email": "alice.smith@acme.example.com",
  "isAdmin": false,
  "phone": "+1-555-101-9999",
  "title": "CTO"
}
```

**Example Response (200):**
Returns the updated user object.

**Validation error (400), user not found (404), or email conflict (409)**

---

### 5. Delete User

- **Method:** DELETE
- **Path:** `/users/:userId`
- **Path Parameter:** `userId` (string, UUID)

**Example Response (204):**
No content (user deleted successfully).

**Response (404) — User not found:**
```json
{
  "statusCode": 404,
  "message": "User not found",
  "error": "Not Found"
}
```

---

## User Object Fields

| Field       | Type           | Required (create) | Description                  |
|-------------|----------------|-------------------|------------------------------|
| `id`        | string (UUID)  | —                 | Auto-generated user ID       |
| `companyId` | string (UUID)  | yes               | Company this user belongs to |
| `name`      | string         | yes               | Full name of the user        |
| `email`     | string         | yes               | Unique email address         |
| `isAdmin`   | boolean        | yes               | Admin role flag              |
| `phone`     | string         | no                | Optional phone number        |
| `title`     | string         | no                | Optional job title           |
| `createdAt` | string (ISO)   | —                 | Creation timestamp           |
| `updatedAt` | string (ISO)   | —                 | Last update timestamp        |

---

## Seed Data

On startup, these users are available for testing:

| ID (prefix) | Name         | Email                   | Company    | Admin |
|-------------|--------------|-------------------------|------------|-------|
| u1000000…   | Alice Admin  | alice@acme.example.com  | Acme Corp  | Yes   |
| u2000000…   | Bob User     | bob@acme.example.com    | Acme Corp  | No    |
| u3000000…   | Carol Admin  | carol@globex.example.com| Globex Inc | Yes   |
| u4000000…   | Dave User    | dave@globex.example.com | Globex Inc | No    |

---

## Error Responses

All errors follow the same shape:

```json
{
  "statusCode": 404,
  "message": "...",
  "error": "Not Found"
}
```

| Status | Meaning |
|--------|---------|
| 400 | Bad Request — invalid input or company not found |
| 404 | Not Found — user does not exist |
| 409 | Conflict — email is already used by another user |

---

## Notes

- All data is in-memory and resets when the server restarts.
- No authentication is required — all endpoints are open.
- For an interactive reference, visit the Swagger UI at `http://localhost:3001/api`.
