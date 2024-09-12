"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/app/lib/contexts/AunthContext";
const Loggin_bottom = () => {
  const { user, isLoading, error, handleSignInWithGoolgle, handleLogout } =
    useAuth();
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (user) {
    return (
      <div className="flex gap-4 items-center">
        <button
          onClick={() => handleLogout()}
          className="flex items-center gap-3 bg-black text-white px-4 py-2 rounded-full"
        >
          Logout
        </button>
        <Link href="/admin">
          <div className="flex gap-4 rounded-xl bg-blue-100 px-4 py-2 rounded flex-wrap">
            <img
              className="object-cover h-12 w-12 rounded-full"
              src={user?.photoURL}
              alt={user?.displayName}
              width={50}
              height={50}
            />
            <div>
              {" "}
              <h1 className="font-bold">{user?.displayName}</h1>
              <h2>{user?.email}</h2>
            </div>
          </div>
        </Link>
      </div>
    );
  }
  return (
    <section>
      <button
        onClick={() => {
          handleSignInWithGoolgle();
        }}
        className="bg-blue-500 gap-1 text-white px-4 py-2 rounded-full"
      >
        {/* <Image src="/google.png" width={30} height={30} alt="" /> */}
        Login with google
      </button>
    </section>
  );
};

export default Loggin_bottom;
