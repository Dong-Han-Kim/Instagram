// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.apiKey,
//   authDomain: process.env.authDomain,
//   projectId: process.env.projectId,
//   storageBucket: 'gs://instagram-f6362.appspot.com',
//   messagingSenderId: process.env.messagingSenderId,
//   appId: process.env.appId
// };

const firebaseConfig = {
  apiKey:'AIzaSyCymjWUUwuQK5bO2K7fdCR9MjrHTzXyV-E',
  authDomain:'instagram-f6362.firebaseapp.com',
  projectId:'instagram-f6362',
  storageBucket:'instagram-f6362.appspot.com',
  messagingSenderId:'926529838532',
  appId:'1:926529838532:web:9b7dd1f7ab0bb988411891'
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// 대부분의 값을 저장하는 DB
export const firestore = getFirestore(app);
// 이미지만을 저장하기 위한 저장소
export const storage = getStorage(app);