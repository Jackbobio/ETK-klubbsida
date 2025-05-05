/**
 * Mock implementation of the API utility for testing
 */
const { useCallback } = require('react');
const { useAuth0 } = require('@auth0/auth0-react');

// Base URL for API requests
const API_URL = 'https://klubbsida.onrender.com/api';

/**
 * Custom hook for making authenticated API requests
 * @returns {Object} API utility functions
 */
exports.useApi = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  /**
   * Make an authenticated API request
   * @param {string} endpoint - API endpoint (e.g., '/news')
   * @param {Object} options - Fetch options (method, body, etc.)
   * @returns {Promise<Object>} Response data
   */
  const callApi = useCallback(async (endpoint, options = {}) => {
    try {
      const url = `${API_URL}${endpoint}`;
      const fetchOptions = {
        ...options,
        headers: {
          ...options.headers,
          'Content-Type': 'application/json',
        },
      };

      // Add authorization header if user is authenticated
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          fetchOptions.headers = {
            ...fetchOptions.headers,
            Authorization: `Bearer ${token}`,
          };
        } catch (error) {
          // If we can't get a token for an authenticated request, throw an error
          // This prevents sending unauthenticated requests to protected endpoints
          throw new Error('Failed to get access token. Please try logging in again.');
        }
      }

      const response = await fetch(url, fetchOptions);
      
      // Handle non-2xx responses
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `API error: ${response.status}`);
      }
      
      // Parse JSON response if content exists
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      
      return await response.text();
    } catch (error) {
      throw error;
    }
  }, [getAccessTokenSilently, isAuthenticated]);

  /**
   * Helper function for GET requests
   * @param {string} endpoint - API endpoint
   * @returns {Promise<Object>} Response data
   */
  const get = useCallback((endpoint) => callApi(endpoint, { method: 'GET' }), [callApi]);

  /**
   * Helper function for POST requests
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body data
   * @returns {Promise<Object>} Response data
   */
  const post = useCallback((endpoint, data) => callApi(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  }), [callApi]);

  /**
   * Helper function for PUT requests
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body data
   * @returns {Promise<Object>} Response data
   */
  const put = useCallback((endpoint, data) => callApi(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  }), [callApi]);

  /**
   * Helper function for DELETE requests
   * @param {string} endpoint - API endpoint
   * @returns {Promise<Object>} Response data
   */
  const del = useCallback((endpoint) => callApi(endpoint, { method: 'DELETE' }), [callApi]);

  return {
    callApi,
    get,
    post,
    put,
    del,
  };
};