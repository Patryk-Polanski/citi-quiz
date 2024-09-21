import { db } from "./index";
import {
  collection,
  getDocs,
  getDoc,
  orderBy,
  query,
  addDoc,
  setDoc,
  updateDoc,
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

const setData = (collectionName: string, docName: string, newData: unknown) => {
  if (!collectionName || !docName)
    return console.error("setData: Invalid arguments passed in");

  setDoc(doc(db, collectionName, docName), newData);
};

const updateData = (
  collectionName: string | undefined,
  docName: string | undefined,
  dataToUpdate: {
    [key: string]: unknown;
  },
) => {
  if (!collectionName || !docName)
    return console.error("updateData: Invalid arguments passed in");

  updateDoc(doc(db, collectionName, docName), dataToUpdate);
};

export { fetchCollection, addData, setData, fetchDocument, updateData };
