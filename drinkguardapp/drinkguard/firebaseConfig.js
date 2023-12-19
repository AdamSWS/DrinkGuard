import { initializeApp } from "@firebase/app";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from "@firebase/auth";
import { getDatabase } from "@firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

export const DRINKGUARD_APP = initializeApp(firebaseConfig);

export const DRINKGUARD_AUTH = initializeAuth(DRINKGUARD_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const DRINKGUARD_DB = getDatabase(DRINKGUARD_APP);
