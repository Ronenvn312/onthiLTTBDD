import React from 'react'
// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIK8aGQlVT8OHa-JcWwChVH2J0s2O_2bo",
  authDomain: "test-b9c57.firebaseapp.com",
  projectId: "test-b9c57",
  storageBucket: "test-b9c57.appspot.com",
  messagingSenderId: "197977229135",
  appId: "1:197977229135:web:d9486d2a5df6ef57d4e73a",
  measurementId: "G-CJJP7R3MEX"
};
if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export {firebase}; 