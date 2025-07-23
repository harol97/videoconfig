import { resentCourses } from "@/data/courses";
import { states } from "@/data/dashboard";
import { teamMembers } from "@/data/instractors";
import { notifications } from "@/data/notifications";
import { sessions } from "@/data/session";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import FooterNine from "../layout/footers/FooterNine";
import Charts from "./Charts";
import PieChartComponent from "./PieCharts";

import { Link, useNavigate } from "react-router-dom";
const ddItems = [
  { id: 1, label: "Upcomming Sessions " },
  { id: 2, label: "Confirmed Sessions" },
  { id: 3, label: "past Sessions" },
];

const ddItems1on1 = [
  { id: 1, label: "Pending " },
  { id: 2, label: "Confirmed" },
  { id: 3, label: "Preprogress" },
  { id: 3, label: "Finished" },
];

export default function DashboardOne() {
  const [currentCategory, setCurrentCategory] = useState("All Sessions");
  const [activeTab, setActiveTab] = useState("active");
  const userData = useSelector((state) => state.auths);
  const role = import.meta.env.VITE_ACTIVE_ROLE || "teacher"; // fallback to "student"

  const navigate = useNavigate();
  // const filteredStates = states.filter((item) => {
  //   if (role === "student") {
  //     return (
  //       item.title === "Total Courses" || item.title === "Total Instructors"
  //     );
  //   }
  //   return true; // admin and teacher see all
  // });

  const filteredStates = states.filter((item) => {
    return item.roles.includes(role);
  });

  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        {/* Header */}
        <div className="row pb-50 mb-10">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700">Dashboard</h1>
            <div className="mt-10">
              Lorem ipsum dolor sit amet, consectetur.
            </div>
          </div>
        </div>

        {/* Stats */}
        {(role === "teacher" || role === "admin" || role === "student") && (
          <div className="row y-gap-30">
            {filteredStates.map((elm, i) => (
              <div key={i} className="col-xl-3 col-md-6">
                <div className="d-flex justify-between h-100 items-center py-35 px-30 rounded-16 bg-white -dark-bg-dark-1 shadow-4">
                  <div>
                    <div className="lh-1 fw-500">{elm.title}</div>
                    <div className="text-24 lh-1 fw-700 text-dark-1 mt-20">
                      {elm.value}
                    </div>
                    <div className="lh-1 mt-25">
                      <span className="text-purple-1">{elm.new}</span> New Sales
                    </div>
                  </div>
                  <i className={`text-40 ${elm.iconClass} text-purple-1`}></i>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Charts */}
        {(role === "teacher" || role === "admin") && (
          <div className="row y-gap-30 pt-30">
            <div className="col-xl-8 col-md-6">
              <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
                <div className="d-flex justify-between items-center py-20 px-30 border-bottom-light">
                  <h2 className="text-17 lh-1 fw-500">Earning Statistics</h2>
                </div>
                <div className="py-40 px-30">
                  <Charts />
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-md-6">
              <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
                <div className="d-flex justify-between items-center py-20 px-30 border-bottom-light">
                  <h2 className="text-17 lh-1 fw-500">Traffic</h2>
                </div>
                <div className="py-40 px-30">
                  <PieChartComponent />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Role-Based Sections */}
        <div className="row y-gap-30 pt-30">
          {role==="student" &&
          <>
          <div className="col-md-8">
            <div className="mb-20">
          <div className="d-flex gap-2 items-center justify-center">
            <button
              className={`button -sm -purple-1 text-white shrink-0 nav-link tab-button ${activeTab === 'active' ? 'active' : ''}`}
              onClick={() => setActiveTab('active')}
            >
              1 on 1 Courses
            </button>
            <button
              className={`button -sm -purple-1 text-white shrink-0 nav-link tab-button ${activeTab === 'completed' ? 'active' : ''}`}
              onClick={() => setActiveTab('completed')}
            >
              Sessions
            </button>
          </div>
        </div>
          </div>
          
          {activeTab === "active" && (role === "student" || role === "admin") && (
            <div className="col-xl-8 col-md-8">
              <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
                <div className="d-flex justify-between items-center py-20 px-30 border-bottom-light">
                  <div className="">
                    <h2 className="text-17 lh-1 fw-500">1 on 1 Courses</h2>
                  </div>
                  <div className="main_select">
                    <div>
                      <div
                        id="dd14button"
                        onClick={() => {
                          document
                            .getElementById("dd14button")
                            .classList.toggle("-is-dd-active");
                          document
                            .getElementById("dd14content")
                            .classList.toggle("-is-el-visible");
                        }}
                        className="dropdown js-dropdown js-category-active"
                      >
                        <div
                          className="dropdown__button w-max  d-flex items-center text-14 bg-white -dark-bg-dark-2 border-light rounded-8 px-20 py-10 text-14 lh-12"
                          data-el-toggle=".js-category-toggle"
                          data-el-toggle-active=".js-category-active"
                        >
                          <span className="js-dropdown-title">
                            {currentCategory != "All Categories"
                              ? currentCategory
                              : "Categories"}
                          </span>
                          <i className="icon text-9 ml-40 icon-chevron-down"></i>
                        </div>

                        <div
                          id="dd14content"
                          className="toggle-element -dropdown -dark-bg-dark-2 -dark-border-white-10 js-click-dropdown js-category-toggle"
                        >
                          <div className="text-14 y-gap-15 js-dropdown-list">
                            {ddItems1on1.map((item, ind) => (
                              <div
                                onClick={() => setCurrentCategory(item.label)}
                                key={ind}
                                className={`d-block js-dropdown-link cursor ${
                                  currentCategory == item.label
                                    ? "activeMenu"
                                    : ""
                                } `}
                              >
                                <span
                                  style={{ cursor: "pointer" }}
                                  className="d-block js-dropdown-link"
                                >
                                  {item.label}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="py-30 px-30">
                  <div className="y-gap-40">
                    {sessions.map((elm, i) => (
                      <div
                        key={i}
                        className={`d-flex main_sessions items-center justify-between py-4 ${
                          i !== 0 ? "border-top-light" : ""
                        }`}
                      >
                        {/* Icon + Status */}
                        <div className="d-flex items-start gap-4">
                          <div>
                            <h6
                              className={`text-xs text-gray-500 mt-1 capitalize ${elm.color}`}
                            >
                              {elm.status}
                            </h6>
                          </div>

                          {/* Title + Course */}
                          <div>
                            <h4 className="text-sm font-semibold text-gray-800">
                              {elm.title}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1">
                              {elm.course}
                            </p>
                                                      <div className="mt-5 d-flex align-items-center">
                            <button
                              class="button text-13  -light-7 -dark-button-dark-2 text-purple-1"
                              style={{
                                padding: "10px 25px",
                                height: "40px",
                                marginRight: "10px",
                              }}
                              onClick={()=>navigate('/video-confrerence')}
                            >
                              Join Now
                            </button>
                            <button
                              class="button text-13  -light-7 -dark-button-dark-2 text-purple-1"
                              style={{
                                padding: "10px 25px",
                                height: "40px",
                              }}
                            >
                              More Details
                            </button>
                          </div>
                          </div>
                        </div>

                        {/* Date */}
                        <div className="text-xs text-gray-500 text-right min-w-[100px]">
                          {elm.date}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "completed" && (
            <div className="col-xl-8 col-md-8">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="d-flex justify-between items-center py-20 px-30 border-bottom-light">
                <div className="">
                  <h2 className="text-17 lh-1 fw-500">Sessions</h2>
                </div>
                <div className="main_select">
                  <div>
                    <div
                      id="dd14button"
                      onClick={() => {
                        document
                          .getElementById("dd14button")
                          .classList.toggle("-is-dd-active");
                        document
                          .getElementById("dd14content")
                          .classList.toggle("-is-el-visible");
                      }}
                      className="dropdown js-dropdown js-category-active"
                    >
                      <div
                        className="dropdown__button w-max  d-flex items-center text-14 bg-white -dark-bg-dark-2 border-light rounded-8 px-20 py-10 text-14 lh-12"
                        data-el-toggle=".js-category-toggle"
                        data-el-toggle-active=".js-category-active"
                      >
                        <span className="js-dropdown-title">
                          {currentCategory != "All Categories"
                            ? currentCategory
                            : "Categories"}
                        </span>
                        <i className="icon text-9 ml-40 icon-chevron-down"></i>
                      </div>

                      <div
                        id="dd14content"
                        className="toggle-element -dropdown -dark-bg-dark-2 -dark-border-white-10 js-click-dropdown js-category-toggle"
                      >
                        <div className="text-14 y-gap-15 js-dropdown-list">
                          {ddItems.map((item, ind) => (
                            <div
                              onClick={() => setCurrentCategory(item.label)}
                              key={ind}
                              className={`d-block js-dropdown-link cursor ${
                                currentCategory == item.label
                                  ? "activeMenu"
                                  : ""
                              } `}
                            >
                              <span
                                style={{ cursor: "pointer" }}
                                className="d-block js-dropdown-link"
                              >
                                {item.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-30 px-30">
                <div className="y-gap-40">
                  {sessions.map((elm, i) => (
                    <div
                      key={i}
                      className={`d-flex main_sessions items-center justify-between py-4 ${
                        i !== 0 ? "border-top-light" : ""
                      }`}
                    >
                      {/* Icon + Status */}
                      <div className="d-flex items-start gap-4">
                        <div className="main_hald_sec">
                          <h6
                            className={`text-xs text-gray-500 mt-1 capitalize ${elm.color}`}
                          >
                            {elm.status}
                          </h6>
                        </div>

                        {/* Title + Course */}
                        <div className="main_hald_sec2">
                          <h4 className="text-sm font-semibold text-gray-800">
                            {elm.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {elm.course}
                          </p>
                          <div className="mt-5 d-flex align-items-center">
                            <button
                              class="button text-13  -light-7 -dark-button-dark-2 text-purple-1"
                              style={{
                                padding: "10px 25px",
                                height: "40px",
                                marginRight: "10px",
                              }}
                              onClick={()=>navigate('/video-confrerence')}
                            >
                              Join Now
                            </button>
                            <button
                              class="button text-13  -light-7 -dark-button-dark-2 text-purple-1"
                              style={{
                                padding: "10px 25px",
                                height: "40px",
                              }}
                            >
                              More Details
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Date */}
                      <div className="d-flex flex-column justify-content-center">
                        <div className="text-xs text-gray-500 text-center min-w-[100px]">
                          {elm.date}
                        </div>
                        {/* <div className="mt-5 d-flex align-items-center">
                          <button
                            class="button text-13  -light-7 -dark-button-dark-2 text-purple-1"
                            style={{
                              padding: "10px 25px",
                              height: "40px",
                              marginRight: "10px",
                            }}
                          >
                            Join Now
                          </button>
                          <button
                            class="button text-13  -light-7 -dark-button-dark-2 text-purple-1"
                            style={{
                              padding: "10px 25px",
                              height: "40px",
                            }}
                          >
                            More Details
                          </button>
                        </div> */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          )}
          </>
          }

          

          {/* Popular Instructor (Teacher/Admin) */}
          {(role === "student" || role === "admin") && (
            <div className="col-xl-4 col-md-6">
              <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
                <div className="d-flex justify-between items-center py-20 px-30 border-bottom-light">
                  <h2 className="text-17 fw-500">Popular Instructor</h2>
                  <Link
                    to="/instructors-list-2"
                    className="text-14 text-purple-1 underline"
                  >
                    View All
                  </Link>
                </div>
                <div className="py-30 px-30">
                  <div className="y-gap-40">
                    {teamMembers.slice(0, 5).map((elm, i) => (
                      <div
                        key={i}
                        className={`d-flex ${
                          i !== 0 ? "border-top-light" : ""
                        }`}
                      >
                        <img className="size-40" src={elm.image} alt="avatar" />
                        <div className="ml-10 w-1/1">
                          <h4 className="text-15 lh-1 fw-500">
                            <Link
                              className="linkCustom"
                              to={`/instructors/${elm.id}`}
                            >
                              {elm.name}
                            </Link>
                          </h4>
                          <div className="d-flex items-center x-gap-20 y-gap-10 flex-wrap pt-10">
                            <div className="d-flex items-center">
                              <i className="icon-message text-15 mr-10"></i>
                              <div className="text-13 lh-1">
                                {elm.reviews} Reviews
                              </div>
                            </div>
                            <div className="d-flex items-center">
                              <i className="icon-online-learning text-15 mr-10"></i>
                              <div className="text-13 lh-1">
                                {elm.students} Students
                              </div>
                            </div>
                            <div className="d-flex items-center">
                              <i className="icon-play text-15 mr-10"></i>
                              <div className="text-13 lh-1">
                                {elm.courses} Course
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Recent Courses (Student/Admin) */}
          {(role === "student" || role === "admin") && (
            <div className="col-xl-4 col-md-6">
              <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
                <div className="d-flex justify-between items-center py-20 px-30 border-bottom-light">
                  <h2 className="text-17 lh-1 fw-500">Recent Courses</h2>
                  <a href="#" className="text-14 text-purple-1 underline">
                    View All
                  </a>
                </div>
                <div className="py-30 px-30">
                  <div className="y-gap-40">
                    {resentCourses.map((elm, i) => (
                      <div
                        key={i}
                        className={`d-flex ${
                          i !== 0 ? "border-top-light" : ""
                        }`}
                      >
                        <div className="shrink-0">
                          <img src={elm.imageSrc} alt="image" />
                        </div>
                        <div className="ml-15">
                          <h4 className="text-15 lh-16 fw-500">{elm.title}</h4>
                          <div className="d-flex items-center x-gap-20 y-gap-10 flex-wrap pt-10">
                            <div className="d-flex items-center">
                              <img
                                className="size-16 object-cover mr-8"
                                src={elm.authorImg}
                                alt="icon"
                              />
                              <div className="text-14 lh-1">{elm.title}</div>
                            </div>
                            <div className="d-flex items-center">
                              <i className="icon-document text-16 mr-8"></i>
                              <div className="text-14 lh-1">
                                {elm.lessonCount} lesson
                              </div>
                            </div>
                            <div className="d-flex items-center">
                              <i className="icon-clock-2 text-16 mr-8"></i>
                              <div className="text-14 lh-1">
                                {`${Math.floor(
                                  elm.duration / 60
                                )}h ${Math.floor(elm.duration % 60)}m`}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications (All roles) */}
          {(role === "teacher" || role === "admin") && (
            <div className="col-xl-4 col-md-6">
              <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
                <div className="d-flex justify-between items-center py-20 px-30 border-bottom-light">
                  <h2 className="text-17 lh-1 fw-500">Notifications</h2>
                </div>
                <div className="py-30 px-30">
                  <div className="y-gap-40">
                    {notifications.map((elm, i) => (
                      <div
                        key={i}
                        className={`d-flex items-center ${
                          i !== 0 ? "border-top-light" : ""
                        }`}
                      >
                        <div className="shrink-0">
                          <img src={elm.imageSrc} alt="image" />
                        </div>
                        <div className="ml-12">
                          <h4 className="text-15 lh-1 fw-500">{elm.heading}</h4>
                          <div className="text-13 lh-1 mt-10">
                            {elm.time} Hours Ago
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          {(role === "teacher" || role === "admin") && (
          <div className="col-xl-8 col-md-8">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="d-flex justify-between items-center py-20 px-30 border-bottom-light">
                <div className="">
                  <h2 className="text-17 lh-1 fw-500">Sessions</h2>
                </div>
                <div className="main_select">
                  <div>
                    <div
                      id="dd14button"
                      onClick={() => {
                        document
                          .getElementById("dd14button")
                          .classList.toggle("-is-dd-active");
                        document
                          .getElementById("dd14content")
                          .classList.toggle("-is-el-visible");
                      }}
                      className="dropdown js-dropdown js-category-active"
                    >
                      <div
                        className="dropdown__button w-max  d-flex items-center text-14 bg-white -dark-bg-dark-2 border-light rounded-8 px-20 py-10 text-14 lh-12"
                        data-el-toggle=".js-category-toggle"
                        data-el-toggle-active=".js-category-active"
                      >
                        <span className="js-dropdown-title">
                          {currentCategory != "All Categories"
                            ? currentCategory
                            : "Categories"}
                        </span>
                        <i className="icon text-9 ml-40 icon-chevron-down"></i>
                      </div>

                      <div
                        id="dd14content"
                        className="toggle-element -dropdown -dark-bg-dark-2 -dark-border-white-10 js-click-dropdown js-category-toggle"
                      >
                        <div className="text-14 y-gap-15 js-dropdown-list">
                          {ddItems.map((item, ind) => (
                            <div
                              onClick={() => setCurrentCategory(item.label)}
                              key={ind}
                              className={`d-block js-dropdown-link cursor ${
                                currentCategory == item.label
                                  ? "activeMenu"
                                  : ""
                              } `}
                            >
                              <span
                                style={{ cursor: "pointer" }}
                                className="d-block js-dropdown-link"
                              >
                                {item.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-30 px-30">
                <div className="y-gap-40">
                  {sessions.map((elm, i) => (
                    <div
                      key={i}
                      className={`d-flex main_sessions items-center justify-between py-4 ${
                        i !== 0 ? "border-top-light" : ""
                      }`}
                    >
                      {/* Icon + Status */}
                      <div className="d-flex items-start gap-4">
                        <div className="main_hald_sec">
                          <h6
                            className={`text-xs text-gray-500 mt-1 capitalize ${elm.color}`}
                          >
                            {elm.status}
                          </h6>
                        </div>

                        {/* Title + Course */}
                        <div className="main_hald_sec2">
                          <h4 className="text-sm font-semibold text-gray-800">
                            {elm.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {elm.course}
                          </p>
                          <div className="mt-5 d-flex align-items-center">
                            <button
                              class="button text-13  -light-7 -dark-button-dark-2 text-purple-1"
                              style={{
                                padding: "10px 25px",
                                height: "40px",
                                marginRight: "10px",
                              }}
                               onClick={()=>navigate('/video-confrerence')}
                            >
                              Join Now
                            </button>
                            <button
                              class="button text-13  -light-7 -dark-button-dark-2 text-purple-1"
                              style={{
                                padding: "10px 25px",
                                height: "40px",
                              }}
                            >
                              More Details
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Date */}
                      <div className="d-flex flex-column justify-content-center">
                        <div className="text-xs text-gray-500 text-center min-w-[100px]">
                          {elm.date}
                        </div>
                        {/* <div className="mt-5 d-flex align-items-center">
                          <button
                            class="button text-13  -light-7 -dark-button-dark-2 text-purple-1"
                            style={{
                              padding: "10px 25px",
                              height: "40px",
                              marginRight: "10px",
                            }}
                          >
                            Join Now
                          </button>
                          <button
                            class="button text-13  -light-7 -dark-button-dark-2 text-purple-1"
                            style={{
                              padding: "10px 25px",
                              height: "40px",
                            }}
                          >
                            More Details
                          </button>
                        </div> */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
              )}
        </div>
      </div>

      <FooterNine />
    </div>
  );
}
