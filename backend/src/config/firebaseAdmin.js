import admin from "firebase-admin";

// Initialize Firebase Admin
// If you have a service account JSON, you can use:
// credential: admin.credential.cert(serviceAccount)
// For now, we initialize with the project ID.
// Most operations (like verifyIdToken) work with just the project ID if the environment is set up.

if (!admin.apps.length) {
    admin.initializeApp({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "quickcv-7cfcc"
    });
}

export default admin;
