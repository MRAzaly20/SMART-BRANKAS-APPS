import firebase from 'firebase/compat/app';
import 'firebase/auth';
import Constants from 'expo-constants';

// Initialize Firebase
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

let Firebase;

if (firebase.apps.length === 0) {
  Firebase = firebase.initializeApp(firebaseConfig);
}

export default Firebase;