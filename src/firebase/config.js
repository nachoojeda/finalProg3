import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAJWkThM4t74FpKggp1kCjQeJJhV5MIYxA",
    authDomain: "finalprog3-437b2.firebaseapp.com",
    projectId: "finalprog3-437b2",
    storageBucket: "finalprog3-437b2.appspot.com",
    messagingSenderId: "325522788593",
    appId: "1:325522788593:web:d450f6158fd32d3264d950"
  };

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
