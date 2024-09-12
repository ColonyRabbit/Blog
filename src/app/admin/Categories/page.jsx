import React from "react";
import Link from "next/link";
import { CirclePlus } from "lucide-react";
import CategoriesListView from "./components/CategoriesListView";
const categories = () => {
  return (
    <main className="w-full p-6 bg-slate-50">
      <div className="flex p-5 justify-between items-center">
        <h1 className="font-bold">Categories</h1>
        <Link href={"/admin/categories/form"}>
          <button className="font-bold flex bg-blue-600 text-white rounded-full p-2">
            Add
            <CirclePlus />
          </button>
        </Link>
      </div>
      <CategoriesListView />
    </main>
  );
};

export default categories;
