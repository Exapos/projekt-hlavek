import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDh7NJ65TiysKAlWXC1gsqnBXcZn_4dSLc",
  authDomain: "projekt-hlavka-2023.firebaseapp.com",
  projectId: "projekt-hlavka-2023",
  storageBucket: "projekt-hlavka-2023.appspot.com",
  messagingSenderId: "585283095669",
  appId: "1:585283095669:web:18ff6130a0b177e204bc3c",
  measurementId: "G-NHELD08YR7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);



