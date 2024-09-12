"use client";
import React from "react";
import AuthContextProvider, { useAuth } from "../lib/contexts/AunthContext";
import Sidebar from "../components/Sidebar/Sidebar";
import useAdmin from "../lib/admin/read";

const Layout = ({ children }) => {
  return (
    <AuthContextProvider>
      <InnerLayout>{children}</InnerLayout>
    </AuthContextProvider>
  );
};

export default Layout;
const InnerLayout = ({ children }) => {
  const { user, isLoading: authIsLoading } = useAuth(); // ข้อมูบ user login ใน firebase
  const { data, error, isLoading } = useAdmin({ uid: user?.uid }); //ส่งข้อมูลที่ query จาก admins มาเป็นใน data
  if (authIsLoading || isLoading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  //ไม่มีข้อมูล admin || ไม่ใช่ admin
  if (!data) {
    return (
      <div className="items-center text-center p-5">
        <h1 className="font-bold">สวัสดีครับคุณ:{user?.displayName}</h1>
        <p>ขอบคุณที่ให้ความสนใจเรา</p>
      </div>
    );
  } //ข้อมูล admin || ใช่ admin
  if (data) {
    return (
      <section className="flex">
        <Sidebar />
        {children}
      </section>
    );
  }
};
