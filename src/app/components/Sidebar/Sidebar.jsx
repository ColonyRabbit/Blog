import React from "react";
import Link from "next/link";
import { Gauge, LayoutList, Layers, User } from "lucide-react";
const Sidebar = () => {
  const link = [
    {
      name: "Dashboard",
      link: "/admin",
      icon: <Gauge />,
    },
    {
      name: "Post",
      link: "/admin/posts",
      icon: <LayoutList />,
    },
    {
      name: "Categories",
      link: "/admin/categories",
      icon: <Layers />,
    },
    {
      name: "Authors",
      link: "/admin/authors",
      icon: <User />,
    },
  ];
  return (
<section className="w-[350px] border-r h-screen p-1">
  <ul className="w-full">
    {link.map((item, index) => {
      return (
        <Link key={index} href={item.link}>
          <li className="flex p-3 justify-start items-center mt-5 bg-blue-100 rounded-lg">
            <div className="mr-4">{item.icon}</div> {/* ไอคอนชิดซ้าย */}
            <div className="flex-1 text-center"> {/* ข้อความอยู่กลาง */}
              <span className="font-bold">{item.name}</span>
            </div>
          </li>
        </Link>
      );
    })}
  </ul>
</section>
  );
};

export default Sidebar;
