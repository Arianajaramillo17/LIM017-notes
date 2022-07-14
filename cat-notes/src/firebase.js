// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore,updateDoc, doc } from 'firebase/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCG-zNzqA970AvF1INxXD5aP0UAPxTapvU",
  authDomain: "cat-notes-fef35.firebaseapp.com",
  projectId: "cat-notes-fef35",
  storageBucket: "cat-notes-fef35.appspot.com",
  messagingSenderId: "996104197876",
  appId: "1:996104197876:web:42e5dee467f30c2b5830a1",
  measurementId: "G-C159JX9QQW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db=getFirestore(app);
export const updateNote = async (id, title, post) => {
  console.log(id, title,post);
  await updateDoc(doc(db, 'notes', id), {title:title, post: post})}
