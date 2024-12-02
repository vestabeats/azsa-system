// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:import.meta.env.VITE_APP_FIREBASE_API_KEY ,
  authDomain: "azsa-2e69b.firebaseapp.com",
  projectId: "azsa-2e69b",
  storageBucket: "azsa-2e69b.appspot.com",
  messagingSenderId: "366096393858",
  appId: "1:366096393858:web:2856ed27b5a5669434b69b",
  measurementId: "G-3823QBNPZY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);