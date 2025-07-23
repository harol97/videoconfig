import React, { useState } from "react";
import EditProfile from "./EditProfile";
import EditProfileTutor from "./EditProfileTutor";
import Password from "./Password"; // Ensure this is correct
import CloseAccount from "./CloseAccount";
import FooterNine from "@/components/layout/footers/FooterNine";
import { useDispatch, useSelector } from "react-redux";
import Payment from "./Payment";
import Earning from "./Earning";
import CancellationPolicy from "./CancellationPolicy";
import NotificationsOptionsToggle from "./NotificationsOptionsToggle";

export default function Settings() {
  const [activeTab, setActiveTab] = useState(1);
  const userData = useSelector((state) => state.auths);
   const role = import.meta.env.VITE_ACTIVE_ROLE || "teacher"; 

  // const buttons =
  //   role=== "teacher" // or "tutor"
  //     ? ["Edit Profile", "Earning", "Password", "Close Account","Cancellation & Reschedule Policy", "Notification settings"]
  //     : ["Edit Profile", "Payment", "Password" ,"Close Account", "Notification settings"];

const getRoleButtons = (role) => {
  switch(role) {
    case 'admin':
      return [
       "Edit Profile", 
        "Password",  
        "Notification settings"
      ];
    case 'teacher': // or "tutor"
      return [
        "Edit Profile", 
        "Earning", 
        "Password", 
        "Close Account",
        "Cancellation & Reschedule Policy", 
        "Notification settings"
      ];
    case 'student':
      return [
        "Edit Profile", 
        "Payment", 
        "Password", 
        "Close Account", 
        "Notification settings"
      ];
    default:
      return []; // or some default buttons
  }
};

// Usage:
const buttons = getRoleButtons(role);    
  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row y-gap-30">
          <div className="col-12">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="tabs -active-purple-2 js-tabs pt-0">
                <div className="tabs__controls d-flex x-gap-30 y-gap-20 flex-wrap items-center pt-20 px-30 border-bottom-light js-tabs-controls">
                  {buttons.map((elm, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTab(i + 1)}
                      className={`tabs__button text-light-1 js-tabs-button ${
                        activeTab === i + 1 ? "is-active" : ""
                      }`}
                      type="button"
                    >
                      {elm}
                    </button>
                  ))}
                </div>
                <div className="tabs__content py-30 px-30 js-tabs-content">
                  {userData.activeRole === "student" ? (
                    <EditProfile activeTab={activeTab} />
                  ) : (
                    <EditProfileTutor activeTab={activeTab} />
                  )}
                  {role === "admin" || (role === "student") ? (
                    <Payment activeTab={activeTab} />
                  ) : (
                    <Earning activeTab={activeTab} />
                  )}

                  <Password activeTab ={activeTab} /> {/*Ensure this is included */}
                  {role != "admin" &&
                  <CloseAccount activeTab={activeTab} />
                  }
                  {role === "teacher" &&
                  <CancellationPolicy activeTab={activeTab} />
                  }
                  <NotificationsOptionsToggle activeTab={activeTab} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterNine />
    </div>
  );
}