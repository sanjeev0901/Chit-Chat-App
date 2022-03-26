import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyA8Q0A_MMdssNo4sT4Fe2dh8-6z0OJyd5k",
  authDomain: "chit-chat-app-4a839.firebaseapp.com",
  projectId: "chit-chat-app-4a839",
  storageBucket: "chit-chat-app-4a839.appspot.com",
  messagingSenderId: "500907943761",
  appId: "1:500907943761:web:49a3b0f46f7cf188c6d570",
};

let app;
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = app.auth();

export { db, auth };
