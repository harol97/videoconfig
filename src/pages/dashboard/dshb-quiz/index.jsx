import Preloader from "@/components/common/Preloader";
import DashboardOne from "@/components/dashboard/DashboardOne";
import Quiz from "@/components/dashboard/Quiz";
import Sidebar from "@/components/dashboard/Sidebar";
import HeaderDashboard from "@/components/layout/headers/HeaderDashboard";
import React from "react";
import MetaComponent from "@/components/common/MetaComponent";
import QuizTable from "@/components/dashboard/StudentQuiz/QuizTable";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const metadata = {
  title:
    "Dashboard-quiz || Tutrx - Professional LMS Online Education Course ReactJS Template",
  description:
    "Elevate your e-learning content with Tutrx, the most impressive LMS template for online courses, education and LMS platforms.",
};
export default function DshbQuizPage() {
   const userData = useSelector((state) => state.auths);
  const role = import.meta.env.VITE_ACTIVE_ROLE || "teacher"; // fallback role for testing
  const navigate = useNavigate();
  return (
    <div className="barba-container" data-barba="container">
      <MetaComponent meta={metadata} />
      <main className="main-content">
        <Preloader />
        <HeaderDashboard />
        <div className="content-wrapper js-content-wrapper overflow-hidden">
          <div
            id="dashboardOpenClose"
            className="dashboard -home-9 js-dashboard-home-9"
          >
            <div className="dashboard__sidebar scroll-bar-1">
              <Sidebar />
            </div>
             {(role === "student" || role === "admin" || role === "teacher" ) && (
          
            <QuizTable />
             )}
             {/* {(role === "teacher" || role === "admin") && (
            <Quiz />
             )} */}
          </div>
        </div>
      </main>
    </div>
  );
}
