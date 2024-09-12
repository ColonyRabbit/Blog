"use client";
import { collection, onSnapshot } from "firebase/firestore";
import useSWRSubscription from "swr/subscription";
import { db } from "../firebase";
import { getDoc, doc } from "firebase/firestore"; // นำเข้า getDoc และ doc

export default function useAuthors() {
  const { data, error } = useSWRSubscription(
    ["authors"], // ชื่อต้องตรงกับใน collection ทุกตัวอักษรแปะๆ
    ([path], { next }) => {
      const ref = collection(db, path);
      const unsub = onSnapshot(
        ref,
        (snaps) => {
          next(
            null,
            snaps.docs.map((v) => v.data())
            
          );
        },
        (error) => {
          next(error?.message);
        }
      );
      return () => unsub();
    }
  );
  return {
    data,
    error,
    isLoading: data === undefined ? true : false,
  };
}
export const getAuthor = async (id) => {
  return getDoc(doc(db, `authors/${id}`));
};
