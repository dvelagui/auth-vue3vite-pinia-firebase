
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyApxZRrbpfypkHyohqxm_Huh3XKKb82NsI",
  authDomain: "vue-chat-ea99e.firebaseapp.com",
  projectId: "vue-chat-ea99e",
  storageBucket: "vue-chat-ea99e.appspot.com",
  messagingSenderId: "669734433280",
  appId: "1:669734433280:web:16e53778948c508da55ee5"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore(app);

export { auth, db }
 