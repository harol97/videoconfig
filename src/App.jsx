import "./styles/index.scss";

import "@fortawesome/fontawesome-svg-core/styles.css";
import "react-calendar/dist/Calendar.css";
import { Routes, Route, useNavigate } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import HomePage1 from "./pages";
// import HomePage2 from "./pages/homes/home-2";
// import HomePage3 from "./pages/homes/home-3";
// import HomePage4 from "./pages/homes/home-4";
// import HomePage5 from "./pages/homes/home-5";
// import HomePage6 from "./pages/homes/home-6";
// import HomePage7 from "./pages/homes/home-7";
// import HomePage8 from "./pages/homes/home-8";
// import HomePage9 from "./pages/homes/home-9";
// import HomePage10 from "./pages/homes/home-10";
import CourseListPage1 from "./pages/coursesList/courses-list-1";
import CourseListPage2 from "./pages/coursesList/courses-list-2";
import CourseListPage3 from "./pages/coursesList/courses-list-3";
import CourseListPage4 from "./pages/coursesList/courses-list-4";
import CourseListPage5 from "./pages/coursesList/courses-list-5";
import CourseListPage6 from "./pages/coursesList/courses-list-6";
import CourseListPage7 from "./pages/coursesList/courses-list-7";
import CourseListPage8 from "./pages/coursesList/courses-list-8";
import CourseSinglePage1 from "./pages/courseSingle/courses";
import CourseSinglePage2 from "./pages/courseSingle/courses-single-2";
import CourseSinglePage3 from "./pages/courseSingle/courses-single-3";
import CourseSinglePage4 from "./pages/courseSingle/courses-single-4";
import CourseSinglePage5 from "./pages/courseSingle/courses-single-5";
import CourseCartPage from "./pages/cartPages/course-cart";
import CourseCheckoutPage from "./pages/cartPages/course-checkout";
import LessonSinglePage1 from "./pages/aboutCourses/lesson-single-1";
import LessonSinglePage2 from "./pages/aboutCourses/lesson-single-2";
import InstractorListPage1 from "./pages/aboutCourses/instructors-list-1";
import InstractorListPage2 from "./pages/aboutCourses/instructors-list-2";
import InstractorSinglePage from "./pages/aboutCourses/instructors";

import StudentSinglePage from "./pages/aboutCourses/students";

import InstractoBacomePage from "./pages/aboutCourses/instructor-become";
import DashboardPage from "./pages/dashboard/dashboard";
import DshbCoursesPage from "./pages/dashboard/dshb-courses";
import DshbBookmarksPage from "./pages/dashboard/dshb-bookmarks";
import DshbListingPage from "./pages/dashboard/dshb-listing";
import DshbReviewsPage from "./pages/dashboard/dshb-reviews";
import DshbSettingsPage from "./pages/dashboard/dshb-settings";
import DshbAdministrationPage from "./pages/dashboard/dshb-administration";
import DshbAssignmentPage from "./pages/dashboard/dshb-assignment";
import DshbCalenderPage from "./pages/dashboard/dshb-calendar";
import DshbDashboardPage from "./pages/dashboard/dshb-dashboard";
import DshbDictionaryPage from "./pages/dashboard/dshb-dictionary";
import DshbForumsPage from "./pages/dashboard/dshb-forums";
import DshbGradesPage from "./pages/dashboard/dshb-grades";
import DshbMessagesPage from "./pages/dashboard/dshb-messages";
import DshbPartcipentPage from "./pages/dashboard/dshb-participants";
import DshbQuizPage from "./pages/dashboard/dshb-quiz";
import DshbServeyPage from "./pages/dashboard/dshb-survey";
import EventListPage1 from "./pages/events/event-list-1";
import EventSingPage from "./pages/events/events";
import EventCartPage from "./pages/cartPages/event-cart";
import EventCheckoutPage from "./pages/cartPages/event-checkout";
import BlogListpage1 from "./pages/blogs/blog-list-1";
import BlogListpage2 from "./pages/blogs/blog-list-2";
import BlogListpage3 from "./pages/blogs/blog-list-3";
import BlogdetailsPage from "./pages/blogs/blogs";
import AboutPage1 from "./pages/about/about-1";
import AboutPage2 from "./pages/about/about-2";
import ContactPage1 from "./pages/contacts/contact-1";
import ContactPage2 from "./pages/contacts/contact-2";
import ShopCartPage from "./pages/cartPages/shop-cart";
import ShopCheckoutPage from "./pages/cartPages/shop-checkout";
import ShopListPage from "./pages/shop/shop-list";
import ShopOrderPage from "./pages/shop/shop-order/page";
import ShopdetailsPage from "./pages/shop/shop";
import PricingPage from "./pages/others/pricing";

import TermsPage from "./pages/others/terms";
import HelpCenterPage from "./pages/others/help-center";
import LoginPage from "./pages/others/login";
import ForgotPage from "./pages/others/forgot";
import SignupPage from "./pages/others/signup";
import UIElementsPage from "./pages/others/ui-elements";
import EventListPage2 from "./pages/events/event-list-2";
import CourseSinglePage6 from "./pages/courseSingle/courses-single-6/page";
import ScrollTopBehaviour from "./components/common/ScrollTopBehaviour";
import NotFoundPage from "./pages/not-found";

import { asfetch } from '@/utils/asfetch.js';
import { store } from '@/store';

import MyModal from '@/components/modal';
import PageLoading from '@/components/loading';
import { toast } from 'react-toastify';

// 
import { useDispatch, useSelector } from "react-redux";
import DshListPage from "./pages/dashboard/dshb-assignment/assignments-lists";
import DshEditPage from "./pages/dashboard/dshb-assignment/assignment-edit";
import DshbQuizCreate from "./pages/dashboard/dshb-quiz/quiz-edit";
import DshbEnrolledStudents from "./pages/dashboard/dshb-enroll-student";
import StudentReview from "./pages/dashboard/dshb-reviews/StudentReview";
import DshbStartQuiz from "./pages/dashboard/dshb-quiz/StartQuiz";
import DshbVideoConfrence from "./pages/dashboard/dshb-class-confrence";
import CourseRegisteration from "./components/dashboard/AdminComponents/CourseRegisteration";
import AdminCoursePage from "./pages/dashboard/dshb-courses/AdminCoursePage";
import ForumDetails from "./pages/dashboard/dshb-forums/ForumDetails";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 700,
      offset: 120,
      easing: "ease-out",
      once: true,
    });
  }, []);
  // 
  const [ loading, setLoading ] = useState(true);
  const { notification_succeed, notification_error, redirectPath, Auth, AuthDel } = useSelector((state) => state.models);
  const userData = useSelector((state) => state.auths);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // 
  useEffect(() => {
    const initWss = async () => {
      try {
        const { url, sign, key } = await asfetch();
        const wss = new WebSocket('wss://' + url + '/w' + sign);
        wss.ikey = key;
        wss.binaryType = 'arraybuffer';
        store.dispatch.models.SET({
          wss: wss
        });
        wss.onopen = async () => {
          setLoading(false);
        };
      } catch (e) {
        // console.log(e);
      }
    };
    initWss();
  }, []);
  // 
  useEffect(() => {
      if (!notification_succeed) return;

      toast.success(notification_succeed.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
      dispatch.models.SET({
        notification_succeed: ""
      })

    }, [notification_succeed])
    // 
    useEffect(() => {
      if (!notification_error) return;

      toast.error(notification_error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
      dispatch.models.SET({
        notification_error: ""
      })
    }, [notification_error]);
  // 
  useEffect(() => {
    if (!Auth) return;
    dispatch.auths.SET({ ...userData, ...Auth });
  }, [Auth]);
  // 
  useEffect(() => {
    if (!redirectPath) return;
    navigate(redirectPath)
    dispatch.models.SET({
      redirectPath: ""
    })
  }, [redirectPath]);
  // 
  useEffect(() => {
    if (!AuthDel) return;
    navigate('/home')
    dispatch.models.SET({
      AuthDel: ""
    })
    dispatch.auths.DEL();
  }, [AuthDel]);
  // 
  if (loading) return <PageLoading />
  // 
  return (
    <>
      <MyModal />
      <Routes>
        <Route path="/">
          <Route index element={<HomePage1 />} />
          <Route path="/home" element={<HomePage1 />} />
          <Route path="home-1" element={<HomePage1 />} />

          <Route path="courses-list-1" element={<CourseListPage1 />} />
          <Route path="courses-list-2" element={<CourseListPage2 />} />
          <Route path="courses-list-3" element={<CourseListPage3 />} />
          <Route path="courses-list-4" element={<CourseListPage4 />} />
          <Route path="courses-list-5" element={<CourseListPage5 />} />
          <Route path="courses-list-6" element={<CourseListPage6 />} />
          <Route path="courses-list-7" element={<CourseListPage7 />} />
          <Route path="courses-list-8" element={<CourseListPage8 />} />

          <Route path="courses/:id" element={<CourseSinglePage1 />} />
          <Route
            path="courses-single-2/:id"
            element={<CourseSinglePage2 />}
          />
          <Route
            path="courses-single-3/:id"
            element={<CourseSinglePage3 />}
          />
          <Route
            path="courses-single-4/:id"
            element={<CourseSinglePage4 />}
          />
          <Route
            path="courses-single-5/:id"
            element={<CourseSinglePage5 />}
          />
          <Route
            path="courses-single-6/:id"
            element={<CourseSinglePage6 />}
          />

          <Route path="course-cart" element={<CourseCartPage />} />
          <Route path="course-checkout" element={<CourseCheckoutPage />} />
          {/* <Route path='courses-single-5/:id' element={<CourseSinglePage6 />} /> */}

          <Route path="lesson-single-1" element={<LessonSinglePage1 />} />
          <Route path="lesson-single-2" element={<LessonSinglePage2 />} />

          <Route
            path="instructors-list-1"
            element={<InstractorListPage1 />}
          />
          <Route
            path="instructors-list-2"
            element={<InstractorListPage2 />}
          />

          <Route
            path="instructors/:id"
            element={<InstractorSinglePage />}
          />

          <Route
            path="students/:id"
            element={<StudentSinglePage />}
          />

          <Route
            path="instructor-become"
            element={<InstractoBacomePage />}
          />

          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="dshb-courses" element={<DshbCoursesPage />} />
          {/* admin coursr  */}
          <Route path="dshb-admin-courses" element={<AdminCoursePage />} />

          {/* end of adming course  */}
          <Route path="dshb-bookmarks" element={<DshbBookmarksPage />} />
          <Route path="dshb-listing" element={<DshbListingPage />} />
          <Route path="dshb-reviews" element={<DshbReviewsPage />} />
          <Route path="dshb-reviews-form" element={<StudentReview />} />

          <Route path="dshb-settings" element={<DshbSettingsPage />} />
          <Route
            path="dshb-administration"
            element={<DshbAdministrationPage />}
          />
          <Route path="dshb-assignment" element={<DshbAssignmentPage />} />
          <Route path="dshb-assignment-list" element={<DshListPage />} />
          <Route path="dshb-edit-assignment" element={<DshEditPage />} />
          <Route path="dshb-enroled-student" element={<DshbEnrolledStudents />} />


          <Route path="dshb-calendar" element={<DshbCalenderPage />} />
          <Route path="dshb-dashboard" element={<DshbDashboardPage />} />
          <Route path="dshb-dictionary" element={<DshbDictionaryPage />} />
          <Route path="dshb-forums" element={<DshbForumsPage />} />

          <Route path="dshb-forums-details" element={<ForumDetails />} />


          <Route path="dshb-grades" element={<DshbGradesPage />} />
          <Route path="dshb-messages" element={<DshbMessagesPage />} />
          <Route
            path="dshb-participants"
            element={<DshbPartcipentPage />}
          />
          <Route path="dshb-quiz" element={<DshbQuizPage />} />
          <Route path="dshb-quiz-create" element={<DshbQuizCreate />} />
          <Route path="dshb-quiz-start" element={<DshbStartQuiz />} />


          <Route path="video-confrerence" element={<DshbVideoConfrence />} />


          <Route path="dshb-survey" element={<DshbServeyPage />} />

          <Route path="event-list-1" element={<EventListPage1 />} />
          <Route path="event-list-2" element={<EventListPage2 />} />
          <Route path="events/:id" element={<EventSingPage />} />
          <Route path="event-cart" element={<EventCartPage />} />
          <Route path="event-checkout" element={<EventCheckoutPage />} />

          <Route path="blog-list-1" element={<BlogListpage1 />} />
          <Route path="blog-list-2" element={<BlogListpage2 />} />
          <Route path="blog-list-3" element={<BlogListpage3 />} />
          <Route path="blogs/:id" element={<BlogdetailsPage />} />

          <Route path="about-1" element={<AboutPage1 />} />
          <Route path="about-2" element={<AboutPage2 />} />

          <Route path="contact-1" element={<ContactPage1 />} />
          <Route path="contact-2" element={<ContactPage2 />} />

          <Route path="shop-cart" element={<ShopCartPage />} />
          <Route path="shop-checkout" element={<ShopCheckoutPage />} />
          <Route path="shop-list" element={<ShopListPage />} />
          <Route path="shop-order" element={<ShopOrderPage />} />
          <Route path="shop/:id" element={<ShopdetailsPage />} />

          <Route path="pricing" element={<PricingPage />} />
          <Route path="not-found" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="help-center" element={<HelpCenterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="forgot" element={<ForgotPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="ui-elements" element={<UIElementsPage />} />
        </Route>
      </Routes>
      <ScrollTopBehaviour />
    </>
  );
}

export default App;