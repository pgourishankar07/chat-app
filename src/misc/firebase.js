import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
// Import the functions you need from the SDKs you need
// import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCyegoV96qSZBlEav2-rW52V9UQ4qY-Ah4',
  authDomain: 'chathub-aff58.firebaseapp.com',
  databaseURL: 'https://chathub-aff58-default-rtdb.firebaseio.com',
  projectId: 'chathub-aff58',
  storageBucket: 'chathub-aff58.appspot.com',
  messagingSenderId: '945753486081',
  appId: '1:945753486081:web:bc2070107bbbf29da2a100',
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();
