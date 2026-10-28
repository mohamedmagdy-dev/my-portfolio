import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, isFirebaseConfigured } from "../config";

/**
 * Sign in admin user with email and password
 * @param {string} email
 * @param {string} password
 */
export async function loginAdmin(email, password) {
  if (!isFirebaseConfigured || !auth) {
    throw new Error("Firebase Authentication is not configured.");
  }
  return await signInWithEmailAndPassword(auth, email, password);
}

/**
 * Sign out current admin user
 */
export async function logoutAdmin() {
  if (!auth) return;
  return await signOut(auth);
}

/**
 * Listen to auth state changes
 * @param {Function} callback
 * @returns {Function} unsubscribe function
 */
export function onAuthChange(callback) {
  if (!auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}
