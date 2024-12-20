import { collection, addDoc } from 'firebase/firestore';

const createPost = async (postText, username) => {
  try {
    const docRef = await addDoc(collection(db, "posts"), {
      text: postText,
      username: username,
      likes: [],
      comments: [],
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
