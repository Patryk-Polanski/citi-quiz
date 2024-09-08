import { db } from "./index";
import {
  collection,
  getDocs,
  orderBy,
  query,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";

const fetchData = async (dbName: string, orderConfig: string = "") => {
  if (!dbName) return console.error("fetchData: Invalid arguments passed in");
  const dbRef = collection(db, dbName);
  const dBQuery = query(dbRef, orderBy(orderConfig));
  const snapshot = await getDocs(dBQuery);
  return snapshot;
};

const addData = (dbName: string, newData: unknown) => {
  if (!dbName || !newData)
    return console.error("addData: Invalid arguments passed in");
  const dbRef = collection(db, dbName);
  addDoc(dbRef, newData);
};

const setData = (dbName: string, docName: string, newData: unknown) => {
  setDoc(doc(db, dbName, docName), newData);
};

export { fetchData, addData, setData };
