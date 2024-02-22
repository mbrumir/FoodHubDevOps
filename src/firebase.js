// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getFunctions } from 'firebase/functions';
// import { connectFunctionsEmulator } from 'firebase/functions';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAk83Q8BY4vInlZknJImrSChhIyqznG-CM",
    authDomain: "foodhub-843ba.firebaseapp.com",
    projectId: "foodhub-843ba",
    storageBucket: "foodhub-843ba.appspot.com",
    messagingSenderId: "1071406119132",
    appId: "1:1071406119132:web:a199ed1493734b19a21c19",
    measurementId: "G-02VFFGY56N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app);

const db = getFirestore(app);
const functions = getFunctions(app);

// connectFunctionsEmulator(functions, '127.0.0.1', 5001);

export { auth, db, functions };
