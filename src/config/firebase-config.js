// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjOdwT_pruhNZqNMSZ2afNs4Kx_LAO4k4",
  authDomain: "expense-tracker-darshan.firebaseapp.com",
  projectId: "expense-tracker-darshan",
  storageBucket: "expense-tracker-darshan.appspot.com",
  messagingSenderId: "405253919741",
  appId: "1:405253919741:web:9eedbb038ae73b87077f94",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
