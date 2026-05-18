import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAgulMAt4kTcsWacnhyTI8LfSwZcyo7yaE",
  authDomain: "my-portfolio-satyam.firebaseapp.com",
  projectId: "my-portfolio-satyam",
  storageBucket: "my-portfolio-satyam.firebasestorage.app",
  messagingSenderId: "1064058802542",
  appId: "1:1064058802542:web:b2c95e5c2e8f765728317f"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, db, storage, auth, googleProvider };
