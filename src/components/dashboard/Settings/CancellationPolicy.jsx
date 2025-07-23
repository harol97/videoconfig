import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { SEND } from "@/store";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import PolicyCreateModal from "@/components/modal/PolicyCreateModal";

const CancelationPolicy = [
  {
    id: 1,
    title: "dummy",
    connectedcourses: "course title",
  },
  {
    id: 2,
    title: "dummy",
    connectedcourses: "course title",
  },
  {
    id: 3,
    title: "dummy",
    connectedcourses: "course title",
  },
];


export default function CancellationPolicy({ activeTab }) {
  const userData = useSelector((state) => state.auths);
  const role = import.meta.env.VITE_ACTIVE_ROLE || "teacher";
  const [showModal, setShowModal] = useState(false);
  const { closeAccount, closeAccountLoading } = useSelector(
    (state) => state.models
  );
  
  const handleEdit = () => {
    console.log("Delete assignment:");
  };

  const handleDelete = (id) => {
    console.log("Delete assignment:", id);
  };

  const {
    control,
    handleSubmit,
    reset,
    register,
    watch,
    formState: { errors },
  } = useForm({});
  //
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //

  //
  return (
    <>
      <div
        className={`tabs__pane -tab-item-5 ${
          activeTab == 5 ? "is-active" : ""
        } `}
      >
        <div className="contact-form row y-gap-30">
          <div className="col-12">
            <div className="flex justify-between">
              <div className="text-16 fw-500 text-dark-1 mb-10">
                Cancellation and Reschedule Policy:
              </div>
              <div className="end">
                <button className="button -sm -purple-1 new_edit text-white"
                onClick={()=> setShowModal(true)}
                >
                  create new policy
                </button>
              </div>
            </div>

            <div className="rounded-16 bg-white shadow-4 h-100 py-30 px-30 mb-10">
              <div className="table-responsive py-30 px-30">
                <table className="table table-bordered table-hover align-middle w-100">
                  <thead className="table-light">
                    <tr>
                      <th>Title</th>
                      <th>connected courses</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CancelationPolicy.length > 0 ? (
                      CancelationPolicy.map((item) => (
                        <tr key={item.id}>
                          <td>{item.title}</td>
                          <td>{item.connectedcourses}</td>
                          <td>
                            <div className="btn-group" role="group">
                              {role === "teacher" || role === "admin" ? (
                                <div className="d-flex">
                                  <button
                                    className="button -sm -purple-1 new_edit text-white"
                                    onClick={() => setShowModal(true)}
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
                                      onClick={() => setShowModal(true)}
                                    />
                                  </button>
                                  <button
                                    className="button -sm -purple-1 new_edit text-white"
                                    onClick={() => navigate("/dshb-quiz-start")}
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
          </div>
        </div>
      </div>

      <PolicyCreateModal show={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
