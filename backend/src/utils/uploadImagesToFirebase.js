import { storage } from "../config/firebase.js";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import sharp from "sharp";

export const uploadPostToFirebase = async (fileBuffer) => {
    const compressedImg = await sharp(fileBuffer)
        .resize({ height: 400 })
        .webp({ quality: 70 })
        .toBuffer();     

    const storageRef = ref(storage, `/posts/${"post-"+Date.now()}`);
    const snapshot = await uploadBytes(storageRef, compressedImg);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
};

export const uploadUserToFirebase = async (fileBuffer, username) => {
    const compressedImg = await sharp(fileBuffer)
        .resize({ width: 200, height: 200 })
        .webp({ quality: 70 })
        .toBuffer();     

    const storageRef = ref(storage, `/users/${username}`);
    const snapshot = await uploadBytes(storageRef, compressedImg);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
};