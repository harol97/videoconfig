import Star from "@/components/common/Star";
import { coursesData } from "@/data/courses";
import React, { useState, useEffect } from "react";
import {
  teamMembers,
  teamMembersFull,
  instractorsEight,
  instractorsNine,
  marketingCoordinator,
} from "@/data/instractors";
import { SEND } from '@/store';
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
export default function InstractorSingle({ id }) {
  const userData = useSelector((state) => state.auths);
  const dispatch = useDispatch();
  // 
  const [activeTab, setActiveTab] = useState(1);
  const [pageItem, setPageItem] = useState(teamMembers[0]);
  useEffect(() => {
    const filtered = [
      ...teamMembers,
      ...teamMembersFull,
      ...instractorsEight,
      ...instractorsNine,
      marketingCoordinator,
    ].filter((elm) => elm.id == id)[0];

    if (filtered) {
      setPageItem(filtered);
    }
  }, []);
  // 
  useEffect(() => {
    if (userData.activeRole == 'Tutor') return;
    dispatch.auths.SWITCH()
    SEND('user/switch_role', { role: 'Tutor' })
  }, []);
  // 
  const socials = [
    {
      icon: 'icon-web',
      name: 'portfolio'
    },
    {
      icon: 'icon-twitter',
      name: 'twitter'
    },
    {
      icon: 'icon-linkedin',
      name: 'linkedin'
    },
    {
      icon: 'icon-instagram',
      link: 'instagram'
    },
  ];
  // 
  return (
    <>
      <section className="page-header -type-3">
        <div className="page-header__bg bg-purple-1"></div>
        <div className="container">
          <div className="row justify-center">
            <div className="col-xl-8 col-lg-9 col-md-11">
              <div className="page-header__content">
                <div className="page-header__img">
                  <img
                    style={{
                      width: "120px",
                      height: "120px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      objectFit: "cover",
                    }}
                    src={
                      userData.profileImage || 'https://avatar.iran.liara.run/public/boy?username=Ash'
                    }
                    alt="image"
                  />
                </div>

                <div className="page-header__info pt-20">
                  <h1 className="text-30 lh-14 fw-700 text-white">
                    {userData.fullName}
                  </h1>
                  <div className="text-20 lh-14 fw-700 text-white">{userData.headline}</div>
                  <div className="text-white">Instructor</div>
                  <div className="d-flex x-gap-20 pt-15">
                    <div className="d-flex items-center text-white">
                      <div className="icon-star mr-10"></div>
                      <div className="text-13 lh-1">Instructor Rating</div>
                    </div>

                    <div className="d-flex items-center text-white">
                      <div className="icon-video-file mr-10"></div>
                      <div className="text-13 lh-1">
                        {pageItem.reviews || 3545} Reviews
                      </div>
                    </div>

                    <div className="d-flex items-center text-white">
                      <div className="icon-person-3 mr-10"></div>
                      <div className="text-13 lh-1">
                        {pageItem.students || pageItem.studentCount || 143}{" "}
                        Students
                      </div>
                    </div>

                    <div className="d-flex items-center text-white">
                      <div className="icon-play mr-10"></div>
                      <div className="text-13 lh-1">
                        {pageItem.courses || pageItem.courseCount || 453} Course
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex items-center mt-30">
                  {/* <button className="button -md -green-1 text-dark-1">
                    Send Message
                  </button> */}

                  <div className="d-flex items-center x-gap-15 text-white">
                    {/* {pageItem.socialProfile?.map((itm, index) => (
                      <a key={index} href={itm.url}>
                        <i className={`fa ${itm.icon}`}></i>
                      </a>
                    ))} */}
                    {socials.map((v, k) => (
                      userData?.socials[v.name] && <a key={k} style={{ cursor: 'pointer' }} onClick={() => window.open(userData.socials[v.name], "_blank")}>
                        <i className={`fa ${v.icon}`}></i>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row justify-center">
            <div className="col-xl-8 col-lg-9 col-md-11">
              <div className="tabs -active-purple-2 js-tabs">
                <div className="tabs__controls d-flex js-tabs-controls">
                  <button
                    onClick={() => setActiveTab(1)}
                    className={`tabs__button js-tabs-button ${
                      activeTab == 1 ? "is-active" : ""
                    }`}
                    data-tab-target=".-tab-item-1"
                    type="button"
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab(2)}
                    className={`tabs__button js-tabs-button ml-30 ${
                      activeTab == 2 ? "is-active" : ""
                    } `}
                    data-tab-target=".-tab-item-2"
                    type="button"
                  >
                    Courses
                  </button>
                </div>

                <div className="tabs__content pt-60 lg:pt-40 js-tabs-content">
                  <div
                    className={`tabs__pane -tab-item-1  ${
                      activeTab == 1 ? "is-active" : ""
                    } `}
                  >
                    <h4 className="text-20">Description</h4>
                    <p className="text-light-1 mt-30">
                     {userData.description}
                    </p>
                  </div>

                  <div
                    className={`tabs__pane -tab-item-2 ${
                      activeTab == 2 ? "is-active" : ""
                    } `}
                  >
                    <div className="row">
                      {coursesData.slice(0, 2).map((elm, i) => (
                        <div key={i} className="col-md-6">
                          <div className="coursesCard -type-1 rounded-8 shadow-3 bg-white">
                            <div className="relative">
                              <div className="coursesCard__image overflow-hidden rounded-top-8">
                                <img
                                  className="w-1/1"
                                  src={elm.imageSrc}
                                  alt="image"
                                />
                                <div className="coursesCard__image_overlay rounded-top-8"></div>
                              </div>
                              <div className="d-flex justify-between py-10 px-10 absolute-full-center z-3">
                                {elm.popular && (
                                  <div>
                                    <div className="px-15 rounded-200 bg-purple-1">
                                      <span className="text-11 lh-1 uppercase fw-500 text-white">
                                        Popular
                                      </span>
                                    </div>
                                  </div>
                                )}
                                {elm.bestSeller && (
                                  <div>
                                    <div className="px-15 rounded-200 bg-green-1">
                                      <span className="text-11 lh-1 uppercase fw-500 text-dark-1">
                                        Best sellers
                                      </span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="h-100 pt-20 pb-15 px-30">
                              <div className="d-flex items-center">
                                <div className="text-14 lh-1 text-yellow-1 mr-10">
                                  {elm.rating}
                                </div>
                                <div className="d-flex x-gap-5 items-center">
                                  <Star star={Math.round(elm.rating)} />
                                </div>
                                <div className="text-13 lh-1 ml-10">
                                  ({elm.ratingCount})
                                </div>
                              </div>

                              <div className="text-17 lh-15 fw-500 text-dark-1 mt-10">
                                <Link
                                  className="linkCustom"
                                  to={`/courses/${elm.id}`}
                                >
                                  {elm.title}
                                </Link>
                              </div>

                              <div className="d-flex x-gap-10 items-center pt-10">
                                <div className="d-flex items-center">
                                  <div className="mr-8">
                                    <img
                                      src="/assets/img/coursesCards/icons/1.svg"
                                      alt="icon"
                                    />
                                  </div>
                                  <div className="text-14 lh-1">
                                    {elm.lessonCount} lesson
                                  </div>
                                </div>

                                <div className="d-flex items-center">
                                  <div className="mr-8">
                                    <img
                                      src="/assets/img/coursesCards/icons/2.svg"
                                      alt="icon"
                                    />
                                  </div>
                                  <div className="text-14 lh-1">{`${Math.floor(
                                    elm.duration / 60,
                                  )}h ${Math.floor(elm.duration % 60)}m`}</div>
                                </div>

                                <div className="d-flex items-center">
                                  <div className="mr-8">
                                    <img
                                      src="/assets/img/coursesCards/icons/3.svg"
                                      alt="icon"
                                    />
                                  </div>
                                  <div className="text-14 lh-1">
                                    {elm.level}
                                  </div>
                                </div>
                              </div>

                              <div className="coursesCard-footer">
                                <div className="coursesCard-footer__author">
                                  <img src={elm.authorImageSrc} alt="image" />
                                  <div>Ali Tufa{elm.authorName}</div>
                                </div>

                                <div className="coursesCard-footer__price">
                                  {elm.paid ? (
                                    <>
                                      <div>${elm.originalPrice}</div>
                                      <div>${elm.discountedPrice}</div>
                                    </>
                                  ) : (
                                    <>
                                      <div></div>
                                      <div>Free</div>
                                    </>
                                  )}
                                </div>
                              </div>
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
        </div>
      </div>
    </>
  );
}
