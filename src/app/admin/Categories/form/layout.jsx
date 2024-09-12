import React from "react";
import CategoryFormContextProvider from "./contexts/CategoryFormContext";
const layout = ({ children }) => {
  return <CategoryFormContextProvider>{children}</CategoryFormContextProvider>;
};

export default layout;
