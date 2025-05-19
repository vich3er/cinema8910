// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebase = {
    apiKey: "AIzaSyCACXyDhPA3dciwCejimMC55ADfIoAT2Uc",
    authDomain: "lab8910-d0ba3.firebaseapp.com",
    projectId: "lab8910-d0ba3",
    storageBucket: "lab8910-d0ba3.firebasestorage.app",
    messagingSenderId: "888574286467",
    appId: "1:888574286467:web:9af80e8ada5041dbb019b6",
    measurementId: "G-BQCB5966LL"
};

// Initialize Firebase
const app = initializeApp(firebase);
const db = getFirestore(app);

export { db };