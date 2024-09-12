import { db, storage } from "@/app/lib/firebase";
import { setDoc, Timestamp, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";

export const createNewCategory = async ({ data, image }) => {
  if (!data?.name) {
    throw new Error("Name is not defined");
  }
  if (!data?.slug) {
    throw new Error("Slug is not defined");
  }
  if (!image) {
    throw new Error("Image is not defined");
  }

  const imageRef = ref(storage, `categories/${data?.slug}`);
  await uploadBytes(imageRef, image);
  const imageURL = await getDownloadURL(imageRef);

  const firestoreRef = doc(db, `categories/${data?.slug}`);
  await setDoc(firestoreRef, {
    ...data,
    id: data?.slug,
    iconURL: imageURL,
    timestamp: Timestamp.now(),
  });
};
export const updateCategory = async ({ data, image }) => {
  if (!data?.name) {
    throw new Error("Name is not defined");
  }
  if (!data?.slug) {
    throw new Error("Slug is not defined");
  }
  var imageURL = data?.iconURL;
  if (image) {
    const imageRef = ref(storage, `categories/${data?.slug}.png`);
    await uploadBytes(imageRef, image);
     imageURL = await getDownloadURL(imageRef);
  }

  const firestoreRef = doc(db, `categories/${data?.id}`);
  await updateDoc(firestoreRef, {
    ...data,
    iconURL: imageURL,
    timestamp: Timestamp.now(),
  });
};
export const deleteCategory = async (id) => {
  if (!id) {
    throw new Error("Id is reqired");
  }
  await deleteDoc(doc(db,`categories/${id}`))//ชื่อ collection ต้องตรงแปะๆตัวเล็ก_ใหญ๋
};
