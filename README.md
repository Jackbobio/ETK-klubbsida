# Klubbsida Application

A web application for a sports club with member management, news functionality, and robust security features.

## Features

- **Member Management**: Manage club members efficiently.
- **News Management**: Create, update, and delete news articles.
- **Role-Based Access Control**: Secure admin functionalities with role verification.
- **Responsive Design**: Optimized for various devices.

## Security Implementation

### Authentication

- Utilizes Auth0 for authentication.
- JWT (JSON Web Token) based authentication with RS256 algorithm.
- Validates audience and issuer for secure token verification.

### Authorization

- Role-based access control ensures only authorized users can access admin functionalities.
- Admin routes and sensitive operations are restricted to users with the "Administrator" role.

### Middleware

1. **JWT Authentication Middleware** (`jwtCheck.js`):

   - Verifies JWT tokens for incoming requests.
   - Validates token signature, expiration, audience, and issuer.
   - Attaches decoded user information to the request object.

2. **Admin Role Verification Middleware** (`roleCheck.js`):
   - Ensures the user has the "Administrator" role.
   - Returns error responses for unauthorized access.

### Client-Side Security

- Includes JWT tokens in requests to protected endpoints.
- Verifies admin status with the server.
- Provides UI feedback for unauthorized actions.
- Centralized API utility for consistent authentication.

### Protected Routes

- `/api/admin/*` (Admin only).
- POST, PUT, DELETE operations on `/api/news` (Admin only).
- GET operations on `/api/news` (Public access).

## Project Structure

### Client (`klubbsida-klient`)

- Built with React and Vite.
- Tailwind CSS for styling.
- Organized into components, pages, and utilities.

### Server (`klubbsida-server`)

- Node.js and Express.js backend.
- MongoDB for database management.
- Organized into routes, middleware, and models.

## Development Setup

### Prerequisites

- Node.js and npm installed.
- MongoDB instance running.

### Steps

#### Server

```bash
cd klubbsida-server
npm install
npm run dev
```

#### Client

```bash
cd klubbsida-klient
npm install
npm run dev
```

#### Testing

```bash
cd klubbsida-server
npm test
```

## Environment Variables

### Server

Create a `.env` file in the `klubbsida-server` directory:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### Client

Create a `.env` file in the `klubbsida-klient` directory:

```
VITE_AUTH0_DOMAIN=your_auth0_domain
VITE_AUTH0_CLIENT_ID=your_auth0_client_id
VITE_API_URL=http://localhost:5000/api
```

## License

This project is licensed under the terms of the [MIT License](./LICENSE).
