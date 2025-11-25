import { getApps, initializeApp, cert, AppOptions } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

const options: AppOptions = {
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey,
  }),
  projectId: process.env.FIREBASE_PROJECT_ID,
};

const app = getApps().length ? getApps()[0] : initializeApp(options);

export const adminAuth = getAuth(app);
export const adminDb = getFirestore(app);


