import BrandsTwo from "@/components/homes/brands/BrandsTwo";
import HeroFive from "@/components/homes/heros/HeroFive";
import HeaderFive from "@/components/layout/headers/HeaderFive";
import CoursesFive from "@/components/homes/courses/CoursesFive";
import React from "react";
import CategoriesFive from "@/components/homes/categories/CategoriesFive";
import Instructors from "@/components/common/Instructors";
import StudentsFive from "@/components/homes/students/StudentsFive";
import LearningPathFive from "@/components/common/LearningCommon";
import Pricing from "@/components/homes/pricing/Pricing";

import GetAppFive from "@/components/homes/getApp/GetAppFive";
import BlogsFive from "@/components/homes/blogs/BlogsFive";
import RecomentationFive from "@/components/homes/LearningRecomentation/RecomentationFive";
import FooterFive from "@/components/layout/footers/FooterFive";
import Preloader from "@/components/common/Preloader";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title:
    "Home-5 || Tutrx - Professional LMS Online Education Course ReactJS Template",
  description:
    "Elevate your e-learning content with Tutrx, the most impressive LMS template for online courses, education and LMS platforms.",
};

export default function HomePage5() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />
      <HeaderFive />
      <div className="content-wrapper  js-content-wrapper overflow-hidden">
        <HeroFive />
        <BrandsTwo />
        <CoursesFive />
        <CategoriesFive />
        <Instructors backgroundColor={"bg-beige-1"} />
        <StudentsFive />
        <LearningPathFive />
        <Pricing />
        <GetAppFive />
        <BlogsFive />
        <RecomentationFive />
        <FooterFive />
      </div>
    </div>
  );
}
