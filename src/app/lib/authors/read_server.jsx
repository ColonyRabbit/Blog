import { db } from "@/app/lib/firebase";
import { getDoc,doc } from "firebase/firestore";
export const getAuthor = async (id) => {
  return await getDoc(doc(db, `authors/${id}`)).then((snap)=>snap.data())
};
