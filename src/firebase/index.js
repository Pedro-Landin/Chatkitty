//Conexão com firebase
import firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

// Replace this with your Firebase SDK config snippet
const firebaseConfig = {
    apiKey: "AIzaSyBiwOs8TnQQ3ASs4rTmXyLiU3BbmgA8ILE",
    authDomain: "chat-10b7e.firebaseapp.com",
    projectId: "chat-10b7e",
    storageBucket: "chat-10b7e.appspot.com",
    messagingSenderId: "820200538771",
    appId: "1:820200538771:web:134063d4d8145554368366",
    measurementId: "G-T7W5PBP5DN"
  };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
