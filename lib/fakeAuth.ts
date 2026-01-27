/**
 * DEMO-ONLY CLIENT-SIDE AUTHENTICATION MODULE
 * 
 * ⚠️ WARNING: This is a simulated authentication system for demo purposes only.
 * DO NOT use this in production. Replace with a real authentication provider
 * such as NextAuth.js, Firebase Auth, Supabase Auth, or Auth0.
 * 
 * This module provides a fake authentication flow that:
 * - Stores session data in sessionStorage (cleared when tab closes)
 * - Uses a 30-minute TTL for session expiration
 * - Returns a fake user object for demo purposes
 * - Does NOT make any network calls or validate credentials
 * 
 * Migration Guide:
 * To replace with real auth, update all imports of this module to use your
 * chosen auth provider's equivalent functions:
 * - signIn() → NextAuth signIn() or Firebase signInWithPopup()
 * - signOut() → NextAuth signOut() or Firebase signOut()
 * - isAuthenticated() → NextAuth useSession() or Firebase onAuthStateChanged()
 * - getUser() → NextAuth session.user or Firebase currentUser
 */

// ============================================================================
// TYPES
// ============================================================================

export interface FakeUser {
  id: string;
  name: string;
  email: string;
  provider: string;
}

interface FakeSession {
  user: FakeUser;
  expiresAt: number; // Unix timestamp in milliseconds
}

// ============================================================================
// CONFIGURATION
// ============================================================================

const SESSION_KEY = 'resustack_demo_session';
const DEFAULT_TTL_MINUTES = 30;

// Fake user data - customize this as needed
const DEMO_USER_BASE = {
  id: 'demo-user-001',
  name: 'Demo User',
  email: 'demo@example.com',
};

// ============================================================================
// CORE FUNCTIONS
// ============================================================================

/**
 * Sign in a user with the specified provider (demo mode).
 * 
 * In a real implementation, this would:
 * - Redirect to OAuth provider (Google, Microsoft, etc.)
 * - Validate credentials
 * - Create a secure session on the server
 * 
 * @param provider - Auth provider name (e.g., 'google', 'microsoft', 'email')
 * @param ttlMinutes - Session time-to-live in minutes (default: 30)
 * @returns Promise that resolves with the fake user object
 * 
 * @example
 * ```typescript
 * await signIn('google');
 * // User is now "signed in" with a 30-minute session
 * ```
 */
export async function signIn(
  provider: string = 'email',
  ttlMinutes: number = DEFAULT_TTL_MINUTES
): Promise<FakeUser> {
  // Simulate network delay (100-300ms) for realistic UX
  await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200));

  const user: FakeUser = {
    ...DEMO_USER_BASE,
    provider,
  };

  const expiresAt = Date.now() + ttlMinutes * 60 * 1000;

  const session: FakeSession = {
    user,
    expiresAt,
  };

  // Store in sessionStorage (cleared when tab/window closes)
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }

  return user;
}

/**
 * Sign out the current user (demo mode).
 * 
 * In a real implementation, this would:
 * - Invalidate the session on the server
 * - Clear cookies/tokens
 * - Redirect to login page
 * 
 * @example
 * ```typescript
 * signOut();
 * // Session is now cleared
 * ```
 */
export function signOut(): void {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(SESSION_KEY);
  }
}

/**
 * Check if the user is currently authenticated (demo mode).
 * 
 * In a real implementation, this would:
 * - Validate session token with the server
 * - Check if the session is still valid
 * - Refresh the session if needed
 * 
 * @returns true if user has a valid session, false otherwise
 * 
 * @example
 * ```typescript
 * if (isAuthenticated()) {
 *   // User is signed in
 * } else {
 *   // Redirect to login
 * }
 * ```
 */
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  const sessionData = sessionStorage.getItem(SESSION_KEY);
  if (!sessionData) {
    return false;
  }

  try {
    const session: FakeSession = JSON.parse(sessionData);
    
    // Check if session has expired
    if (Date.now() > session.expiresAt) {
      // Clean up expired session
      sessionStorage.removeItem(SESSION_KEY);
      return false;
    }

    return true;
  } catch (error) {
    // Invalid session data, clean up
    sessionStorage.removeItem(SESSION_KEY);
    return false;
  }
}

/**
 * Get the current user object (demo mode).
 * 
 * In a real implementation, this would:
 * - Fetch user data from the server
 * - Return authenticated user profile
 * - Handle loading and error states
 * 
 * @returns FakeUser object if authenticated, null otherwise
 * 
 * @example
 * ```typescript
 * const user = getUser();
 * if (user) {
 *   console.log(`Welcome, ${user.name}!`);
 * }
 * ```
 */
export function getUser(): FakeUser | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const sessionData = sessionStorage.getItem(SESSION_KEY);
  if (!sessionData) {
    return null;
  }

  try {
    const session: FakeSession = JSON.parse(sessionData);
    
    // Check if session has expired
    if (Date.now() > session.expiresAt) {
      sessionStorage.removeItem(SESSION_KEY);
      return null;
    }

    return session.user;
  } catch (error) {
    sessionStorage.removeItem(SESSION_KEY);
    return null;
  }
}

/**
 * Get the session expiration time (demo mode).
 * Useful for displaying "session expires in X minutes" messages.
 * 
 * @returns Unix timestamp in milliseconds, or null if no session
 */
export function getSessionExpiry(): number | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const sessionData = sessionStorage.getItem(SESSION_KEY);
  if (!sessionData) {
    return null;
  }

  try {
    const session: FakeSession = JSON.parse(sessionData);
    return session.expiresAt;
  } catch (error) {
    return null;
  }
}

/**
 * Extend the current session by the specified number of minutes.
 * Useful for "remember me" functionality.
 * 
 * @param additionalMinutes - Minutes to add to the current expiration
 * @returns true if session was extended, false if no active session
 */
export function extendSession(additionalMinutes: number = DEFAULT_TTL_MINUTES): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  const sessionData = sessionStorage.getItem(SESSION_KEY);
  if (!sessionData) {
    return false;
  }

  try {
    const session: FakeSession = JSON.parse(sessionData);
    
    // Extend expiration
    session.expiresAt = Date.now() + additionalMinutes * 60 * 1000;
    
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return true;
  } catch (error) {
    return false;
  }
}
