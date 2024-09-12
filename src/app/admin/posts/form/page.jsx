"use client";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { usePostForm } from "./contexts/PostFormContext";
import useCategories from "@/app/lib/category/read";
import useAuthors from "@/app/lib/authors/read";
import { RTEField } from "./components/RTEField";

const Page = () => {
  const searchParams = useSearchParams();
  const updatePostid = searchParams.get("id");
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
  } = usePostForm();
  useEffect(() => {
    if (updatePostid) {
      fetchData(updatePostid);
    }
  }, [updatePostid]);

  return (
    <main className="w-full p-6 flex flex-col gap-3 ">
      <div className="flex gap-5 items-center">
        <h1 className="font-bold">Post | Form</h1>
        {updatePostid && (
          <div className="bg-orange-400 rounded-full ml-2">
            <h3 className="font-bold">Update</h3>
          </div>
        )}
        {!updatePostid && (
          <div className="bg-green-400 rounded-full ml-2">
            <h3 className="font-bold">Create</h3>
          </div>
        )}
      </div>
      <section className="flex gap-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (updatePostid) {
              handleUpdate();
            } else {
              handleCreate();
            } // การสร้างข้อมูลควรทำใน onSubmit
          }}
          className="bg-blue-50 rounded-xl p-5"
        >
          <div className="flex flex-col gap-2">
            <label className="font-bold text-red-500">title</label>
            <input
              className="w-96 bg-blue-50 px-4 py-2 rounded-full border"
              type="text"
              placeholder="Enter title"
              onChange={(e) => {
                handleData("title", e.target.value);
              }}
              value={data?.title || ""} // Always provide a fallback value
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-bold text-red-500">Post Slug</label>
            <input
              className="w-96 bg-blue-50 px-4 py-2 rounded-full border"
              type="text"
              placeholder="Enter Post Slug"
              onChange={(e) => {
                handleData("slug", e.target.value); // Corrected to "slug"
              }}
              value={data?.slug || ""} // Always provide a fallback value
              required
            />
          </div>
          <SelectCategoryField />

          <SelectAuthorField />

          {data?.imageURL && (
            <div>
              <img className="h-60" src={image} alt="" />
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
              {isLoading ? "Loading..." : updatePostid ? "Update" : "Create"}
            </button>
          )}
          {updatePostid && !isDone && (
            <button
              onClick={(e) => {
                e.preventDefault();
                handleDelete(updatePostid);
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
              Successfully {updatePostid ? "Updated" : "Create"}
            </h3>
          )}
        </form>
        <RTEField />
      </section>
    </main>
  );
};
function SelectCategoryField() {
  const { data, handleData } = usePostForm();
  const { data: categories } = useCategories(); //บรรทัดนี้ทำการดึงค่า data จาก useCategories แล้วเปลี่ยนชื่อ data ให้เป็น categories เพื่อให้ชื่อสอดคล้องกับข้อมูลที่มันถืออยู่นั่นเอง

  return (
    <div className="flex flex-col gap-2">
      <label className="font-bold text-red-500">Select Category</label>
      <select
        className="w-96 bg-withe-100 px-4 py-2  rounded-full border font-bold"
        name="category"
        id="category"
        value={data?.categoryId}
        onChange={(e) => handleData("categoryId", e.target.value)}
        required
      >
        <option value="">Select Category</option>
        {categories &&
          categories?.map((item, index) => {
            return (
              <option key={index} value={item.id}>
                {item?.name}
              </option>
            );
          })}
      </select>
    </div>
  );
}
function SelectAuthorField() {
  const { data, handleData } = usePostForm();
  const { data: authors } = useAuthors(); //บรรทัดนี้ทำการดึงค่า data จาก authors แล้วเปลี่ยนชื่อ data ให้เป็น authors เพื่อให้ชื่อสอดคล้องกับข้อมูลที่มันถืออยู่นั่นเอง

  return (
    <div className="flex flex-col gap-2">
      <label className="font-bold text-red-500"> Select Author</label>
      <select
        className="w-96 bg-withe-100 px-4 py-2  rounded-full border font-bold"
        name="Author"
        id="Author"
        value={data?.authorId}
        onChange={(e) => handleData("authorId", e.target.value)}
        required
      >
        <option value="">Select Author</option>
        {authors &&
          authors?.map((item, index) => {
            return (
              <option key={index} value={item?.id}>
                {item?.name}
              </option>
            );
          })}
      </select>
    </div>
  );
}
export default Page;
