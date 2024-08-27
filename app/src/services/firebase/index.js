// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getPerformance } from "firebase/performance";
import { getStorage } from "firebase/storage";
import config from "./firebase.config";

const app = initializeApp(config);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const perf = getPerformance(app);

export { app, auth, db, perf, storage };
