"use client";
import React, { useEffect } from "react";
import { useCategoryForm } from "./contexts/CategoryFormContext";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const updateCategoryId = searchParams.get("id");
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
  } = useCategoryForm();
  useEffect(() => {
    if (updateCategoryId) {
      fetchData(updateCategoryId);
    }
  }, [updateCategoryId]);

  return (
    <main className="w-full p-2">
      <div className="flex">
        <h1 className="font-bold">Category | Form</h1>
        {updateCategoryId && (
          <div className="bg-orange-400 rounded-full ml-2">
            <h3 className="font-bold">Update</h3>
          </div>
        )}
        {!updateCategoryId && (
          <div className="bg-green-400 rounded-full ml-2">
            <h3 className="font-bold">Create</h3>
          </div>
        )}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (updateCategoryId) {
            handleUpdate();
          } else {
            handleCreate();
          } // การสร้างข้อมูลควรทำใน onSubmit
        }}
        className="bg-blue-50 rounded-xl p-5"
      >
        <div className="flex flex-col gap-2">
          <label className="font-bold text-red-500">Category Name</label>
          <input
            className="w-96 bg-blue-50 px-4 py-2 rounded-full border"
            type="text"
            placeholder="Enter Category"
            onChange={(e) => {
              handleData("name", e.target.value);
            }}
            value={data?.name || ""} // Always provide a fallback value
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold text-red-500">Category Slug</label>
          <input
            className="w-96 bg-blue-50 px-4 py-2 rounded-full border"
            type="text"
            placeholder="Enter Category Slug"
            onChange={(e) => {
              handleData("slug", e.target.value); // Corrected to "slug"
            }}
            value={data?.slug || ""} // Always provide a fallback value
            required
          />
        </div>
        {data?.iconURL && (
          <div>
            <img className="h-60" src={data?.iconURL} alt="" />
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
            {isLoading ? "Loading..." : updateCategoryId ? "Update" : "Create"}
          </button>
        )}
        {updateCategoryId && !isDone && (
          <button
            onClick={(e) => {
              e.preventDefault();
              handleDelete(updateCategoryId);
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
            Successfully {updateCategoryId ? "Updated" : "Create"}
          </h3>
        )}
      </form>
    </main>
  );
};

export default Page;
