
# Car Routes API Documentation

## Overview
This document describes the API endpoints for managing car data, including creation, retrieval, updates, and deletion. These routes are defined in `src/routes/carRoutes.ts`.

## Middleware

*   **`errorHandler`**: All route handlers are wrapped with this middleware to ensure consistent error handling and responses. It catches errors from the controllers and formats them appropriately, often using `HttpExeception`.
*   **`isAdmin`**: This middleware protects specific routes, ensuring that only users with administrative privileges can access them. It likely verifies a JWT token and checks the user's role.
*   **`upload` (Multer)**: Used specifically on the image upload route (`PUT /images/:id`) to handle `multipart/form-data` requests. It's configured to accept specific fields (`images`, `main`) with limits on the number of files.

## Endpoints

### Car Creation (Multi-Step Process)

This process involves several sequential steps to add a new car. All creation steps require **Admin** privileges.

1.  **Initialize Car Record**
    *   **Route:** `POST /init`
    *   **Middleware:** `errorHandler(isAdmin)`, `errorHandler(initializeCar)`
    *   **Description:** Creates the initial database entry for a new car with basic details (e.g., model, price).
    *   **Controller:** `initializeCar`

2.  **Set Engine Details**
    *   **Route:** `POST /engine`
    *   **Middleware:** `errorHandler(isAdmin)`, `errorHandler(setEngine)`
    *   **Description:** Adds engine specifications (type, capacity, horsepower) to the system, likely associated with the most recently initialized car or requiring a car ID in the body (check controller implementation).
    *   **Controller:** `setEngine`

3.  **Set Car Features**
    *   **Route:** `PUT /feature/:id`
    *   **Middleware:** `errorHandler(isAdmin)`, `errorHandler(setCarFeatures)`
    *   **Description:** Updates a specific car record with additional features. Requires the Car ID in the URL path.
    *   **URL Parameters:** `id` (Car ID)
    *   **Controller:** `setCarFeatures`

4.  **Upload Car Images**
    *   **Route:** `PUT /images/:id`
    *   **Middleware:** `upload.fields(...)`, `errorHandler(isAdmin)`, `errorHandler(uploadCarImages)`
    *   **Description:** Uploads the main image and additional gallery images for a specific car. Sets the car's `availability` and `infoComplete` flags to true upon successful upload. Requires the Car ID in the URL path. Handles multipart form data with fields "main" (max 1 file) and "images" (max 4 files).
    *   **URL Parameters:** `id` (Car ID)
    *   **Controller:** `uploadCarImages`

### Car Retrieval

1.  **Get All Available Cars (Paginated)**
    *   **Route:** `GET /all`
    *   **Middleware:** `errorHandler(getCarsList)`
    *   **Description:** Retrieves a paginated list of cars marked as available (`availability: true`). Publicly accessible. Supports pagination via query parameters (e.g., `?skip=1`).
    *   **Controller:** `getCarsList`

2.  **Get Cars with Incomplete Info**
    *   **Route:** `GET /incompleted`
    *   **Middleware:** `errorHandler(isAdmin)`, `errorHandler(getIncompletedInfoCars)`
    *   **Description:** Retrieves a list of cars that are marked as having incomplete information (`infoComplete: false`). Requires **Admin** privileges.
    *   **Controller:** `getIncompletedInfoCars`

3.  **Get Specific Car Details**
    *   **Route:** `GET /:id`
    *   **Middleware:** `errorHandler(getCar)`
    *   **Description:** Retrieves detailed information for a single car, including associated engine details. Publicly accessible. Requires the Car ID in the URL path.
    *   **URL Parameters:** `id` (Car ID)
    *   **Controller:** `getCar`

### Car Updates

1.  **Update Car Details**
    *   **Route:** `PUT /:id`
    *   **Middleware:** `errorHandler(isAdmin)`, `errorHandler(updateCar)`
    *   **Description:** Updates general information for a specific car. Requires **Admin** privileges and the Car ID in the URL path.
    *   **URL Parameters:** `id` (Car ID)
    *   **Controller:** `updateCar`

2.  **Update Engine Details**
    *   **Route:** `PUT /engine/:id`
    *   **Middleware:** `errorHandler(isAdmin)`, `errorHandler(updateEngine)`
    *   **Description:** Updates information for a specific engine. Requires **Admin** privileges and the Engine ID in the URL path.
    *   **URL Parameters:** `id` (Engine ID)
    *   **Controller:** `updateEngine`

### Car Deletion

1.  **Delete Car**
    *   **Route:** `DELETE /:id`
    *   **Middleware:** `errorHandler(isAdmin)`, `errorHandler(deleteCar)`
    *   **Description:** Deletes a specific car and its associated engine data. Requires **Admin** privileges and the Car ID in the URL path.
    *   **URL Parameters:** `id` (Car ID)
    *   **Controller:** `deleteCar`