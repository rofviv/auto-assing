import * as firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyBmyBaG9sq7u1rsILCAkWUYGzoStEzgsHY",
  authDomain: "users-callcenter-ps.firebaseapp.com",
  databaseURL: "https://users-callcenter-ps.firebaseio.com",
  projectId: "users-callcenter-ps",
  storageBucket: "users-callcenter-ps.appspot.com",
  messagingSenderId: "188870727072",
  appId: "1:188870727072:web:54885668133e5597b480c5"
};

let firebaseapp = firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

export { db, firebaseapp };