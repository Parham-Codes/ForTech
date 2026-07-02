import React from "react";
import { Outlet } from "react-router-dom";
import XlHeader from "../components/header&hero/pcHeader/header";
import Footer from "../components/footer/footer/footer";
import XSHeader from "../components/header&hero/resHeader/header";

function MainLayout() {
  return (
    <>
      <XlHeader />
      <XSHeader />
      <Outlet />
      <Footer />
    </>
  );
}

export default MainLayout;
