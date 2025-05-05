/**
 * API Integration Tests
 * 
 * These tests verify that the API client correctly handles authentication errors
 * and token issues when making requests to protected endpoints.
 */

const { useApi } = require('../mock/api-mock');

// Mock Auth0 hook
jest.mock('@auth0/auth0-react', () => ({
  useAuth0: jest.fn()
}));

const { useAuth0 } = require('@auth0/auth0-react');

describe('API Client', () => {
  let mockFetch;
  let api;
  
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Mock fetch
    mockFetch = jest.fn();
    global.fetch = mockFetch;
    
    // Default Auth0 mock implementation
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      getAccessTokenSilently: jest.fn().mockResolvedValue('mock-token'),
    });
  });
  
  test('should add authorization header when authenticated', async () => {
    // Setup
    mockFetch.mockResolvedValue({
      ok: true,
      headers: {
        get: () => 'application/json'
      },
      json: () => Promise.resolve({ success: true })
    });
    
    api = useApi();
    
    // Execute
    await api.get('/test');
    
    // Verify
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch.mock.calls[0][1].headers.Authorization).toBe('Bearer mock-token');
  });
  
  test('should throw error when token retrieval fails', async () => {
    // Setup
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      getAccessTokenSilently: jest.fn().mockRejectedValue(new Error('Token error')),
    });
    
    api = useApi();
    
    // Execute & Verify
    await expect(api.get('/test')).rejects.toThrow('Failed to get access token');
    expect(mockFetch).not.toHaveBeenCalled();
  });
  
  test('should not add authorization header when not authenticated', async () => {
    // Setup
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      getAccessTokenSilently: jest.fn(),
    });
    
    mockFetch.mockResolvedValue({
      ok: true,
      headers: {
        get: () => 'application/json'
      },
      json: () => Promise.resolve({ success: true })
    });
    
    api = useApi();
    
    // Execute
    await api.get('/test');
    
    // Verify
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch.mock.calls[0][1].headers.Authorization).toBeUndefined();
    expect(useAuth0().getAccessTokenSilently).not.toHaveBeenCalled();
  });
  
  test('should handle API errors correctly', async () => {
    // Setup
    mockFetch.mockResolvedValue({
      ok: false,
      status: 401,
      json: () => Promise.resolve({ message: 'Unauthorized' })
    });
    
    api = useApi();
    
    // Execute & Verify
    await expect(api.get('/test')).rejects.toThrow('Unauthorized');
  });
});