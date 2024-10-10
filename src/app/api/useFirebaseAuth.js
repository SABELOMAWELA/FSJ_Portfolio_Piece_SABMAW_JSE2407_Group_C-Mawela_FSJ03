import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";

/**
 * Custom hook for managing user authentication.
 * 
 * This hook utilizes Firebase's authentication methods to track the current user's 
 * authentication state, log in a user, and log out a user.
 * 
 * @returns {Object} An object containing:
 * @returns {Object|null} user - The currently authenticated user or null if not authenticated.
 * @returns {Function} login - Function to log in a user with email and password.
 * @returns {Function} logout - Function to log out the currently authenticated user.
 */
export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  return { user, login, logout };
}
