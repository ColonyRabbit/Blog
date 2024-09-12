"use client";

import useCollectionCount from "../lib/count";

export default function CountCard({ path, name, icon }) {
  const { data, isLoading, error } = useCollectionCount({ path: path });

  if (isLoading) {
    return <h2>Loading ...</h2>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex gap-2 bg-slate-500 items-center rounded-xl px-4 py-2 m-2">
      {icon}
      <h1 className="font-bold">{name}</h1>
      <h2>{data?.count}</h2>
    </div>
  );
}
