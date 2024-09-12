"use client";
import { collection, onSnapshot, doc } from "firebase/firestore";
import useSWRSubscription from "swr/subscription";
import { db } from "../firebase";

export default function useAdmin({ uid }) {
  const { data, error } = useSWRSubscription(
    [`admins/${uid}`], // ชื่อต้องตรงกับใน collection ทุกตัวอักษรแปะๆ
    ([path], { next }) => {
      const ref = doc(db, path);
      const unsub = onSnapshot(
        ref,
        (snap) => {
          next(null, snap.exists() ? snap.data() : null);
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
