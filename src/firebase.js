// Import the functions you need from the SDKs you need
// import  {}  from 'firebase';
import { initializeApp } from "firebase/app"

import { getFirestore } from "@firebase/firestore"

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// eslint-disable-next-line no-unused-vars
const firebaseConfig = initializeApp({

    apiKey: "AIzaSyDhswpGx77TQ8jHoWD6caZtqx4j1BmPShc",

    authDomain: "instagram-dark.firebaseapp.com",
  
    projectId: "instagram-dark",
  
    storageBucket: "npm start",
  
    messagingSenderId: "159350883795",
  
    appId: "1:159350883795:web:034fe45df21ac8bf311b26",
  
    measurementId: "G-T8N8CX9CTK"
  
  
  });
  
  

// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
const db= getFirestore();
// const analytics = getAnalytics(app);
export {db}