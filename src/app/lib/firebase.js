// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage'; // Corrected this line

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB67Ptce7TNCaHxalpiSr8l5otvN9eabeA",
  authDomain: "project-blog-8c37e.firebaseapp.com",
  projectId: "project-blog-8c37e",
  storageBucket: "project-blog-8c37e.appspot.com",
  messagingSenderId: "299854702726",
  appId: "1:299854702726:web:09b2884da1abba96058907"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore, Auth, and Storage
export const db = getFirestore(app); // Optional to pass 'app'
export const auth = getAuth(app); // Optional to pass 'app'
export const storage = getStorage(app); // Corrected function and optional 'app'
