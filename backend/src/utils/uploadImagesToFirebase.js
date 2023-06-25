import { storage } from "../config/firebase.js";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import sharp from "sharp";

export const uploadImagesToFirebase = async (fileBuffer) => {
    const compressedImg = await sharp(fileBuffer)
        .webp({ quality: 70 })
        .toBuffer();     

    const storageRef = ref(storage, `/posts/${"post-"+Date.now()}`);
    const snapshot = await uploadBytes(storageRef, compressedImg);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
};