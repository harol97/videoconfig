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

export default function NotificationsOptionsToggle({ activeTab }) {
  const userData = useSelector((state) => state.auths);
  const role = import.meta.env.VITE_ACTIVE_ROLE || "teacher";
  const [showModal, setShowModal] = useState(false);
  const { closeAccount, closeAccountLoading } = useSelector(
    (state) => state.models
  );

  const [instructor, setInstructor] = useState({
    newBooking: true,
    messages: true,
    cancellation: false,
    reschedule: true,
  });

  const [student, setStudent] = useState({
    messages: true,
    bookingConfirmation: true,
  });

  const handleToggle = (group, key) => {
    if (group === "instructor") {
      setInstructor({ ...instructor, [key]: !instructor[key] });
    } else {
      setStudent({ ...student, [key]: !student[key] });
    }
  };

  // toggle buttons
  const ToggleSwitch = ({ label, checked, onChange }) => (
    <label className="flex justify-between items-center mb-4 cursor-pointer">
      <span>{label}</span>
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={onChange}
      />
      <div
        className={`w-12 h-6 flex items-center bg-gray-300 rounded-xl p-1 transition-colors ${
          checked ? "bg-green-500" : ""
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
            checked ? "translate-x-6" : ""
          }`}
        ></div>
      </div>
    </label>
  );

  //
  

const hello = (role) => 
  role === "admin" ? 3 : 
  role === "student" ? 5 : 
  6;

console.log(hello, "yeh hai number");

  return (
    <>
      <div
        className={`tabs__pane -tab-item-${hello(role)} p-10 ${
          activeTab == hello(role)  ? "is-active" : ""
        } `}
      >
        <div className="contact-form row y-gap-30">
          <div className="col-12">
            <div className="flex justify-between">
              <div className="text-16 fw-500 text-dark-1 mb-10">
                Notifications Settings
              </div>
            </div>

            <div className="rounded-16 bg-white shadow-4 h-100 py-30 px-30 mb-10">
              {(role === "teacher" || role === "admin") && (
                <div>
                  <ToggleSwitch
                    label="New bookings from student"
                    checked={instructor.newBooking}
                    onChange={() => handleToggle("instructor", "newBooking")}
                  />
                  <ToggleSwitch
                    label="Messages"
                    checked={instructor.messages}
                    onChange={() => handleToggle("instructor", "messages")}
                  />
                  <ToggleSwitch
                    label="Cancellation"
                    checked={instructor.cancellation}
                    onChange={() => handleToggle("instructor", "cancellation")}
                  />
                  <ToggleSwitch
                    label="Reschedule"
                    checked={instructor.reschedule}
                    onChange={() => handleToggle("instructor", "reschedule")}
                  />
                </div>
              )}
              {role === "student" && (
                <div>
                  <ToggleSwitch
                    label="Messages"
                    checked={student.messages}
                    onChange={() => handleToggle("student", "messages")}
                  />
                  <ToggleSwitch
                    label="Confirmation for bookings"
                    checked={student.bookingConfirmation}
                    onChange={() =>
                      handleToggle("student", "bookingConfirmation")
                    }
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <PolicyCreateModal show={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
