// lib/firebase.ts (or wherever your firebase config is)
import { initializeApp, getApps, FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";

// Only expose config client-side
export const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!
};

// Initialize ONLY in client components
let app: any;
let auth: any;

export const getFirebaseApp = () => {
  if (typeof window === 'undefined') return null; // Server-side check
  
  if (!app) {
    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApps()[0];
    }
  }
  return app;
};

export const getAuthInstance = () => {
  if (typeof window === 'undefined') return null;
  
  if (!auth) {
    const firebaseApp = getFirebaseApp();
    if (firebaseApp) {
      auth = getAuth(firebaseApp);
    }
  }
  return auth;
};


// export const auth = getAuth(app);
