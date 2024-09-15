import { db } from "./index";
import {
  collection,
  getDocs,
  getDoc,
  orderBy,
  query,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";

const fetchCollection = async (
  collectionName: string,
  orderConfig: string = "",
) => {
  if (!collectionName)
    return console.error("fetchCollection: Invalid arguments passed in");

  const dbRef = collection(db, collectionName);

  let dBQuery;
  if (orderConfig) dBQuery = query(dbRef, orderBy(orderConfig));
  else dBQuery = query(dbRef);

  const snapshot = await getDocs(dBQuery);
  return snapshot;
};

const fetchDocument = async (collectionName: string, docId: string = "") => {
  if (!docId || !collectionName)
    return console.error("fetchCollection: Invalid argument passed in");

  const docRef = doc(db, collectionName, docId);
  const docSnap = await getDoc(docRef);

  return docSnap;
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

export { fetchCollection, addData, setData, fetchDocument };
