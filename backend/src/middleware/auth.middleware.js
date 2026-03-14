import { ApiError } from "../utils/ApiError.js";
import admin from "../config/firebaseAdmin.js";

/**
 * Authentication middleware for Firebase integration.
 * Extracts ownerId from x-user-id header or from the JWT Bearer token payload.
 */
export const authMiddleware = async (req, res, next) => {
  try {
    // Priority 1: Extract UID from Authorization Bearer token (Verified via Firebase Admin)
    const authHeader = req.headers["authorization"];
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        // decodedToken contains: uid, email, name, picture, etc.
        req.user = { 
            _id: decodedToken.uid, // Map uid to _id for consistency with existing controller patterns
            uid: decodedToken.uid,
            email: decodedToken.email,
            ...decodedToken 
        };
        console.log(`Auth Success: ${req.user.email || req.user.uid}`);
        return next();
      } catch (verifyError) {
        console.warn("Firebase token verification failed:", verifyError.message);
      }
    }

    // Priority 2: x-user-id header (Fallback for development/testing)
    const userId = req.headers["x-user-id"];
    if (userId) {
      // NOTE: We don't have email in this case unless we fetch it, 
      // but we'll set it to null to avoid undefined errors.
      req.user = { 
        _id: userId,
        uid: userId,
        email: null
      };
      console.log(`Auth Fallback (x-user-id): ${userId}`);
      return next();
    }

    // No valid auth found — allow the route to handle it (controllers will throw 401 via getOwnerId)
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    next();
  }
};
