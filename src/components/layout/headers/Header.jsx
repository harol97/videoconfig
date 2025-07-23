import React from "react";
import { HeaderExplore } from "../component/header-explore";

import SearchToggle from "../component/SearchToggle";
import CartToggle from "../component/CartToggle";
import Menu from "../component/Menu";
import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";
import MobileMenu from "../component/MobileMenu";
import { useDispatch, useSelector } from "react-redux";
import { SEND } from '@/store';

export default function Header() {

  const userData = useSelector((state) => state.auths);

  const [activeMobileMenu, setActiveMobileMenu] = useState(false);

  const isAuthenticated = (Object.keys(userData).length == 0 || !userData) ? false : true;
  // 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const AuthenticatedHeader = () => {
    if (isAuthenticated) return <div className="header-right__buttons d-flex items-center ml-30 md:d-none">

      {userData.activeRole=='student'&&<div>
        <div 
          onClick={()=>{
            navigate('/dshb-settings');
            if (userData.activeRole == 'Tutor') return;
            dispatch.auths.SWITCH()
            SEND('user/switch_role', { role: 'Tutor' })
          }}
          style={{cursor:'pointer'}}
          className="button -underline text-white ml-30"
        >
          Tutor
        </div>
      </div>}

      {userData.activeRole=='Tutor'&&<div>
        <div 
          onClick={()=>{
            navigate('/dshb-settings');
            if (userData.activeRole == 'student') return;
            dispatch.auths.SWITCH()
            SEND('user/switch_role', { role: 'student' })
          }}
          style={{cursor:'pointer'}}
          className="button -underline text-white"
        >
          Student
        </div>
      </div>}

      <Link to="/dshb-courses">
        <div className="button -underline text-white ml-30">
          My Learning
        </div>
      </Link>

      <HeaderExplore
        allClasses={ "header__explore text-white ml-20 xl:d-none"}
      />
    </div>

    return <div className="header-right__buttons d-flex items-center ml-20 md:d-none">
      <Link to="/login" className="button -underline text-white ml-20">
        Log in
      </Link>
      <Link
        to="/signup"
        className="button -sm -white text-dark-1 ml-30"
      >
        Sign up
      </Link>
    </div>
  }

  return (
    <>
      <header className="header -type-1 ">
        <div className="header__container">
          <div className="row justify-between items-center">
            <div className="col-auto">
              <div className="header-left">
                <div className="header__logo ">
                  <Link to="/">
                    <img src="/assets/img/general/logo.png" width="150px" alt="logo" />
                  </Link>
                </div>
              </div>
            </div>

            <Menu allClasses={"menu__nav text-white -is-active"} />
            <MobileMenu
              setActiveMobileMenu={setActiveMobileMenu}
              activeMobileMenu={activeMobileMenu}
            />

            <div className="col-auto">
              <div className="header-right d-flex items-center">
                <div className="header-right__icons text-white d-flex items-center">
                  {/* search toggle start */}
                  <SearchToggle />
                  {/* search toggle end */}

                  {/* cart toggle start */}
                  {/* <CartToggle
                    parentClassess={"relative ml-30 xl:ml-20"}
                    allClasses={"d-flex items-center text-white"}
                  /> */}
                  {/* cart toggle end */}

                  <div className="d-none xl:d-block ml-20">
                    <button
                      onClick={() => setActiveMobileMenu(true)}
                      className="text-white items-center"
                      data-el-toggle=".js-mobile-menu-toggle"
                    >
                      <i className="text-11 icon icon-mobile-menu"></i>
                    </button>
                  </div>
                </div>

                <AuthenticatedHeader />

              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
