import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBhI9LxMoADT5ce3DjFIHEbb6pPRbYMWwg",
  authDomain: "ninja-todo-assistant.firebaseapp.com",
  projectId: "ninja-todo-assistant",
  storageBucket: "ninja-todo-assistant.firebasestorage.app",
  messagingSenderId: "303738036585",
  appId: "1:303738036585:web:cd7199e63830c93f01ddf8",
  measurementId: "G-FNW1C2K0ZK"
};


export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
