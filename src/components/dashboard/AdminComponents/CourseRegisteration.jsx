import React, { useEffect, useState } from "react";
import { coursesData } from "@/data/dashboard";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import FooterNine from "@/components/layout/footers/FooterNine";
import FilterPopup from "@/components/modal/FilterPopup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";

const totalEarning = [
  {
    id: 1,
    title: "Revenue By Instructors",
    value: "$10800",
    new: "$50",
    iconClass: "icon-coupon",
  },
    {
    id: 1,
    title: "Booked Courses",
    value: "$10800",
    new: "$50",
    iconClass: "icon-coupon",
  },
];

const assignments = [
  {
    id: 1,
    title: "UI/UX Design Basics",
    description: "Learn Figma and essential design principles.",
    policy: "violated",
    course: "Design 101",
    dueDate: "2025-07-15",
    completed: false,
    grade: null,
  },
  {
    id: 2,
    title: "React Fundamentals",
    description: "Build components and understand hooks.",
    policy: "cleared",
    course: "Web Dev Advanced",
    dueDate: "2025-07-20",
    completed: false,
    grade: null,
  },
  {
    id: 3,
    title: "Completed Assignment 1",
    description: "This assignment has been submitted and graded.",
    course: "Completed Course",
        policy: "violated",

    dueDate: "2025-06-01",
    completed: true,
    grade: "A",
  },
  {
    id: 4,
    title: "Completed Assignment 2",
    description: "Another completed assignment example.",
    course: "Finished Studies",
        policy: "violated",

    dueDate: "2025-06-10",
    completed: true,
    grade: "B+",
  },
];

export default function CourseRegisteration() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auths);
  const role = import.meta.env.VITE_ACTIVE_ROLE || "teacher"; // fallback role for testing

  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});

  const handleApplyFilters = (filters) => {
    setActiveFilters(filters);
    // Here you would typically filter your course list based on the filters
    console.log("Applied filters:", filters);
  };

  return (
    <>
      <div className="dashboard__main">
        <div className="dashboard__content bg-light-4">
          <div className="row pb-50 mb-10">
            <div className="col-md-12">
              <div className="main_mycourses">
                <div className="leftt_side">
                  <h1 className="text-30 lh-12 fw-700">Courses</h1>
                  <div className="mt-10">
                    Lorem ipsum dolor sit amet, consectetur.
                  </div>
                </div>
                <div className="right_side">
                  <button
                    className="button -md -purple-1 text-white shrink-0"
                    onClick={() => setShowFilterPopup(true)}
                  >
                    Filters
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="row y-gap-30">
            {totalEarning.map((elm, i) => (
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
            <div className="col-12">
              <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
                <div className="rounded-16 bg-white shadow-4 h-100 py-30 px-30 mb-10">
                  <div className="table-responsive py-30 px-30">
                    <table className="table table-bordered table-hover align-middle w-100">
                      <thead className="table-light">
                        <tr>
                          <th>Course Title</th>
                          <th>Instructor Name</th>
                          <th>Policy Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {assignments.length > 0 ? (
                          assignments.map((item) => (
                            <tr key={item.id}>
                              <td>{item.title}</td>
                              <td>{item.description}</td>
                              <td>{item.policy}</td>
                              <td>
                                <div className="btn-group" role="group">
                                    <div className="d-flex">
                                      <button
                                        className="button -sm -purple-1 new_delete text-white"
                                      >
                                        <FontAwesomeIcon icon={faTrash} />
                                      </button>
                                    </div>
                                  
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan="5"
                              className="text-center text-muted py-3"
                            >
                              No active assignments found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <FooterNine />
      </div>
      <FilterPopup
        show={showFilterPopup}
        onHide={() => setShowFilterPopup(false)}
        onApplyFilters={handleApplyFilters}
      />
    </>
  );
}
