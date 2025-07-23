import { sidebarItems } from "@/data/dashBoardSidebar";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import toast from "react-hot-toast";

export default function Sidebar() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Use Redux state (or temporary mock role if needed)
  const userData = useSelector((state) => state.auths);
  const role = import.meta.env.VITE_ACTIVE_ROLE || "teacher"; // fallback role for testing

  // Filter sidebar items by role
  const filteredSidebarItems = sidebarItems.filter((item) =>
    item.roles.includes(role)
  );

  // Logout handler
  const doLogOut = () => {
    try {
      dispatch.auths.DEL();
      navigate("/home");
    } catch (error) {
      console.log(error);
    } finally {
      toast.success("You have been logged out successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="sidebar -dashboard">
      {/* Dashboard Label */}
      <div
        className="d-flex justify-content-center align-items-center h-100"
        style={{ fontSize: "22px", fontWeight: "bold", marginTop: -50, padding: "10px 0" }}
      >
        {role === "student" ? "Student Dashboard" : role === "admin" ? "Admin Dashboard" : "Teacher Dashboard"}
      </div>

      {/* Sidebar Items */}
      {filteredSidebarItems.length > 0 ? (
        filteredSidebarItems.map((elm, i) => (
          <div
            key={i}
            className={`sidebar__item ${pathname === elm.href ? "-is-active" : ""}`}
          >
            <Link to={elm.href} className="d-flex items-center text-17 lh-1 fw-500">
              <i className={`${elm.iconClass} mr-15`}></i>
              {elm.text}
            </Link>
          </div>
        ))
      ) : (
        <div className="sidebar__item text-15 px-20">No items available</div>
      )}

      {/* Logout Button */}
      <div className="sidebar__item">
        <div
          style={{ cursor: "pointer" }}
          className="d-flex items-center text-17 lh-1 fw-500 text-20 icon-power"
          onClick={doLogOut}
        >
          <i className="mr-15"></i>
          Logout
        </div>
      </div>
    </div>
  );
}
