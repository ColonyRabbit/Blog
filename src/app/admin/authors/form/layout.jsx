import React, { Children } from "react";
import AuthorFormContextProvider from "./contexts/AuthorFormContext";
const layout = ({ children }) => {
  return <AuthorFormContextProvider>{children}</AuthorFormContextProvider>;
};

export default layout;
