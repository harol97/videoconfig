import LearningPathSix from "@/components/common/LearningPathSix";
import HeroSix from "@/components/homes/heros/HeroSix";
import HeaderSix from "@/components/layout/headers/HeaderSix";
import CoursesSix from "@/components/homes/courses/CoursesSix";
import React from "react";
import Teachers from "@/components/homes/instractors/Teachers";
import CategoriesSix from "@/components/homes/categories/CategoriesSix";
import TestimonialsSix from "@/components/homes/testimonials/TestimonialsSix";
import BrandsSix from "@/components/homes/brands/BrandsSix";
import LearningPathsSix from "@/components/homes/LearningPath/LearningPathsSix";
import CountdownRegistration from "@/components/homes/CountdownRegistration";
import EventsSix from "@/components/homes/events/EventsSix";
import BlogsTwo from "@/components/homes/blogs/BlogsTwo";
import GetAppSix from "@/components/homes/getApp/GetAppSix";
import FooterThree from "@/components/layout/footers/FooterThree";
import Preloader from "@/components/common/Preloader";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title:
    "Home-6 || Tutrx - Professional LMS Online Education Course ReactJS Template",
  description:
    "Elevate your e-learning content with Tutrx, the most impressive LMS template for online courses, education and LMS platforms.",
};

export default function HomePage6() {
  return (
    <div className="main-content">
      <MetaComponent meta={metadata} />
      <Preloader />
      <HeaderSix />
      <div className="content-wrapper  js-content-wrapper overflow-hidden">
        <HeroSix />
        <LearningPathSix />
        <CoursesSix />
        <Teachers />
        <CategoriesSix />
        <TestimonialsSix />
        <BrandsSix />
        <LearningPathsSix />
        <CountdownRegistration />
        <EventsSix />
        <BlogsTwo />
        <GetAppSix />
        <FooterThree />
      </div>
    </div>
  );
}
