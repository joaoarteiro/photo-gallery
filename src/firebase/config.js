// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQyvaaeDP6VafR7RK16NxguFnErP5-UrM",
  authDomain: "firegram-7381d.firebaseapp.com",
  projectId: "firegram-7381d",
  storageBucket: "firegram-7381d.appspot.com",
  messagingSenderId: "257480143557",
  appId: "1:257480143557:web:eb98dfc40c3d4a86e436ac",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const bucket = getStorage(app);
const dataBase = getFirestore(app);
export { bucket, dataBase };
