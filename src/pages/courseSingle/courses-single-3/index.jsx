import PageLinks from "@/components/common/PageLinks";
import Preloader from "@/components/common/Preloader";
import CourseDetailsThree from "@/components/courseSingle/CourseDetailsThree";

import CourseSlider from "@/components/courseSingle/CourseSlider";
import FooterOne from "@/components/layout/footers/FooterOne";
import { useParams } from "react-router-dom";
import Header from "@/components/layout/headers/Header";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title:
    "Couese-single-3 || Tutrx - Professional LMS Online Education Course ReactJS Template",
  description:
    "Elevate your e-learning content with Tutrx, the most impressive LMS template for online courses, education and LMS platforms.",
};

export default function CourseSinglePage3() {
  let params = useParams();
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />
      <Header />
      <div className="content-wrapper  js-content-wrapper ">
        <PageLinks />
        <CourseDetailsThree id={params.id} />
        <CourseSlider />
        <FooterOne />
      </div>
    </div>
  );
}
