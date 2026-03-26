import axios from 'axios';
import { getAuthInstance } from '@/lib/firebase';

/**
 * Centralized API client for all frontend-to-backend communication.
 * Automatically handles:
 * - Base URL from NEXT_PUBLIC_API_URL
 * - Firebase ID tokens in Authorization header
 * - x-user-id header for backend identification
 * - Credential support for cookies
 */
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach Firebase ID tokens
apiClient.interceptors.request.use(async (config) => {
  try {
    const auth = getAuthInstance();
    // Only attempt to get token if auth is initialized and we have a user
    if (auth && auth.currentUser) {
      const token = await auth.currentUser.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
      config.headers['x-user-id'] = auth.currentUser.uid;
    }
  } catch (error) {
    console.error('API Client: Failed to attach auth token', error);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor for global error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific status codes if needed (e.g., 401 for unauthorized)
    if (error.response?.status === 401) {
      console.warn('Unauthorized request. Possible expired token.');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
