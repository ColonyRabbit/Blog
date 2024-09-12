"use client";
import { getAuthor } from "../../../../lib/authors/read";
import {
  createNewAuthor,
  updateAuthor,
  deleteAuthor,
} from "@/app/lib/authors/write";
import { useRouter } from "next/navigation";
import React, { Children, useContext, useState } from "react";
import { createContext } from "react";
const AuthorFormContext = createContext();
export default function AuthorFormContextProvider({ children }) {
  const router = useRouter();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDone, setIsDone] = useState(false);
  const [image, setImage] = useState(null);
  const handleData = (key, value) => {
    setIsDone(false);
    setData({
      ...data,
      [key]: value,
    });
  };
  const handleCreate = async () => {
    setError(null);
    setIsLoading(true);
    setIsDone(false);
    try {
      await createNewAuthor({ data: data, image: image });
      setIsDone(true);
    } catch (error) {
      setError(error?.message);
    }
    setIsLoading(false);
  };
  const handleUpdate = async () => {
    setError(null);
    setIsLoading(true);
    setIsDone(false);
    try {
      await updateAuthor({ data: data, image: image });
      setIsDone(true);
    } catch (error) {
      setError(error?.message);
    }
    setIsLoading(false);
  };
  const handleDelete = async (id) => {
    router.push(`/admin/authors`);
    setError(null);
    setIsLoading(true);
    setIsDone(false);
    try {
      await deleteAuthor(id);
      setIsDone(true);
    } catch (error) {
      setError(error?.message);
    }
    setIsLoading(false);
  };
  const fetchData = async (id) => {
    setError(null);
    setIsLoading(false);
    setIsDone(false);
    try {
      const res = await getAuthor(id);
      if (res.exists()) {
        setData(res.data());
      } else {
        throw new Error(`No Authors found from ${id}`);
      }
    } catch (error) {
      setError(error?.message);
    }
  };
  return (
    <AuthorFormContext.Provider
      value={{
        data,
        isLoading,
        error,
        isDone,
        handleData,
        handleCreate,
        handleUpdate,
        handleDelete,
        image,
        setImage,
        fetchData,
      }}
    >
      {children}
    </AuthorFormContext.Provider>
  );
}

export const useAuthorsForm = () => useContext(AuthorFormContext);
