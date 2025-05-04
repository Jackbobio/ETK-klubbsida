# Klubbsida Application

A web application for a sports club with member management and news functionality.

## Security Implementation

This application implements a robust security system to ensure that admin requests are secure and can only be made by authorized administrators.

### Authentication

The application uses Auth0 for authentication:

- JWT (JSON Web Token) based authentication
- Tokens are verified using RS256 algorithm
- Proper audience and issuer validation

### Authorization

Role-based access control is implemented:

- Admin routes are protected with role verification
- Only users with the "Administrator" role can access admin functionality
- News creation, updating, and deletion are restricted to admins

### Security Middleware

Two main middleware components handle security:

1. **JWT Authentication Middleware** (`jwtCheck.js`)
   - Verifies that incoming requests have a valid JWT token
   - Validates token signature, expiration, audience, and issuer
   - Attaches the decoded user information to the request object

2. **Admin Role Verification Middleware** (`roleCheck.js`)
   - Checks if the authenticated user has the Administrator role
   - Returns appropriate error responses for unauthorized access
   - Supports multiple role claim formats for compatibility

### Client-Side Security

The client application:

- Includes the JWT token in requests to protected endpoints
- Verifies admin status with the server
- Provides appropriate UI feedback for unauthorized actions
- Uses a centralized API utility for consistent authentication

### Protected Routes

The following routes are protected:

- All `/api/admin/*` routes (admin only)
- POST, PUT, DELETE operations on `/api/news` (admin only)
- GET operations on `/api/news` (public access)

## Development

### Server

```bash
cd klubbsida-server
npm install
npm run dev
```

### Client

```bash
cd klubbsida-klient
npm install
npm run dev
```

### Testing

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