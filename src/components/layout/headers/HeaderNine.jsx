import { Link } from "react-router-dom";

import React, { useEffect, useState } from "react";
import CartToggle from "../component/CartToggle";
import { sidebarItems } from "../../../data/homeSidebarItems";
import { notifications } from "@/data/notifications";
export default function HeaderNine({ setIsSidebarClosed, setMessageOpen }) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const [isfullScreen, setIsfullScreen] = useState(false);
  const [isOnNotification, setIsOnNotification] = useState(false);
  const [isOnProfile, setIsOnProfile] = useState(false);

  const [documentElement, setDocumentElement] = useState();
  const handleFullScreenToggle = () => {
    setIsfullScreen((pre) => !pre);
    if (!isfullScreen) {
      openFullscreen();
    } else {
      closeFullscreen();
    }
  };

  useEffect(() => {
    setDocumentElement(document.documentElement);
  }, []);
  const openFullscreen = () => {
    if (documentElement?.requestFullscreen) {
      documentElement?.requestFullscreen();
    } else if (documentElement?.webkitRequestFullscreen) {
      /* Safari */
      documentElement?.webkitRequestFullscreen();
    } else if (documentElement?.msRequestFullscreen) {
      /* IE11 */
      documentElement?.msRequestFullscreen();
    }
  };

  const handleDarkmode = () => {
    if (document) {
      document.getElementsByTagName("html")[0].classList.toggle("-dark-mode");
    }
  };

  const closeFullscreen = () => {
    if (document?.exitFullscreen) {
      document?.exitFullscreen();
    } else if (document?.webkitExitFullscreen) {
      /* Safari */
      document?.webkitExitFullscreen();
    } else if (document?.msExitFullscreen) {
      /* IE11 */
      document?.msExitFullscreen();
    }
  };

  return (
    <header className=" header -base-sidebar border-bottom-light bg-white js-header">
      <div className="header__container py-20 px-10">
        <div className="row justify-between items-center">
          <div className="col-auto">
            <div className="d-flex items-center">
              <div className="header__explore text-dark-1">
                <button
                  className="d-flex items-center js-dashboard-home-9-sidebar-toggle"
                  onClick={() => setIsSidebarClosed((pre) => !pre)}
                >
                  <i className="icon -dark-text-white icon-explore"></i>
                </button>
              </div>

              <div className="header__logo ml-30 md:ml-20">
                <Link to="/">
                  <img
                    className="-light-d-none"
                    src="/assets/img/general/logo.png" width="150px"
                    alt="logo"
                  />
                  <img
                    className="-dark-d-none"
                    src="/assets/img/general/logo-dark.svg"
                    alt="logo"
                  />
                </Link>
              </div>

              <form
                onSubmit={handleSubmit}
                className="search-field rounded-16 h-50 -reverse-button -w-340 ml-90 xl:ml-20 lg:d-none"
              >
                <input
                  required
                  className="bg-light-4 pr-50"
                  type="text"
                  placeholder="What do you want to learn?"
                />
                <button className="text-light-1" type="submit">
                  <i className="icon-search text-20"></i>
                </button>
              </form>
            </div>
          </div>

          <div className="col-auto">
            <div className="d-flex items-center">
              <div className="d-flex items-center sm:d-none">
                <div>
                  <button
                    onClick={handleDarkmode}
                    className="js-darkmode-toggle text-light-1 d-flex items-center justify-center size-50 rounded-16 -hover-dshb-header-light"
                  >
                    <i className="text-light-1 text-24 icon icon-night"></i>
                  </button>
                </div>

                <div className="relative">
                  <button
                    onClick={() => handleFullScreenToggle()}
                    className="text-light-1 d-flex items-center justify-center size-50 rounded-16 -hover-dshb-header-light"
                  >
                    <i className="text-24 icon icon-maximize"></i>
                  </button>
                </div>

                <CartToggle
                  parentClassess={"relative"}
                  allClasses={
                    'd-flex items-center text-light-1 d-flex items-center justify-center size-50 rounded-16 -hover-dshb-header-light"'
                  }
                />

                <div className="relative" onClick={() => setMessageOpen(true)}>
                  <a
                    href="#"
                    className="d-flex items-center justify-center size-50 rounded-16 -hover-dshb-header-light"
                    data-el-toggle=".js-msg-toggle"
                  >
                    <i className="text-24 icon icon-email"></i>
                  </a>
                </div>

                <div
                  className="relative"
                  onClick={() => setIsOnNotification((pre) => !pre)}
                >
                  <a
                    href="#"
                    className="d-flex items-center justify-center size-50 rounded-16 -hover-dshb-header-light"
                    data-el-toggle=".js-notif-toggle"
                  >
                    <i className="text-24 icon icon-notification"></i>
                  </a>

                  <div
                    className={`toggle-element js-notif-toggle  ${
                      isOnNotification ? "-is-el-visible" : ""
                    } -`}
                  >
                    <div className="toggle-bottom -notifications bg-white shadow-4 border-light rounded-8 mt-10">
                      <div className="py-30 px-30">
                        <div className="y-gap-40">
                          {notifications.map((elm, i) => (
                            <div
                              key={i}
                              className={`d-flex items-center  ${
                                i !== 0
                                  ? "border-top-light -dark-border-top-light-5"
                                  : ""
                              } `}
                            >
                              <div className="shrink-0">
                                <img src={elm.imageSrc} alt="image" />
                              </div>
                              <div className="ml-12">
                                <h4 className="text-15 lh-1 fw-500 -dark-text-dark-1">
                                  {elm.heading}
                                </h4>
                                <div className="text-13 lh-1 mt-10">
                                  {elm.time} Hours Ago
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="relative d-flex items-center ml-10"
                onClick={() => setIsOnProfile((pre) => !pre)}
              >
                <a href="#" data-el-toggle=".js-profile-toggle">
                  <img
                    className="size-50"
                    src="/assets/img/misc/user-profile.png"
                    alt="image"
                  />
                </a>

                <div
                  className={`toggle-element js-profile-toggle ${
                    isOnProfile ? "-is-el-visible" : ""
                  } -`}
                >
                  <div className="toggle-bottom -profile bg-white shadow-4 border-light rounded-8 mt-10">
                    <div className="px-30 py-30">
                      <div className="sidebar -dashboard">
                        {sidebarItems.map((elm, i) => (
                          <div
                            key={i}
                            className={`sidebar__item ${
                              elm.id == 1 ? "-is-active -dark-bg-dark-2" : ""
                            }`}
                          >
                            <a
                              href={elm.href}
                              className="d-flex items-center text-17 lh-1 fw-500 "
                            >
                              <i className={elm.iconClass}></i>
                              {elm.text}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
