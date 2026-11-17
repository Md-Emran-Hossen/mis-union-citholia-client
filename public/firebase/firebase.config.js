// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNmHIfOlGo35z9d3-Pok8osXmQJYtMIV8",
  authDomain: "mis-union-citholia-client.firebaseapp.com",
  projectId: "mis-union-citholia-client",
  storageBucket: "mis-union-citholia-client.firebasestorage.app",
  messagingSenderId: "458011315604",
  appId: "1:458011315604:web:29e31e1e1c7190b76e5381"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;