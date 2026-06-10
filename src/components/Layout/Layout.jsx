import React from "react";
import { Header } from "../HeaderFooter/Header";

export const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};
