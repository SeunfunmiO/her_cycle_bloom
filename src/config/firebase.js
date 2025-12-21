
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { GoogleAuthProvider, getAuth, OAuthProvider } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDfcTWGhOGk7wNfgj7duFNTX6t-1FXEbGg",
    authDomain: "her-cycle-bloom-1e43d.firebaseapp.com",
    projectId: "her-cycle-bloom-1e43d",
    storageBucket: "her-cycle-bloom-1e43d.firebasestorage.app",
    messagingSenderId: "850330741446",
    appId: "1:850330741446:web:9b031ffaabdfb6bad0c5c7"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const appleProvider = new OAuthProvider('apple.com');




