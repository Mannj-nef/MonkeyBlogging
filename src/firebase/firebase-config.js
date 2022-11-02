import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAI2Zab8dFlgMej3z57nKBDXDBD-9Ga0C0",
  authDomain: "monkey-blogging-8c83f.firebaseapp.com",
  projectId: "monkey-blogging-8c83f",
  storageBucket: "monkey-blogging-8c83f.appspot.com",
  messagingSenderId: "90221407042",
  appId: "1:90221407042:web:e3985706ffcce31d6db6db",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
