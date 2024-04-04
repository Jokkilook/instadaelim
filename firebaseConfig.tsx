// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBID3SlRhAEG6f-TWYuBFsObcmNTOugQEM",
  authDomain: "instadaelim-c3102.firebaseapp.com",
  projectId: "instadaelim-c3102",
  storageBucket: "instadaelim-c3102.appspot.com",
  messagingSenderId: "314548642936",
  appId: "1:314548642936:web:ad1f3b32d7abd6cced398d",
  measurementId: "G-WZ95M99TLD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initinalize Firebase Authentication
export const auth = getAuth(app);
