import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDOVFRYWAQ24eNeiyyGQdDdETkCxCqP_9g",
  authDomain: "chat-auth-3e335.firebaseapp.com",
  projectId: "chat-auth-3e335",
  storageBucket: "chat-auth-3e335.appspot.com",
  messagingSenderId: "933561286348",
  appId: "1:933561286348:web:630adcc4214789f9d08c69",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage), 
});

export const db = getFirestore(app);
export const storage = getStorage(app);

export const usersRef = collection(db, "users");
export const roomRef = collection(db, "rooms");
