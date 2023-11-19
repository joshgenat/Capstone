// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNpHkGU9oqppjLWpJ2oeRdTX83ApkzTPg",
  authDomain: "iot-enabled-smart-home.firebaseapp.com",
  databaseURL: "https://iot-enabled-smart-home-default-rtdb.firebaseio.com",
  projectId: "iot-enabled-smart-home",
  storageBucket: "iot-enabled-smart-home.appspot.com",
  messagingSenderId: "463953889128",
  appId: "1:463953889128:web:d046929251d5a771a078dd",
  measurementId: "G-V4NM0H6Y56",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore();
export const db2 = getDatabase(app);
