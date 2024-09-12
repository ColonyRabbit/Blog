import Link from "next/link";
import { getAllCategories } from "@/app/lib/category/read_server";

export default async function Page() {
  const categories = await getAllCategories();
  return (
    <main className="p-5 grid grid-cols-5">
      <ul>
        {" "}
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <li key={index}>
              <CategoryCard category={category} />
            </li>
          ))
        ) : (
          <p>No categories found</p>
        )}
      </ul>
    </main>
  );
}
async function CategoryCard({ category }) {
  return (
    <Link href={`/categories/${category?.id}`}>
      <div className="flex flex-col items-center justify-center gap-2 hover:bg-blue-50 rounded-xl p-3">
        <img
          className="h-28 w-28 object-cover rounded-full"
          src={category?.iconURL}
          alt={category?.name}
        />
        <h1 className="font-bold">{category?.id}</h1>
      </div>
    </Link>
  );
}
