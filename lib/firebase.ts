// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyCnoNMJho2jwJRuiopvG1eEVLhqgW6aOQA",
//   authDomain: "fir-c73cc.firebaseapp.com",
//   projectId: "fir-c73cc",
//   storageBucket: "fir-c73cc.appspot.com",
//   messagingSenderId: "918970259497",
//   appId: "1:918970259497:web:027c6c90b04b3cf6926438",
//   measurementId: "G-F263SY57CH"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize services
// const auth = getAuth(app);
// const db = getFirestore(app);
// const storage = getStorage(app);

// export { auth, db, storage };


// Make sure you're initializing Firebase properly
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCnoNMJho2jwJRuiopvG1eEVLhqgW6aOQA",
  authDomain: "fir-c73cc.firebaseapp.com",
  projectId: "fir-c73cc",
  storageBucket: "fir-c73cc.appspot.com",
  messagingSenderId: "918970259497",
  appId: "1:918970259497:web:027c6c90b04b3cf6926438",
  measurementId: "G-F263SY57CH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);  // Make sure this is exported


// // lib/firebase.ts
// // lib/firebase.ts


// // import { initializeApp } from "firebase/app";
// // import { initializeAuth, getReactNativePersistence } from "firebase/auth/react-native";
// // import AsyncStorage from "@react-native-async-storage/async-storage";
// // import { getFirestore } from "firebase/firestore";

// // const firebaseConfig = {
// //   apiKey: "AIzaSyCnoNMJho2jwJRuiopvG1eEVLhqgW6aOQA",
// //   authDomain: "fir-c73cc.firebaseapp.com",
// //   projectId: "fir-c73cc",
// //   storageBucket: "fir-c73cc.appspot.com",
// //   messagingSenderId: "918970259497",
// //   appId: "1:918970259497:web:027c6c90b04b3cf6926438",
// //   measurementId: "G-F263SY57CH"
// // };

// // const app = initializeApp(firebaseConfig);

// // const auth = initializeAuth(app, {
// //   persistence: getReactNativePersistence(AsyncStorage),
// // });

// // const db = getFirestore(app);

// // export { auth, db };




// lib/firebase.ts



// import { initializeApp, getApps } from "firebase/app";
// import { initializeAuth, getReactNativePersistence } from "firebase/auth/react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyCnoNMJho2jwJRuiopvG1eEVLhqgW6aOQA",
//   authDomain: "fir-c73cc.firebaseapp.com",
//   projectId: "fir-c73cc",
//   storageBucket: "fir-c73cc.appspot.com",
//   messagingSenderId: "918970259497",
//   appId: "1:918970259497:web:027c6c90b04b3cf6926438",
//   measurementId: "G-F263SY57CH"
// };

// const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage),
// });
// const db = getFirestore(app);
// const storage = getStorage(app);

// export { auth, db, storage };
