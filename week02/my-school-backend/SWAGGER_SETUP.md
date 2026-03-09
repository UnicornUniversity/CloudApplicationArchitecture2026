# Swagger API Documentation Setup

## Overview
Swagger support has been added to the My School Backend API. The Swagger UI provides an interactive documentation interface for all API endpoints.

## Accessing Swagger UI
Once the server is running, access the Swagger documentation at:
```
http://localhost:3001/api-docs
```

## Features Added

### Packages Installed
- **swagger-ui-express** (v5.0.0) - Provides the interactive Swagger UI interface
- **swagger-jsdoc** (v6.2.8) - Extracts Swagger/OpenAPI documentation from JSDoc comments in code

### Configuration
- **swagger.js** - Central configuration file that:
  - Scans all route files for JSDoc comments
  - Builds the OpenAPI 3.0.0 specification
  - Defines API info and server details

### Documented Endpoints

#### Classes
- `GET /classes/list` - Get all classes

#### Students
- `GET /students/classes/{id}` - Get all students in a class
- `GET /students/get/{id}` - Get a specific student
- `GET /students/grades/{id}` - Get all grades for a student

#### Subjects
- `GET /subjects/list` - Get all subjects

#### Grades
- `POST /grades/add` - Add a new grade (with request body schema)

## How It Works

1. Each route file contains JSDoc comments with Swagger/OpenAPI specifications
2. The `swagger.js` file uses `swagger-jsdoc` to parse these comments
3. `server.js` sets up the Swagger UI endpoint at `/api-docs`
4. The interactive UI allows you to:
   - View all endpoints
   - See request/response schemas
   - Test endpoints directly from the browser

## Running the Server

```bash
npm start
```

Then navigate to:
```
http://localhost:3001/api-docs
```

## Adding More Documentation

To document new endpoints, add JSDoc comments above your route handlers following the existing pattern:

```javascript
/**
 * @swagger
 * /path/to/endpoint:
 *   get:
 *     summary: Brief description
 *     description: Detailed description
 *     tags:
 *       - Category
 *     parameters:
 *       - in: path
 *         name: paramName
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success response
 */
router.get('/path/to/endpoint', handler);
```

## References
- [OpenAPI 3.0 Specification](https://spec.openapis.org/oas/v3.0.0)
- [swagger-jsdoc Documentation](https://github.com/Surnet/swagger-jsdoc)
- [swagger-ui-express Documentation](https://github.com/scottie1990/swagger-ui-express)

