import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const firebaseConfig = {
  // Your Firebase configuration object goes here
  // You'll need to replace this with your actual Firebase config from the Firebase Console
  apiKey: "AIzaSyBcGuXt5ETwLDRVR6Ws9rY91ewJDYZWvR4",
  authDomain: "login-3d077.firebaseapp.com",
  projectId: "login-3d077",
  storageBucket: "login-3d077.firebasestorage.app",
  messagingSenderId: "157705095461",
  appId: "1:157705095461:web:420eb59114d578b377b2cc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

export { auth }; 