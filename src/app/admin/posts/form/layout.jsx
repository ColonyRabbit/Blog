import PostFormContextProvider from "./contexts/PostFormContext";
import React, { Children } from "react";
export default function Layout({ children }) {
  return <PostFormContextProvider>{children}</PostFormContextProvider>;
}
