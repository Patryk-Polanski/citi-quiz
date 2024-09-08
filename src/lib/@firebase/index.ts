import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { fetchData, addData } from "./setup-db";
import {
  onAuthStateChanged,
  createUser,
  loginUser,
  logoutUser,
  resetUserPassword,
  updateUserEmail,
  updateUserPassword,
  completeProfile,
} from "./setup-auth";

// safe to expose
const firebaseConfig = {
  apiKey: "AIzaSyAgXifSjW3AjSCPnRG8lRAynYb9dN9tovs",
  authDomain: "citiquiz-c20ee.firebaseapp.com",
  projectId: "citiquiz-c20ee",
  storageBucket: "citiquiz-c20ee.appspot.com",
  messagingSenderId: "17522734457",
  appId: "1:17522734457:web:519e1d78c8e18630496ba8",
};

// init firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();
const auth = getAuth();

const onAuthChange = onAuthStateChanged.bind(null, auth);

export {
  db,
  auth,
  onAuthChange,
  fetchData,
  addData,
  createUser,
  loginUser,
  logoutUser,
  resetUserPassword,
  updateUserEmail,
  updateUserPassword,
  completeProfile,
};
