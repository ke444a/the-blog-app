import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "blog-app-841e2.firebaseapp.com",
    projectId: "blog-app-841e2",
    storageBucket: "blog-app-841e2.appspot.com",
    messagingSenderId: "326210252150",
    appId: "1:326210252150:web:cafc368227c925fe65de57"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);