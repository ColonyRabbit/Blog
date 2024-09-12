import { db, storage } from "@/app/lib/firebase";
import { setDoc, Timestamp, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";

export const 


createNewPost = async ({ data, image }) => {
  if (!data?.title) {
    throw new Error("Title is not defined");
  }
  if (!data?.slug) {
    throw new Error("Slug is not defined");
  }
  if (!image) {
    throw new Error("Image is not defined");
  }

  const imageRef = ref(storage, `posts/${data?.slug}`);
  await uploadBytes(imageRef, image);
  const imageURL = await getDownloadURL(imageRef);

  const firestoreRef = doc(db, `posts/${data?.slug}`);
  await setDoc(firestoreRef, {
    ...data,
    id: data?.slug,
    imageURL: imageURL,
    timestamp: Timestamp.now(),
  });
};
export const updatePost = async ({ data, image }) => {
  if (!data?.title) {
    throw new Error("Name is not defined");
  }
  if (!data?.slug) {
    throw new Error("Slug is not defined");
  }
  var imageURL = data?.imageURL;
  if (image) {
    const imageRef = ref(storage, `posts/${data?.slug}.png`);
    await uploadBytes(imageRef, image);
     imageURL = await getDownloadURL(imageRef);
  }

  const firestoreRef = doc(db, `posts/${data?.id}`);
  await updateDoc(firestoreRef, {
    ...data,
    imageURL: imageURL,
    timestamp: Timestamp.now(),
  });
};
export const deletePost = async (id) => {
  if (!id) {
    throw new Error("Id is reqired");
  }
  await deleteDoc(doc(db,`posts/${id}`))//ชื่อ collection ต้องตรงแปะๆตัวเล็ก_ใหญ๋
};
