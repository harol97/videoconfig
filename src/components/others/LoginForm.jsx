import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { SEND } from '@/store';

export default function LoginForm() {

  const dispatch = useDispatch();
  //
  const { loginLoading, } = useSelector((state) => state.models);
  const { control, handleSubmit, reset, register, getValues, formState: { errors } } = useForm({});
  // 
  const navigate = useNavigate();
  // 
  const onSubmit = async (d) => {
    dispatch.models.SET({
      loginLoading: true
    })
    // console.log(d)
    return SEND('auth/login', {
      ...d,
      // role: userData.activeRole
    });
  } 
  // 
  return (
    <div className="form-page__content lg:py-50">
      <div className="container">
        <div className="row justify-center items-center">
          <div className="col-xl-6 col-lg-8">
            <div className="px-50 py-50 md:px-25 md:py-25 bg-white shadow-1 rounded-16">
              <h3 className="text-30 lh-13">Login</h3>
              <p className="mt-10">
                Don't have an account yet?
                <Link to="/signup" className="text-purple-1">
                  {' '}Sign up for free
                </Link>
              </p>

              <form
                className="contact-form respondForm__form row y-gap-20 pt-30"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="col-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Username Or Email
                  </label>
                  <input required type="text" name="title" placeholder="Name" {...register('email')} />
                </div>
                <div className="col-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Password
                  </label>
                  <input
                    required
                    type="password"
                    name="title"
                    placeholder="Password"
                    {...register('password')}
                  />
                </div>

                <div className="col-12">
                  <button
                    type="submit"
                    name="submit"
                    id="submit"
                    className="button -md -green-1 text-dark-1 fw-500 w-1/1"
                  >
                    Login
                  </button>
                </div>
              </form>
              
              <div className="lh-12 text-dark-1 fw-500 text-center mt-20">
                <Link to="/forgot" >
                  Forgot Password?
                </Link>
              </div>


              {/* <div className="lh-12 text-dark-1 fw-500 text-center mt-20">
                Or sign in using
              </div>

              <div className="d-flex x-gap-20 items-center justify-between pt-20">
                <div>
                  <button className="button -sm px-24 py-20 -outline-blue-3 text-blue-3 text-14">
                    Log In via Facebook
                  </button>
                </div>
                <div>
                  <button className="button -sm px-24 py-20 -outline-red-3 text-red-3 text-14">
                    Log In via Google+
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
