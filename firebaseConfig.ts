import firebase from "firebase";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyDBl3GVJf4TQI9pb9vkRrXm1V4rBLbc8Rs",
  authDomain: "whatsappclone-b7830.firebaseapp.com",
  projectId: "whatsappclone-b7830",
  storageBucket: "whatsappclone-b7830.appspot.com",
  messagingSenderId: "229530477837",
  appId: "1:229530477837:web:8696885225011b12b5bc44",
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

export const User = db.collection("users");

export { firebase };
