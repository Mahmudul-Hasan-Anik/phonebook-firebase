import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged,updateProfile  } from "firebase/auth";
import { getDatabase, ref, push, set,onValue } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyBq0Wz27I84n4cEitkVM9EbaBQB1LpL-bY",
  authDomain: "phonebook-forclasstest.firebaseapp.com",
  projectId: "phonebook-forclasstest",
  storageBucket: "phonebook-forclasstest.appspot.com",
  messagingSenderId: "277870166461",
  appId: "1:277870166461:web:97552834c5361127f692d4"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth()

export {auth,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged,getDatabase, ref, push, set,onValue,updateProfile }