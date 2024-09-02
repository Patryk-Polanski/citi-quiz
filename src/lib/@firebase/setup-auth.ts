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
  await createUserWithEmailAndPassword(auth, email, password);
};

const loginUser = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password);
};

const logoutUser = async () => {
  await signOut(auth);
};

const resetUserPassword = async (email: string) => {
  sendPasswordResetEmail(auth, email);
};

const updateUserEmail = async (newEmail: string) => {
  if (auth.currentUser) updateEmail(auth.currentUser, newEmail);
};

const updateUserPassword = async (newPassword: string) => {
  if (auth.currentUser) updatePassword(auth.currentUser, newPassword);
};

export {
  createUser,
  loginUser,
  logoutUser,
  resetUserPassword,
  updateUserEmail,
  updateUserPassword,
};
