import axios from "axios";
import {storage} from "../Firebase";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// export const fetchUser = async () => {
//   const authToken = localStorage.getItem('authToken');
//   try {
//     const response = await axios.get('https://education-backend-jade.vercel.app/api/profile/getUser', {
//       headers: {
//         Authorization: `Bearer ${authToken}`
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//     return null; // Return null or handle the error as needed
//   }
// };




export async function uploadFile(file, folderPath) {
  try {
    if (!file) throw new Error("No file provided");
    // Create a unique file name with a timestamp
    const fileName = `${Date.now()}-${file.name}`;
    const fileRef = ref(storage, `${folderPath}/${fileName}`);
    // Upload the file to Firebase Storage
    const snapshot = await uploadBytes(fileRef, file);
    // Get the file's download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL; // Returns the file's URL
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}