import PageLinksTwo from "@/components/common/PageLinksTwo";
import AssignmentModal from "@/components/modal/AssignmentModal";
import AssignmentModalView from "@/components/modal/AssignmentModalView";
import QuizModalView from "@/components/modal/QuizModalView";
import {
  faEdit,
  faEye,
  faPaperPlane,
  faTrash,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const QuizList = [
  {
    id: 1,
    title: "UI/UX Design Basics",
    description: "Learn Figma and essential design principles.",
    course: "Design 101",
    status: "Pending",
    dueDate: "2025-07-15",
  },
  {
    id: 2,
    title: "React Fundamentals",
    description: "Build components and understand hooks.",
    course: "Web Dev Advanced",
    status: "Pending",
    dueDate: "2025-07-20",
  },
];

const CompletedQuizList = [
  {
    id: 3,
    quizTitle: "JavaScript Basics",
    courseName: "Web Development",
    courseDescription: "Introduction to JavaScript programming",
    marksObtained: 85,
    totalMarks: 100,
    submitDate: "2025-06-10",
  },
  {
    id: 4,
    quizTitle: "CSS Advanced",
    courseName: "Frontend Development",
    courseDescription: "Advanced CSS techniques and animations",
    marksObtained: 92,
    totalMarks: 100,
    submitDate: "2025-06-15",
  },
];

const QuizTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [viewShowModal, setViewShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("active"); // 'active' or 'completed'

  const userData = useSelector((state) => state.auths);
  const role = import.meta.env.VITE_ACTIVE_ROLE || "teacher";
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/dshb-quiz-create");
  };

  const handleDelete = (id) => {
    console.log("Delete assignment:", id);
  };

  const handleCreateNew = () => {
    navigate('/dshb-quiz-create')
  };

  const viewCompletedQuiz = (id) => {
    console.log("View completed quiz:", id);
    setViewShowModal(true);
  };

  const downloadQuizResults = (id) => {
    console.log("Download results for quiz:", id);
  };

  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row pb-50 mb-10">
          <div className="col-12">
            <div className="main__flexxx">
              <div className="first-halff">
                <h1 className="text-30 lh-12 fw-700">Quiz</h1>
                <PageLinksTwo />
              </div>
              <div className="left-side">
                {(role === "teacher" || role === "admin") && (
                  <button
                    className="button -sm -purple-1 text-white"
                    onClick={handleCreateNew}
                  >
                    + Create New Quiz
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="mb-20">
          <div className="d-flex gap-2 justify-center">
            <button
              className={`button -sm -purple-1 text-white shrink-0 nav-link tab-button ${activeTab === 'active' ? 'active' : ''}`}
              onClick={() => setActiveTab('active')}
            >
              Active Quizzes
            </button>
            <button
              className={`button -sm -purple-1 text-white shrink-0 nav-link tab-button ${activeTab === 'completed' ? 'active' : ''}`}
              onClick={() => setActiveTab('completed')}
            >
              Completed Quizzes
            </button>
          </div>
        </div>

        <div className="">
          {/* Active Quizzes Table */}
          {activeTab === 'active' && (
            <div className="rounded-16 bg-white shadow-4 h-100 py-30 px-30 mb-10">
              <div className="table-responsive py-30 px-30">
                <table className="table table-bordered table-hover align-middle w-100">
                  <thead className="table-light">
                    <tr>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Course</th>
                      <th>Status</th>
                      <th>Due Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {QuizList.length > 0 ? (
                      QuizList.map((item) => (
                        <tr key={item.id}>
                          <td>{item.title}</td>
                          <td>{item.description}</td>
                          <td>{item.course}</td>
                          <td>{item.status}</td>
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
                                  <button className="button -sm -purple-1 new_edit text-white">
                                    <FontAwesomeIcon
                                      icon={faEye}
                                      className="text-white"
                                      onClick={() => setViewShowModal(true)}
                                    />
                                  </button>
                                  <button
                                    className="button -sm -purple-1 new_edit text-white"
                                    onClick={()=> navigate('/dshb-quiz-start')}
                                  >
                                    Start Quiz
                                  </button>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center text-muted py-3">
                          No active quizzes found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Completed Quizzes Table */}
          {activeTab === 'completed' && (
            <div className="rounded-16 bg-white shadow-4 h-100 py-30 px-30 mb-10">
              <div className="table-responsive py-30 px-30">
                <table className="table table-bordered table-hover align-middle w-100">
                  <thead className="table-light">
                    <tr>
                      <th>Quiz Title</th>
                      <th>Course Name</th>
                      <th>Description/feedback</th>
                      <th>Marks Obtained</th>
                      <th>Total Marks</th>
                      <th>Submit Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CompletedQuizList.length > 0 ? (
                      CompletedQuizList.map((item) => (
                        <tr key={item.id}>
                          <td>{item.quizTitle}</td>
                          <td>{item.courseName}</td>
                          <td>{item.courseDescription}</td>
                          <td>{item.marksObtained}</td>
                          <td>{item.totalMarks}</td>
                          <td>{item.submitDate}</td>
                          <td>
                            <div className="btn-group" role="group">
                              <button 
                                className="button -sm -purple-1 new_edit text-white mr-10"
                                onClick={() => viewCompletedQuiz(item.id)}
                              >
                                <FontAwesomeIcon icon={faEye} />
                              </button>
                              {(role === "teacher" || role === "admin") && (
                                <button
                                  className="button -sm -purple-1 new_edit text-white"
                                  onClick={() => downloadQuizResults(item.id)}
                                >
                                  <FontAwesomeIcon icon={faDownload} />
                                </button>
                              )}
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
            </div>
          )}
        </div>

        {/* Modals */}
        <AssignmentModal
          show={showModal}
          onClose={() => setShowModal(false)}
        />
        <QuizModalView
          show={viewShowModal}
          onClose={() => setViewShowModal(false)}
        />
      </div>
    </div>
  );
};

export default QuizTable;
