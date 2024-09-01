import { auth } from "./index";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateEmail,
  signOut,
  updatePassword,
} from "firebase/auth";

const createUser = async (email: string, password: string) => {
  if (!email || !password)
    return console.error("createUser: Invalid arguments passed in");
  await createUserWithEmailAndPassword(auth, email, password);
};

const loginUser = async (email: string, password: string) => {
  if (!email || !password)
    return console.error("loginUser: Invalid arguments passed in");
  await signInWithEmailAndPassword(auth, email, password);
};

const logoutUser = async () => {
  await signOut(auth);
};

const resetUserPassword = async (email: string) => {
  if (!email)
    return console.error("resetUserPassword: Invalid arguments passed in");
  if (!auth.currentUser)
    return console.error("resetUserPassword: User is not logged in");
  sendPasswordResetEmail(auth, email);
};

const updateUserEmail = async (newEmail: string) => {
  if (!newEmail)
    return console.error("updateUserEmail: Invalid arguments passed in");
  if (!auth.currentUser)
    return console.error("updateUserEmail: User is not logged in");
  updateEmail(auth.currentUser, newEmail);
};

const updateUserPassword = async (newPassword: string) => {
  if (!newPassword)
    return console.error("updateUserPassword: Invalid arguments passed in");
  if (!auth.currentUser)
    return console.error("updateUserPassword: User is not logged in");
  updatePassword(auth.currentUser, newPassword);
};

export {
  createUser,
  loginUser,
  logoutUser,
  resetUserPassword,
  updateUserEmail,
  updateUserPassword,
};
