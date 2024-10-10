// Import the necessary Firebase modules
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/**
 * Initializes the Firebase app with the provided configuration.
 * 
 * This function creates and configures a Firebase app instance using the
 * settings specified in the firebaseConfig object.
 * 
 * @returns {FirebaseApp} The initialized Firebase app instance.
 */
const app = initializeApp(firebaseConfig);

export default app;

/**
 * Gets the Firebase Authentication instance.
 * 
 * This instance allows for managing user authentication with Firebase.
 * 
 * @returns {Auth} The Firebase Authentication instance.
 */
export const auth = getAuth(app);

/**
 * Gets the Firestore database instance.
 * 
 * This instance provides methods for interacting with the Firestore database,
 * allowing for data storage and retrieval.
 * 
 * @returns {Firestore} The Firestore database instance.
 */
export const db = getFirestore(app);
