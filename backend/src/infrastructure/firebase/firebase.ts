import admin from "firebase-admin";
import { initializeApp, getApps, FirebaseOptions } from "firebase/app";
import { getStorage } from "firebase/storage";
import serviceAccount from "./serviceAccount.json";
import dotenv from "dotenv";

dotenv.config();

if (!admin.apps.length)
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(
        Buffer.from(
          process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT as string,
          "base64"
        ).toString("ascii")
      ) as admin.ServiceAccount
    ),
  });

if (!getApps().length) {
  const firebaseConfig: FirebaseOptions = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  };

  initializeApp(firebaseConfig);
}

const auth = admin.auth();
const storage = getStorage();

export default { auth, storage };
