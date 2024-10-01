import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD4vadwgaG2INw8VjMk1dz34LG8ZpmPJ0U",
  authDomain: "stars-ec445.firebaseapp.com",
  projectId: "stars-ec445",
  storageBucket: "stars-ec445.appspot.com",
  messagingSenderId: "230566909483",
  appId: "1:230566909483:web:b4f41c1959b16f357cfc6e"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);