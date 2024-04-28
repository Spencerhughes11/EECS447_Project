import React, { ReactNode } from "react";
import Header from "./Header";
// import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function Format({ children }) {
  return (
    <>
      <Header />
      {children}
      {/* <Footer /> */}
    </>
  );
}
