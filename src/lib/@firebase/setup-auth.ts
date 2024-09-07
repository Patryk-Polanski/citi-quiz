import { auth } from "./index";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateEmail,
  signOut,
  updatePassword,
  onAuthStateChanged,
} from "firebase/auth";

const createUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;
    return user;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error signing in:", error.message);
    }
    throw error;
  }
};

const loginUser = async (email: string, password: string) => {
  // try {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const user = userCredential.user;
  return user;
  // } catch (error) {
  //   if (error instanceof Error) {
  //     throw new Error(error.message);
  //   }
  // }
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
  onAuthStateChanged,
  createUser,
  loginUser,
  logoutUser,
  resetUserPassword,
  updateUserEmail,
  updateUserPassword,
};
