import React from "react";
import Navbar from "../Nabar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import MainSlider from "../MainSlider/MainSlider";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="pt-24 pb-8 container mx-auto px-12">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
