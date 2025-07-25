import BlogsOne from "@/components/blogs/BlogsOne";
import ShopCart from "@/components/cartsAndCheckout/ShopCart";
import PageLinks from "@/components/common/PageLinks";
import Preloader from "@/components/common/Preloader";

import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";

import React from "react";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title:
    "Shop-cart || Tutrx - Professional LMS Online Education Course ReactJS Template",
  description:
    "Elevate your e-learning content with Tutrx, the most impressive LMS template for online courses, education and LMS platforms.",
};
export default function ShopCartPage() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />

      <Header />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <PageLinks />

        <ShopCart />

        <FooterOne />
      </div>
    </div>
  );
}
