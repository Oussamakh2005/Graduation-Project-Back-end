# User Routes Documentation

This document provides detailed information about the user authentication and management API endpoints defined in `src/routes/userRoutes.ts`.

**Base Path:** `/` (Assuming these routes are mounted at the root, adjust if mounted under a prefix like `/api/users`)

**Common Middleware:**
*   **`errorHandler`**: Wraps all route handlers to provide consistent error handling. Catches errors, especially `HttpExeception`, and formats the error response.

---

## Route Details

### 1. User Signup

*   **Method:** `POST`
*   **Path:** `/signup`
*   **Controller:** `newUser`
*   **Middleware:** `errorHandler`
*   **Description:** Registers a new user. Validates input, checks for existing email, hashes the password, creates the user record in the database, and triggers sending a verification email.
*   **Request:**
    *   **Body:** User details (e.g., `{ email: "user@example.com", password: "password123", name: "Test User" }`)
*   **Success Response (Example):**
    *   `200 OK`: `{ ok: true, message: "User created successfully check your email..." }`
*   **Error Responses (Examples):**
    *   `422 Unprocessable Entity`: Invalid data provided (`HttpExeception`, `Exceptions.INVALID_DATA`)
    *   `403 Forbidden`: Email address already registered (`HttpExeception`, `Exceptions.ALREADY_EXIST`)
    *   `500 Internal Server Error`: Failed to send verification email (`HttpExeception`, `Exceptions.INTERNAL_ERROR`)

### 2. User Login

*   **Method:** `POST`
*   **Path:** `/login`
*   **Controller:** `login`
*   **Middleware:** `errorHandler`
*   **Description:** Authenticates an existing user. Verifies email and password against the database, checks if the user's account is verified (resending the verification email if not), and issues a JSON Web Token (JWT) upon successful authentication.
*   **Request:**
    *   **Body:** `{ email: "user@example.com", password: "password123" }`
*   **Success Response (Example):**
    *   `200 OK`: `{ ok: true, data: "<JWT_TOKEN>", role: "<USER_ROLE>" }`
*   **Error Responses (Examples):**
    *   `422 Unprocessable Entity`: Invalid email or password (`HttpExeception`, `Exceptions.INVALID_DATA`)
    *   `200 OK` (but indicates an issue): User exists but is not verified; verification email resent (`HttpExeception`, `Exceptions.OK` with specific message)
    *   `500 Internal Server Error`: User not verified and failed to resend verification email (`HttpExeception`, `Exceptions.INTERNAL_ERROR`)

### 3. Verify User Account

*   **Method:** `GET`
*   **Path:** `/verify`
*   **Controller:** `verifyUser`
*   **Middleware:** `errorHandler`
*   **Description:** Verifies a user's email address using a unique token typically sent via email after signup.
*   **Request:**
    *   **Query Parameter:** `?token=<VERIFICATION_TOKEN>`
*   **Success Response (Example):**
    *   `200 OK`: `{ ok: true, message: "User verified successfully" }`
*   **Error Responses (Examples):**
    *   `422 Unprocessable Entity`: Token is missing or invalid (`HttpExeception`, `Exceptions.INVALID_DATA`)

### 4. Check Authentication Status

*   **Method:** `GET`
*   **Path:** `/authenticated` (Note: Original code might have a typo: `/auhtenticated`)
*   **Controller:** `authenticated`
*   **Middleware:**
    *   `errorHandler`
    *   `isAuthenticated`: Checks for a valid JWT in the `Authorization` header. If valid, verifies the token, finds the user, and attaches `req.userId`. Throws 401 if invalid.
*   **Description:** Allows an authenticated user (identified by their JWT) to confirm their authenticated status.
*   **Request:**
    *   **Header:** `Authorization: Bearer <JWT_TOKEN>`
*   **Success Response (Example):**
    *   `200 OK`: `{ ok: true, message: "Authenticated" }`
*   **Error Responses (Examples):**
    *   `401 Unauthorized`: No token provided, token is invalid, or user associated with token not found (`HttpExeception`, `Exceptions.UNAUTHERIZED` via `isAuthenticated`)

### 5. Update User Role (Admin Only)

*   **Method:** `PATCH`
*   **Path:** `/role/:id`
*   **Controller:** `updateUserRole`
*   **Middleware:**
    *   `errorHandler`
    *   `isAdmin`: Checks for a valid JWT (like `isAuthenticated`) and *also* verifies that the user has the `ADMIN` role. Throws 401 if not an admin.
*   **Description:** Allows an administrator to update the role of another user, identified by their ID in the path.
*   **Request:**
    *   **Header:** `Authorization: Bearer <ADMIN_JWT_TOKEN>`
    *   **Path Parameter:** `:id` (The ID of the user whose role is being changed)
    *   **Body:** `{ role: "<NEW_ROLE>" }` (e.g., `{ "role": "ADMIN" }` or `{ "role": "USER" }`)
*   **Success Response (Example):**
    *   `200 OK`: `{ ok: true, message: "Role updated successfully" }`
*   **Error Responses (Examples):**
    *   `401 Unauthorized`: Requesting user is not an admin or token is invalid (`HttpExeception`, `Exceptions.UNAUTHERIZED` via `isAdmin`)
    *   `422 Unprocessable Entity`: Invalid role provided in the request body (`HttpExeception`, `Exceptions.INVALID_DATA`)
    *   `404 Not Found` (Implicit): The user specified by `:id` does not exist (This might manifest as a Prisma error caught by `errorHandler`, potentially resulting in a 500 or a more specific error if handled).

---

**Important Notes:**

*   JWTs are expected in the `Authorization: Bearer <TOKEN>` header format for protected routes (`/authenticated`, `/role/:id`).
*   Error responses generally follow the structure `{ ok: false, message: "Error description" }` with an appropriate HTTP status code, managed by the `HttpExeception` class and the `errorHandler` middleware.
*   Consider correcting the potential typo in the `/auhtenticated` path to `/authenticated` in the route definition for clarity and consistency.