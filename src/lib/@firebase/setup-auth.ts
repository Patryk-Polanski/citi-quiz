import { auth } from "./index";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateEmail,
  signOut,
  updatePassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

const createUser = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const user = userCredential.user;
  return user;
};

const loginUser = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const user = userCredential.user;
  return user;
};

const logoutUser = async () => {
  await signOut(auth);
};

const resetUserPasswordEmail = async (email: string) => {
  sendPasswordResetEmail(auth, email);
};

const updateUserEmail = async (newEmail: string) => {
  if (auth.currentUser) updateEmail(auth.currentUser, newEmail);
};

const updateUserPassword = async (newPassword: string) => {
  if (auth.currentUser) updatePassword(auth.currentUser, newPassword);
};

const completeProfile = async (displayName: string) => {
  if (auth.currentUser) updateProfile(auth.currentUser, { displayName });
};

export {
  onAuthStateChanged,
  createUser,
  loginUser,
  logoutUser,
  resetUserPasswordEmail,
  updateUserEmail,
  updateUserPassword,
  completeProfile,
};
