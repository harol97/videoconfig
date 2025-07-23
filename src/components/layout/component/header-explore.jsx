import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
// 
export const HeaderExplore = ({ allClasses }) => 
{
  const [exploreActive, setExploreActive] = useState(false);
  const userData = useSelector((state) => state.auths);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // 
  const doLogOut = () => 
    {
      try {
        dispatch.auths.DEL();
        navigate("/home");
      } catch (error) {
        console.log(error)
      } finally {
        return toast.success('You have been logged out successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
      }
    };
  // 
  return (
    <>
      <div className={`${allClasses ? allClasses : ""}`}>
        <div
          // to="#"
          onClick={() => setExploreActive((pre) => !pre)}
          className="d-flex items-center"
          data-el-toggle=".js-explore-toggle"
          style={{cursor:'pointer'}}
        >
          {/* <i className="icon icon-explore mr-15"></i> */}
          {userData.fullName}
          <div className="-sm text-dark-1 ml-30">
            <img src={userData.profileImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s"} alt={"image"} style={{ borderRadius: '50%', objectFit: 'fill', width: 50, height: 50, cursor: 'pointer' }} />
          </div>
        </div>

        <div
          className={`explore-content py-25 rounded-8 bg-white toggle-element js-explore-toggle ${
            exploreActive ? "-is-el-visible" : ""
          }`}
        >
          {/* <div className="explore__item">
            <div className="explore__subnav rounded-8">
              <Link className="text-dark-1" to={`/courses/6`}>
                Web Design
              </Link>
              <Link className="text-dark-1" to={`/courses/6`}>
                Graphic Design
              </Link>
              <Link className="text-dark-1" to={`/courses/6`}>
                Design Tools
              </Link>
              <Link className="text-dark-1" to={`/courses/6`}>
                User Experience Design
              </Link>
              <Link className="text-dark-1" to={`/courses/6`}>
                Game Design
              </Link>
              <Link className="text-dark-1" to={`/courses/6`}>
                3D & Animation
              </Link>
              <Link className="text-dark-1" to={`/courses/6`}>
                Fashion Design
              </Link>
              <Link className="text-dark-1" to={`/courses/6`}>
                Interior Design
              </Link>
            </div>
          </div> */}

          <div className="explore__item">
            <Link to={`/dshb-settings`} className="text-dark-1">
              My Learning ✅
            </Link>
          </div>

          {/* <div className="explore__item">
            <Link to="/dashboard" className="text-dark-1">
              Student Dashboard 
            </Link>
          </div> */}

          <div className="explore__item">
            <Link to="/courses-single-6/3" className="text-dark-1">
              Notifications
            </Link>
          </div>

          <div className="explore__item">
            <Link to="#" className="text-dark-1">
              Messages
            </Link>
          </div>
        
          <div className="explore__item">
            <Link to={`/dshb-settings`} className="text-dark-1">
              My Profile ✅
            </Link>
          </div>

          <div className="explore__item">
            <Link to="/dshb-settings" className="text-dark-1">
               Payment Methods ✅
            </Link>
          </div>

        
          <div className="explore__item">
            <Link to={`/courses/6`} className="text-dark-1">
              Subscription
            </Link>
          </div>

          <div className="explore__item">
            <Link to="#" className="text-dark-1">
               Tutrx Credits
            </Link>
          </div>

        
          {userData.activeRole == 'Tutor' && <div className="explore__item">
             <Link to={`/instructors/1`} className="text-dark-1">
              Public Profile ✅
            </Link>
          </div>}

          {userData.activeRole == 'student' && <div className="explore__item">
            <Link to={`/students/1`} className="text-dark-1">
               Public Profile ✅
          </Link>
          </div>}

          {/* <div className="explore__item">
            <Link to={`/instructors/1`} className="text-dark-1">
              Public Profile ✅
            </Link>
          </div> */}

          <div className="explore__item">
            <Link to="#" className="text-dark-1">
               Help and Support
            </Link>
          </div>

        
          <div className="explore__item">
            <Link to={'#'} className="text-dark-1" onClick={doLogOut}>
              Logout
            </Link>
          </div>

        </div>
      </div>
    </>
  );
};
