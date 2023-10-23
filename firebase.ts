// Import the functions you need from the SDKs you need
import { initializeApp,  getApp, FirebaseApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// import 'dotenv/config'
// import dotenv from 'dotenv'; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export let app: FirebaseApp;
// dotenv.config(); 

const firebaseConfig = {
  apiKey: import.meta.env.VITE_fb_apiKey,
  authDomain: import.meta.env.VITE_fb_authDomain,
  projectId: import.meta.env.VITE_fb_projectId,
  storageBucket: import.meta.env.VITE_fb_storageBucket,
  messagingSenderId: import.meta.env.VITE_fb_messagingSenderId,
  appId: import.meta.env.VITE_fb_appId,
  measurementId:import.meta.env.VITE_fb_measurementId
};

// Firebase 초기화
try {
    app = getApp('app');
  } catch (e) {
    app = initializeApp(firebaseConfig, 'app');
  }
  
  // Firestore 초기화
  export const db = getFirestore(app);