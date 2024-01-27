import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDRPHB8g7dTMxTfZVewC6t9M4V4PI7b8ZE",
    authDomain: "to-do-app-9b5f9.firebaseapp.com",
    projectId: "to-do-app-9b5f9",
    storageBucket: "to-do-app-9b5f9.appspot.com",
    messagingSenderId: "173438573729",
    appId: "1:173438573729:web:e2511e596551b63046e4e0",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

