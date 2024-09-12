import { PostCard } from "@/app/components/PostlistView";
import {
  getAllPostsWithCategory,
  getCategory,
} from "@/app/lib/category/read_server";
import React from "react";

const page = async ({ params }) => {
  const categoryId = decodeURIComponent(params.categories);
  const posts = await getAllPostsWithCategory(categoryId);
  return (
    <main>
      <CategoryCard categoryId={categoryId} />

      <div className="flex grid-cols-5 justify-center m-5  ">
        {posts && posts.length > 0 ? (
          posts?.map((post, key) => (
            <div key={key} className="w-full hover:bg-slate-200 rounded-xl">
              <PostCard post={post} key={post.id} />
            </div>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </main>
  );
};

export default page;
async function CategoryCard({ categoryId }) {
  const category = await getCategory(categoryId);
  return (
    <div className="justify-center flex gap-2 items-center p-1 m-2">
      <img
        className="h-20 w-20 rounded-full object-cover"
        src={category?.iconURL}
        alt={category?.name}
      />
      <h4 className="font-bold text-xl text-gray-400">{category?.id}</h4>
    </div>
  );
}
