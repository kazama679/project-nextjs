// trong cái file này thì sẽ đi cấu hình với firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_KEY_FIREBASE,
  authDomain: "xuanquang-14d06.firebaseapp.com",
  projectId: "xuanquang-14d06",
  storageBucket: "xuanquang-14d06.appspot.com",
  messagingSenderId: "475318555312",
  appId: "1:475318555312:web:4c009f5a2388561fcea175"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);