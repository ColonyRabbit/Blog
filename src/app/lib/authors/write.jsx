import { db, storage } from "@/app/lib/firebase";
import { setDoc, Timestamp, doc, updateDoc, deleteDoc, collection } from "firebase/firestore";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";

export const createNewAuthor = async ({ data, image }) => {
  if (!data?.name) {
    throw new Error("Name is not defined");
  }

  if (!image) {
    throw new Error("Image is not defined");
  }
const id = doc(collection(db,'ids')).id
  const imageRef = ref(storage, `authors/${id}.png`);
  await uploadBytes(imageRef, image);
  const imageURL = await getDownloadURL(imageRef);

  const firestoreRef = doc(db, `authors/${id}`); //collection author ถ้าไม่เคยสร้าง firebase จะสร้างให้
  await setDoc(firestoreRef, {
    ...data,
    id:id,
    photoAuthorURL: imageURL,
    timestamp: Timestamp.now(),
  });
};
export const updateAuthor = async ({ data, image }) => {
  if (!data?.name) {
    throw new Error("Name is not defined");
  }

  var imageURL = data?.photoURL;
  if (image) {
    const imageRef = ref(storage, `authors/${data?.id}.png`);
    await uploadBytes(imageRef, image);
     imageURL = await getDownloadURL(imageRef);
  }

  const firestoreRef = doc(db, `authors/${data?.id}`);
  await updateDoc(firestoreRef, {
    ...data,
    photoURL: imageURL,
    timestamp: Timestamp.now(),
  });
};
export const deleteAuthor = async (id) => {
  if (!id) {
    throw new Error("Id is reqired");
  }
  await deleteDoc(doc(db,`authors/${id}`)) //ชื่อ collection ต้องตรงแปะๆตัวเล็ก_ใหญ๋
};
