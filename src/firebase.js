// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4SojtXuCivhPQgZPMTRAsCvoQsbtg7Kg",
  authDomain: "rick-and-morty-20055.firebaseapp.com",
  projectId: "rick-and-morty-20055",
  storageBucket: "rick-and-morty-20055.appspot.com",
  messagingSenderId: "466879636600",
  appId: "1:466879636600:web:792b813b29d00ac010b98d",
  measurementId: "G-30BB37K7BV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//const analytics = getAnalytics(app);