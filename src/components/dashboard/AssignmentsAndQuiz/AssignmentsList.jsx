import AssignmentModal from "@/components/modal/AssignmentModal";
import AssignmentModalView from "@/components/modal/AssignmentModalView";
import {
  faEdit,
  faEye,
  faPaperPlane,
  faTrash,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Updated assignments data with completed status and grades
const assignments = [
  {
    id: 1,
    title: "UI/UX Design Basics",
    description: "Learn Figma and essential design principles.",
    course: "Design 101",
    dueDate: "2025-07-15",
    completed: false,
    grade: null,
  },
  {
    id: 2,
    title: "React Fundamentals",
    description: "Build components and understand hooks.",
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
    dueDate: "2025-06-01",
    completed: true,
    grade: "A",
  },
  {
    id: 4,
    title: "Completed Assignment 2",
    description: "Another completed assignment example.",
    course: "Finished Studies",
    dueDate: "2025-06-10",
    completed: true,
    grade: "B+",
  },
];

const AssignmentsList = () => {
  const [showModal, setShowModal] = useState(false);
  const [viewShowModal, setViewShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("active"); // Track active tab

  const userData = useSelector((state) => state.auths);
  const role = import.meta.env.VITE_ACTIVE_ROLE || "teacher";
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/dshb-edit-assignment");
  };

  const handleDelete = (id) => {
    console.log("Delete assignment:", id);
  };

  const handleGrade = (id) => {
    console.log("Grade assignment:", id);
    // Implement your grading logic here
  };

  // Filter assignments based on completion status
  const activeAssignments = assignments.filter((a) => !a.completed);
  const completedAssignments = assignments.filter((a) => a.completed);

  return (
    <div className="">
      {/* Tabs Navigation */}
      <div className="mb-4">
        <ul className="nav nav-tabs d-flex x-gap-20 justify-center">
          <li className="nav-item">
            <button
              className={`button -sm -purple-1 text-white shrink-0 nav-link tab-button ${activeTab === "active" ? "active" : ""}`}
              onClick={() => setActiveTab("active")}
            >
              Active Assignments
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`button -sm -purple-1 text-white shrink-0 nav-link tab-button ${
                activeTab === "completed" ? "active" : ""
              }`}
              onClick={() => setActiveTab("completed")}
            >
              Completed Assignments
            </button>
          </li>
        </ul>
      </div>

      {/* Active Assignments Tab */}
      {activeTab === "active" && (
        <div className="rounded-16 bg-white shadow-4 h-100 py-30 px-30 mb-10">
          <div className="table-responsive py-30 px-30">
            <table className="table table-bordered table-hover align-middle w-100">
              <thead className="table-light">
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Course</th>
                  <th>Due Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {activeAssignments.length > 0 ? (
                  activeAssignments.map((item) => (
                    <tr key={item.id}>
                      <td>{item.title}</td>
                      <td>{item.description}</td>
                      <td>{item.course}</td>
                      <td>{item.dueDate}</td>
                      <td>
                        <div className="btn-group" role="group">
                          {role === "teacher" || role === "admin" ? (
                            <div className="d-flex">
                              <button
                                className="button -sm -purple-1 new_edit text-white"
                                onClick={() => handleEdit(item.id)}
                              >
                                <FontAwesomeIcon icon={faEdit} />
                              </button>
                              <button
                                className="button -sm -purple-1 new_delete text-white"
                                onClick={() => handleDelete(item.id)}
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            </div>
                          ) : (
                            <div className="d-flex">
                              <button
                                className="button -sm -purple-1 new_edit text-white"
                                onClick={() => setViewShowModal(true)}
                              >
                                <FontAwesomeIcon
                                  icon={faEye}
                                  className="text-white"
                                />
                              </button>
                              <button
                                className="button -sm -purple-1 new_edit text-white"
                                onClick={() => setShowModal(true)}
                              >
                                <FontAwesomeIcon
                                  icon={faEdit}
                                  className="text-white"
                                />
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-3">
                      No active assignments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Completed Assignments Tab */}
      {activeTab === "completed" && (
        <div className="rounded-16 bg-white shadow-4 h-100 py-30 px-30 mb-10">
          <div className="table-responsive py-30 px-30">
            <table className="table table-bordered table-hover align-middle w-100">
              <thead className="table-light">
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Course</th>
                  <th>Grade</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {completedAssignments.length > 0 ? (
                  completedAssignments.map((item) => (
                    <tr key={item.id}>
                      <td>{item.title}</td>
                      <td>{item.description}</td>
                      <td>{item.course}</td>
                      <td>{item.grade || "Not graded"}</td>
                      <td>
                        <div className="btn-group" role="group">
                          <button
                            className="button -sm -purple-1 new_edit text-white"
                            onClick={() => setViewShowModal(true)}
                          >
                            <FontAwesomeIcon
                              icon={faEye}
                              className="text-white"
                            />
                          </button>
                          {(role === "teacher" || role === "admin") && (
                            <button
                              className="button -sm -purple-1 new_edit text-white ms-2"
                              onClick={() => handleGrade(item.id)}
                            >
                              <FontAwesomeIcon
                                icon={faStar}
                                className="text-white"
                              />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-3">
                      No completed assignments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modals */}
      <AssignmentModal show={showModal} onClose={() => setShowModal(false)} />
      <AssignmentModalView
        show={viewShowModal}
        onClose={() => setViewShowModal(false)}
      />
    </div>
  );
};

export default AssignmentsList;
