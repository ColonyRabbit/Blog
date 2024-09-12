"use client";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAuthorsForm } from "./contexts/AuthorFormContext";
const Page = () => {
  const searchParams = useSearchParams();
  const updateAuthorId = searchParams.get("id");
  const {
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
  } = useAuthorsForm();
  useEffect(() => {
    if (updateAuthorId) {
      fetchData(updateAuthorId);
    }
  }, [updateAuthorId]);

  return (
    <main className="w-full p-2">
      <div className="flex">
        <h1 className="font-bold">Author | Form</h1>
        {updateAuthorId && (
          <div className="bg-orange-400 rounded-full ml-2">
            <h3 className="font-bold">Update</h3>
          </div>
        )}
        {!updateAuthorId && (
          <div className="bg-green-400 rounded-full ml-2">
            <h3 className="font-bold">Create</h3>
          </div>
        )}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (updateAuthorId) {
            handleUpdate();
          } else {
            handleCreate();
          } // การสร้างข้อมูลควรทำใน onSubmit
        }}
        className="bg-blue-50 rounded-xl p-5"
      >
        <div className="flex flex-col gap-2">
          <label className="font-bold text-red-500">Author Name</label>
          <input
            className="w-96 bg-blue-50 px-4 py-2 rounded-full border"
            type="text"
            placeholder="Enter Author"
            onChange={(e) => {
              handleData("name", e.target.value);
            }}
            value={data?.name || ""} // Always provide a fallback value
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold text-red-500">Author email</label>
          <input
            className="w-96 bg-blue-50 px-4 py-2 rounded-full border"
            type="email"
            placeholder="Enter Author email"
            onChange={(e) => {
              handleData("email", e.target.value); // Corrected to "slug"
            }}
            value={data?.email || ""} // Always provide a fallback value
            required
          />
        </div>
        {data?.photoAuthorURL && (
          <div>
            <img className="h-60" src={data?.photoAuthorURL} alt={data?.photoAuthorURL} />
          </div>
        )}
        {image && (
          <div>
            <img className="h-60" src={URL.createObjectURL(image)} alt="" />
          </div>
        )}
        <div className="flex flex-col gap-2">
          <label className="font-bold text-red-500">Image</label>
          <input
            className="w-96 bg-blue-50 px-4 py-2 rounded-full border"
            type="file"
            accept="image/*"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {!isDone && (
          <button
            disabled={isLoading || isDone}
            type="submit"
            className="bg-blue-700 rounded-xl p-2 m-2 w-full font-bold text-white"
          >
            {isLoading ? "Loading..." : updateAuthorId ? "Update" : "Create"}
          </button>
        )}
        {updateAuthorId && !isDone && (
          <button
            onClick={(e) => {
              e.preventDefault();
              handleDelete(updateAuthorId);
            }}
            disabled={isLoading || isDone}
            type="submit"
            className="bg-red-700 rounded-xl p-2 m-2 w-full font-bold text-white"
          >
            {isLoading ? "Loading..." : "Delete"}
          </button>
        )}
        {isDone && (
          <h3 className="text-green-500 font-bold text-xl">
            Successfully {updateAuthorId ? "Updated" : "Create User"}
          </h3>
        )}
      </form>
    </main>
  );
};

export default Page;
