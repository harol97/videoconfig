import { reviews } from "@/data/reviews";
import React, { useState } from "react";
import Star from "../common/Star";

import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import ReviewViewModal from "../modal/ReviewViewModal";

const adminReviewList = [
  {
    id: 1,
    title: "Introduction to React",
    instructor: "John Smith",
    reviewBy: "Sarah Johnson",
    status: "Flagged",
    actions: "Edit, Delete",
  },
  {
    id: 2,
    title: "Advanced JavaScript Patterns",
    instructor: "Emily Davis",
    reviewBy: "Michael Brown",
    status: "Flagged",
    actions: "Edit, Delete",
  },
  {
    id: 3,
    title: "CSS Masterclass",
    instructor: "Robert Wilson",
    reviewBy: "Jessica Lee",
    status: "Unflagged",
    actions: "Edit, Delete",
  },
  {
    id: 4,
    title: "Node.js Fundamentals",
    instructor: "David Miller",
    reviewBy: "Lisa Taylor",
    status: "Flagged",
    actions: "Edit, Delete",
  },
  {
    id: 5,
    title: "Python for Data Science",
    instructor: "Jennifer Adams",
    reviewBy: "Kevin Martin",
    status: "Flagged",
    actions: "Edit, Delete",
  },
];

const RevewListcourse = [
  {
    id: 1,
    reviewtitle: "dummy dummy",
    startdate: "30 may 2022",
    completedate: "22 june 2025",
    status: "pending",
  },
  {
    id: 2,
    reviewtitle: "dummy dummy",
    startdate: "30 may 2022",
    completedate: "22 june 2025",
    status: "completed",
  },
];

const teacherRole = [
  {
    id: 1,
    title: "dummy",
    student: "dummy",
    review: "lorem ipsum lorem ipsum lorem ipsum",
    status: "approved"
  },
   {
    id: 1,
    title: "dummy",
    student: "dummy",
    review: "lorem ipsum lorem ipsum lorem ipsum",
    status: "approved"
  },
   {
    id: 1,
    title: "dummy",
    student: "dummy",
    review: "lorem ipsum lorem ipsum lorem ipsum",
    status: "approved"
  },
   {
    id: 1,
    title: "dummy",
    student: "dummy",
    review: "lorem ipsum lorem ipsum lorem ipsum",
    status: "approved"
  },
   {
    id: 1,
    title: "dummy",
    student: "dummy",
    review: "lorem ipsum lorem ipsum lorem ipsum",
    status: "approved"
  },
]

export default function Reviews() {
  const navigate = useNavigate();
  const [activeResponse, setActiveResponse] = useState(null);
  const [responses, setResponses] = useState({});
  const [showModal, setShowModal] = useState(false);
  const userData = useSelector((state) => state.auths);
  const role = import.meta.env.VITE_ACTIVE_ROLE || "teacher";
  const handleResponseChange = (i, value) => {
    setResponses((prev) => ({
      ...prev,
      [i]: value,
    }));
  };

  const handleToggleResponse = (i) => {
    setActiveResponse((prev) => (prev === i ? null : i));
  };

  const handleSubmit = (i) => {
    console.log("Submit response to review:", i, responses[i]);
    // You can add your API call here

    // Clear response input
    setResponses((prev) => ({ ...prev, [i]: "" }));
    setActiveResponse(null);
  };

  return (
    <>
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row pb-50 mb-10">
          <div className="col-12">
            <div className="d-flex amin-flex">
              <div className="left-sidde">
                <h1 className="text-30 lh-12 fw-700">Reviews</h1>
                <div className="mt-10">
                  Lorem ipsum dolor sit amet, consectetur.
                </div>
              </div>
              <div className="right-side">
                {role === "student" &&
                <button
                  className="button text-13 -sm -light-7 -dark-button-dark-2 text-purple-1"
                  onClick={() => navigate("/dshb-reviews-form")}
                >
                  Give Review
                </button>
                }
              </div>
            </div>
          </div>
        </div>

        <div className="row y-gap-30">
          <div className="col-12">
            <div className="rounded-16 bg-white shadow-4 h-100 py-30 px-30 mb-10">
              {(role === "student") &&
              <div className="table-responsive py-30 px-30">
                <table className="table table-bordered table-hover align-middle w-100">
                  <thead className="table-light">
                    <tr>
                      <th>Course Title</th>
                      <th>start date</th>
                      <th>completion date</th>
                      <th>status</th>
                      <th>provide feedback/review</th>
                    </tr>
                  </thead>
                  <tbody>
                    {RevewListcourse.length > 0 ? (
                      RevewListcourse.map((item) => (
                        <tr key={item.id}>
                          <td>{item.reviewtitle}</td>
                          <td>{item.startdate}</td>
                          <td>{item.completedate}</td>
                          <td>{item.status}</td>
                          <td>
                            <div className="btn-group" role="group">
                              <button
                                className="button -sm -purple-1 new_edit text-white mr-10"
                                onClick={() => navigate("/dshb-reviews-form")}
                              >
                                Give Review
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center text-muted py-3">
                          No completed quizzes found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              }

              {(role === "admin")  && (
                <div className="table-responsive py-30 px-30">
                  <table className="table table-bordered table-hover align-middle w-100">
                    <thead className="table-light">
                      <tr>
                        <th>Course Title</th>
                        <th>Instructor</th>
                        <th>Review By</th>
                        <th>status</th>
                        <th>actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminReviewList.length > 0 ? (
                        adminReviewList.map((item) => (
                          <tr key={item.id}>
                            <td>{item.title}</td>
                            <td>{item.instructor}</td>
                            <td>{item.reviewBy}</td>
                            <td>{item.status}</td>
                            <td>
                              <div className="d-flex">
                                <button
                                  className="button -sm -purple-1 new_edit text-white"
                                   onClick={() => navigate("/dshb-reviews-form")}
                                >
                                  <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button
                                  className="button -sm -purple-1 new_delete text-white"
                                >
                                  <FontAwesomeIcon icon={faTrash} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="7"
                            className="text-center text-muted py-3"
                          >
                            No completed quizzes found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

               {(role === "teacher")  && (
                <div className="table-responsive py-30 px-30">
                  <table className="table table-bordered table-hover align-middle w-100">
                    <thead className="table-light">
                      <tr>
                        <th>Course Title</th>
                        <th>Student Name</th>
                        <th>Review</th>
                        <th>status</th>
                        <th>actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teacherRole.length > 0 ? (
                        teacherRole.map((item) => (
                          <tr key={item.id}>
                            <td>{item.title}</td>
                            <td>{item.student}</td>
                            <td>{item.review}</td>
                            <td>{item.status}</td>
                            <td>
                              <div className="d-flex">
                                <button
                                  className="button -sm -purple-1 new_edit text-white"
                                   onClick={() => navigate("/dshb-reviews-form")}
                                >
                                  <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button
                                  className="button -sm -purple-1 new_edit text-white"
                                  onClick={()=>setShowModal(true)}
                                >
                                  <FontAwesomeIcon icon={faEye} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="7"
                            className="text-center text-muted py-3"
                          >
                            No completed quizzes found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            {/* <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="d-flex items-center py-20 px-30 border-bottom-light">
                <h2 className="text-17 lh-1 fw-500">All Reviews</h2>
              </div>

              <div className="py-30 px-30">
                <div className="row y-gap-30">
                  {reviews.map((elm, i) => (
                    <div key={i} className="md:direction-column">
                      <div
                        className={`d-flex ${
                          i !== 0 ? "border-top-light" : ""
                        } pt-30`}
                      >
                        <div className="mr-20">
                          <img
                            src={elm.avatarSrc}
                            alt="image"
                            style={{
                              borderRadius: "50px",
                            }}
                          />
                        </div>

                        <div className="comments__body md:mt-15">
                          <div className="comments__header">
                            <h4 className="text-17 fw-500 lh-15">
                              {elm.name}
                              <span className="text-13 text-light-1 fw-400 ml-5">
                                {elm.date}
                              </span>
                            </h4>

                            <div className="d-flex x-gap-5 items-center mt-15">
                              <Star star={elm.rating} />
                            </div>
                          </div>

                          <h5 className="text-15 fw-500 mt-15">{elm.title}</h5>
                          <div className="comments__text mt-10">
                            <p>{elm.comment}</p>
                          </div>

                          <div className="comments__helpful mt-20">
                            <button
                              className="button text-13 -sm -light-7 -dark-button-dark-2 text-purple-1"
                              onClick={() => handleToggleResponse(i)}
                            >
                              Respond
                            </button>
                          </div>

                          {activeResponse === i && (
                            <div className="mt-15">
                              <textarea
                                className="w-100 py-10 px-15 border-light rounded-4 text-14"
                                rows="3"
                                style={{
                                  width: "100%",
                                }}
                                placeholder="Write your response..."
                                value={responses[i] || ""}
                                onChange={(e) =>
                                  handleResponseChange(i, e.target.value)
                                }
                              />
                              <button
                                className="button -sm -purple-1 mt-10"
                                onClick={() => handleSubmit(i)}
                              >
                                Submit
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <footer className="footer -dashboard py-30">
        <div className="row items-center justify-between">
          <div className="col-auto">
            <div className="text-13 lh-1">
              © 2022 Tutrx. All Right Reserved.
            </div>
          </div>

          <div className="col-auto">
            <div className="d-flex items-center">
              <div className="d-flex items-center flex-wrap x-gap-20">
                <div>
                  <Link to="/help-center" className="text-13 lh-1">
                    Help
                  </Link>
                </div>
                <div>
                  <Link to="/terms" className="text-13 lh-1">
                    Privacy Policy
                  </Link>
                </div>
                <div>
                  <a href="#" className="text-13 lh-1">
                    Cookie Notice
                  </a>
                </div>
                <div>
                  <a href="#" className="text-13 lh-1">
                    Security
                  </a>
                </div>
                <div>
                  <Link to="/terms" className="text-13 lh-1">
                    Terms of Use
                  </Link>
                </div>
              </div>

              <button className="button -md -rounded bg-light-4 text-light-1 ml-30">
                English
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
    <ReviewViewModal  show={showModal} onClose={() => setShowModal(false)}/></>
  );
}
