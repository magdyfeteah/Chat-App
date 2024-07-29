import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "rechat-9cbb9.firebaseapp.com",
  projectId: "rechat-9cbb9",
  storageBucket: "rechat-9cbb9.appspot.com",
  messagingSenderId: "641503517737",
  appId: "1:641503517737:web:afa0a6a6d2dc2961675038",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore()
export const storage = getStorage();
