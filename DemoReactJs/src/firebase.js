import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDQstUgIYeQt8U8PKIC5t6MjhxR4VE-KOU",
    authDomain: "fir-reactjs-9b526.firebaseapp.com",
    databaseURL: "https://fir-reactjs-9b526-default-rtdb.firebaseio.com",
    projectId: "fir-reactjs-9b526",
    storageBucket: "fir-reactjs-9b526.appspot.com",
    messagingSenderId: "736514316999",
    appId: "1:736514316999:web:1daaf005486e06e0d37ce2",
    measurementId: "G-N8DQ7HZQFS"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;