// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDw9V8-MoUXwl6l59V4Cm0j5mzBMUxxP_0",
    authDomain: "taller-moviles-c4576.firebaseapp.com",
    databaseURL: "https://taller-moviles-c4576-default-rtdb.firebaseio.com",
    projectId: "taller-moviles-c4576",
    storageBucket: "taller-moviles-c4576.firebasestorage.app",
    messagingSenderId: "587298833287",
    appId: "1:587298833287:web:915028da53d8eaa6e3c922"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);