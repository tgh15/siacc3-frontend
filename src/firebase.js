// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCxCBi_8CjvbsOiC0wU0eV315E_xtUl6jI",
    authDomain: "siacc-b1d0d.firebaseapp.com",
    projectId: "siacc-b1d0d",
    storageBucket: "siacc-b1d0d.appspot.com",
    messagingSenderId: "528209304237",
    appId: "1:528209304237:web:01c1e8640212b2c91dc424",
    measurementId: "G-QC01TY60B9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
