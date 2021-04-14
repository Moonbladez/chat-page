import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD7Q0syvANi8X3orzjL_hSXkhJvm28sLnY",
  authDomain: "whatsapp2-c1224.firebaseapp.com",
  projectId: "whatsapp2-c1224",
  storageBucket: "whatsapp2-c1224.appspot.com",
  messagingSenderId: "421708669362",
  appId: "1:421708669362:web:0055ab8ba2163faa1084ab",
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
