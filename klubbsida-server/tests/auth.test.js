/**
 * Authentication and Authorization Tests
 * 
 * These tests verify that the authentication and authorization middleware
 * correctly protect admin routes and allow access to public routes.
 */

const request = require('supertest');
const express = require('express');
const jwtCheck = require('../middleware/jwtCheck');
const checkAdminRole = require('../middleware/roleCheck');

// Mock express-jwt to avoid actual JWT verification
jest.mock('express-jwt', () => ({
  expressjwt: () => (req, res, next) => {
    // Simulate JWT verification based on Authorization header
    if (req.headers.authorization === 'Bearer valid-admin-token') {
      req.user = {
        sub: 'test-user-id',
        'https://dev-nwurgok5vi3aouh3.eu.auth0.com/roles': ['Administrator']
      };
      next();
    } else if (req.headers.authorization === 'Bearer valid-user-token') {
      req.user = {
        sub: 'test-user-id',
        'https://dev-nwurgok5vi3aouh3.eu.auth0.com/roles': ['User']
      };
      next();
    } else {
      const error = new Error('Unauthorized');
      error.status = 401;
      next(error);
    }
  }
}));

// Create a test app
const app = express();

// Error handler middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

// Test routes
app.get('/public', (req, res) => {
  res.json({ message: 'Public route' });
});

app.get('/protected', jwtCheck, (req, res) => {
  res.json({ message: 'Protected route', user: req.user.sub });
});

app.get('/admin', jwtCheck, checkAdminRole, (req, res) => {
  res.json({ message: 'Admin route', user: req.user.sub });
});

describe('Authentication and Authorization', () => {
  test('Public route should be accessible without authentication', async () => {
    const response = await request(app).get('/public');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Public route');
  });

  test('Protected route should require authentication', async () => {
    const response = await request(app).get('/protected');
    expect(response.status).toBe(401);
  });

  test('Protected route should be accessible with valid token', async () => {
    const response = await request(app)
      .get('/protected')
      .set('Authorization', 'Bearer valid-user-token');
    
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Protected route');
    expect(response.body.user).toBe('test-user-id');
  });

  test('Admin route should require authentication', async () => {
    const response = await request(app).get('/admin');
    expect(response.status).toBe(401);
  });

  test('Admin route should require admin role', async () => {
    const response = await request(app)
      .get('/admin')
      .set('Authorization', 'Bearer valid-user-token');
    
    expect(response.status).toBe(403);
    expect(response.body.error).toBe('Forbidden');
  });

  test('Admin route should be accessible with admin token', async () => {
    const response = await request(app)
      .get('/admin')
      .set('Authorization', 'Bearer valid-admin-token');
    
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Admin route');
    expect(response.body.user).toBe('test-user-id');
  });
});