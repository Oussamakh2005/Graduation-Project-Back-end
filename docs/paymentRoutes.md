
# Payment Routes API Documentation

## Overview
This document outlines the API endpoints related to processing payments for sales within the system. It covers making down payments for installment sales, retrieving the required down payment value, and processing full cash payments.

## Authentication & Authorization
- **`isPayment` Middleware:** Applied to routes requiring payment processing privileges. This middleware verifies the user's JWT token and ensures the user has the `PAYMENT` role (as seen in `src/middlewares/isPayment.ts`). An authorization token must be provided in the request headers.
- **`isAuthenticated` Middleware:** Applied to routes requiring general user authentication. This middleware verifies the user's JWT token (as seen in `src/middlewares/authenticated.ts`). An authorization token must be provided in the request headers.

## Error Handling
All routes utilize the `errorHandler` middleware (from `src/middlewares/errorHandler.ts`) to catch and format errors, ensuring consistent error responses. Common errors include `HttpExeception` for issues like `Unauthorized` (401), `Not Found` (404), `Invalid Data` (422), `Already Exists` (400), and `Internal Error` (500).

## Endpoints

### 1. Make Down Payment (Installment)
```
POST /downpayment/:saleId
```
**Authentication:** Requires `PAYMENT` role (`isPayment` middleware).
**Description:** Processes the initial down payment for a sale configured with the `INSTALLMENT` payment method. This endpoint creates the payment record, updates the sale status to `IN_PROGRESS`, generates an installment plan, schedules the individual installments, and sends a notification email to the user.
**URL Parameters:**
  - `saleId` (string): The unique identifier of the sale.
**Request Body:** (Based on `makeDownPayment` controller in Snippet 3, although validation is commented out, it expects `installmentsNumber`)
  ```json
  {
    "installmentsNumber": <number> // e.g., 12
  }
  ```
**Responses:**
  - `201 Created`: Down payment successful, installment plan created.
    ```json
    {
        "ok": true,
        "message": "Down payment of <calculated_value> is done successfully\nthe installment plan is create successfully\nthe installment is scheduled successfully"
    }
    ```
  - `400 Bad Request`: If the sale is not an installment sale (`NOT_OK`), or if the down payment is already done (`ALREADY_EXIST`).
  - `401 Unauthorized`: If the user lacks the `PAYMENT` role or provides an invalid token (`UNAUTHERIZED`).
  - `404 Not Found`: If the specified `saleId` does not exist (`NOT_FOUND`).
  - `422 Unprocessable Entity`: If the request body data is invalid (`INVALID_DATA`).
  - `500 Internal Server Error`: If an unexpected error occurs during the transaction (`INTERNAL_ERROR`).

### 2. Get Down Payment Value
```
GET /downpayment/value/:saleId
```
**Authentication:** Requires any authenticated user (`isAuthenticated` middleware).
**Description:** Retrieves the calculated down payment value (20% of the sale price) for a specific sale configured with the `INSTALLMENT` payment method.
**URL Parameters:**
  - `saleId` (string): The unique identifier of the sale.
**Responses:**
  - `200 OK`: Successfully retrieved the down payment value.
    ```json
    {
        "ok": true,
        "data": <calculated_down_payment_value> // e.g., 2000.00
    }
    ```
  - `401 Unauthorized`: If the user is not authenticated (`UNAUTHERIZED`).
  - `404 Not Found`: If a sale with the given `saleId` and `INSTALLMENT` payment method is not found (`NOT_FOUND`).
  - `500 Internal Server Error`: If an unexpected error occurs (`INTERNAL_ERROR`).

### 3. Make Full Payment (Cash)
```
POST /fullpayment/:saleId
```
**Authentication:** Requires `PAYMENT` role (`isPayment` middleware).
**Description:** Processes a full payment for a sale configured with the `CASH` payment method. This endpoint creates a single payment record for the full amount and updates the sale status to `COMPLETED`. It also sends a notification email to the user.
**URL Parameters:**
  - `saleId` (string): The unique identifier of the sale.
**Request Body:** (Based on `makeFullPayment` controller in Snippet 4, validation is commented out, so no body is strictly required by the current implementation shown).
**Responses:**
  - `200 OK`: Payment processed successfully.
    ```json
    {
        "ok": true,
        "message": "Payment done successfully"
    }
    ```
  - `400 Bad Request`: If the sale is not a cash sale (`NOT_OK`), or if the payment has already been completed (`ALREADY_EXIST`).
  - `401 Unauthorized`: If the user lacks the `PAYMENT` role or provides an invalid token (`UNAUTHERIZED`).
  - `404 Not Found`: If the specified `saleId` does not exist (`NOT_FOUND`).
  - `500 Internal Server Error`: If an unexpected error occurs during the transaction (`INTERNAL_ERROR`).
