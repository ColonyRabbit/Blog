import { db } from "@/app/lib/firebase";
import {
  getDocs,
  getDoc,
  doc,
  collection,
  query,
  where,
} from "firebase/firestore";
export const getCategory = async (id) => {
  return await getDoc(doc(db, `categories/${id}`)).then((snap) => snap.data());
};
export const getAllCategories = async () => {
  return await getDocs(collection(db, "categories")).then((snaps) =>
    snaps.docs.map((d) => d.data())
  );
};
export const getAllPostsWithCategory = async (categoryId) => {
  const q = query(
    collection(db, "posts"),
    where("categoryId", "==", categoryId)
  );
  return await getDocs(q).then((snaps) => snaps.docs.map((d) => d.data()));
};
