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
const getBaseURL = () => {
  const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  // Cleanup URL: remove trailing slashes, spaces, or accidental comments
  return url.trim().replace(/\/+$/, '');
};

const apiClient = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Debug log for production connectivity (only if not in browser or if specifically needed)
if (typeof window !== 'undefined') {
  console.log('🌐 API Base URL:', apiClient.defaults.baseURL);
}

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
