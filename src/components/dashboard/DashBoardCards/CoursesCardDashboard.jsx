import React from "react";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import RequestsModal from "@/components/modal/RequestsModal";

export default function CoursesCardDashboard({ data }) {
   const userData = useSelector((state) => state.auths);
  const role = import.meta.env.VITE_ACTIVE_ROLE || "teacher"; // fallback role for testing
  const [activeShare, setActiveShare] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const requestsData = [
         { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
    ]
  const [rating, setRating] = useState([]);
  useEffect(() => {
    for (let i = Math.floor(data.rating); i >= 1; i--) {
      setRating((pre) => [...pre, "star"]);
    }
  }, []);
  return (
    <>
    <div className="w-1/5 xl:w-1/3 lg:w-1/2 sm:w-1/1">
      <div className="relative">
        <img className="rounded-8 w-1/1" src={data.imageSrc} alt="image" />

        <button
          onClick={() => setActiveShare((pre) => !pre)}
          className="absolute-button"
          data-el-toggle=".js-more-1-toggle"
        >
          <span className="d-flex items-center justify-center size-35 bg-white shadow-1 rounded-8">
            <i className="icon-menu-vertical"></i>
          </span>
        </button>

        <div
          className={`toggle-element -dshb-more js-more-1-toggle ${
            activeShare ? "-is-el-visible" : ""
          } `}
        >
          <div className="px-25 py-25 bg-white -dark-bg-dark-2 shadow-1 border-light rounded-8">
             {(role === "teacher" || role === "admin") && (
             <button  className="d-flex items-center mb-20"
                     onClick={() => setIsModalOpen(true)}
>
             <div className="icon-edit"></div>
              <div className="text-17 lh-1 fw-500 ml-12">Requests</div>
            </button>
             )}
             
             {(role === "teacher" || role === "admin") && (
             <Link to="/dshb-listing" className="d-flex items-center mb-20">
             <div className="icon-edit"></div>
              <div className="text-17 lh-1 fw-500 ml-12">Edit</div>
            </Link>
             )}
            
            <a href="#" className="d-flex items-center">
              <div className="icon-share"></div>
              <div className="text-17 lh-1 fw-500 ml-12">Share</div>
            </a>

            <a href="#" className="d-flex items-center mt-20">
              <div className="icon-bookmark"></div>
              <div className="text-17 lh-1 fw-500 ml-12">Favorite</div>
            </a>
          </div>
        </div>
      </div>

      <div className="pt-15">
        <div className="d-flex y-gap-10 justify-between items-center">
          <div className="text-14 lh-1">{data.authorName}</div>

          <div className="d-flex items-center">
            <div className="text-14 lh-1 text-yellow-1 mr-10">
              {data.rating}
            </div>
            <div className="d-flex x-gap-5 items-center">
              {rating.map((itm, i) => (
                <div key={i} className="icon-star text-9 text-yellow-1"></div>
              ))}
            </div>
          </div>
        </div>

        <h3 className="text-16 fw-500 lh-15 mt-10">{data.title}</h3>

        <div className="progress-bar mt-10">
          <div className="progress-bar__bg bg-light-3"></div>
          <div className="progress-bar__bar bg-purple-1 w-1/5"></div>
        </div>

        <div className="d-flex y-gap-10 justify-between items-center mt-10">
          <div className="text-dark-1">% {data.completed} Completed</div>
          <div>25%</div>
        </div>
      </div>
    </div>
    <RequestsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        requests={requestsData}
      />
    </>
  );
}
