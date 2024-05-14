import firebase from 'firebase/compat/app';
import { getDatabase } from 'firebase/database';


const firebaseConfig = {
    apiKey: "AIzaSyA81HxQWu5zIKBS4DrEuJzQpTsNrp3LqHk",
    authDomain: "smartbrankas-azfi.firebaseapp.com",
    databaseURL: "https://smartbrankas-azfi-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "smartbrankas-azfi",
    storageBucket: "smartbrankas-azfi.appspot.com",
    messagingSenderId: "1006472358413",
    appId: "1:1006472358413:web:b7048ca23643cd04080344",
    measurementId: "G-7274FDDBQN"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
 export const db = getDatabase(firebase.initializeApp(firebaseConfig));