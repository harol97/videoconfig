import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { SEND } from '@/store';

export default function LoginForm() {

  const dispatch = useDispatch();
  //
  const { forgotLoading, _otp } = useSelector((state) => state.models);
  const { control, handleSubmit, reset, register, getValues, formState: { errors } } = useForm({});
  // 
  const navigate = useNavigate();
  // 
  const [formData, setFormData] = useState({
    otp: '',
    password: ''
  });
  // 
   const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  // 
  const onSubmit = async (d) => {
    dispatch.models.SET({
      forgotLoading: true
    })
    return SEND('auth/forgot', {
      ...d
    });
  } 
  // 
  const onSubmitReset = async() =>
  {
    const { otp, password } = formData;
    SEND('auth/reset', {
      password, 
      email: getValues('email'), 
      otp, 
      _otp 
    })
  }
  // 
  return (
    <div className="form-page__content lg:py-50">
      <div className="container">
        <div className="row justify-center items-center">
          <div className="col-xl-6 col-lg-8">
            <div className="px-50 py-50 md:px-25 md:py-25 bg-white shadow-1 rounded-16">
              <h3 className="text-30 lh-13">Forgot Password</h3>


              {!_otp ? <div>
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
                      Email
                    </label>
                    <input required type="text" placeholder="example@gmail.com" {...register('email')} />
                  </div>

                  <div className="col-12">
                    <button
                      type="submit"
                      name="submit"
                      id="submit"
                      className="button -md -green-1 text-dark-1 fw-500 w-1/1"
                    >
                      Reset Password
                    </button>
                  </div>
                </form>
              </div> :
                <form className="contact-form respondForm__form row y-gap-20 pt-30">
                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      OTP
                    </label>
                    <input required type="text" name="otp" placeholder="OTP" value={formData.otp} onChange={handleChange} />
                  </div>

                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      New Password
                    </label>
                    <input required type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
                  </div>

                  <div className="col-12">
                    <button
                      type="button"
                      name="button"
                      id="button"
                      className="button -md -green-1 text-dark-1 fw-500 w-1/1"
                      onClick={onSubmitReset}
                    >
                      Change Password
                    </button>
                  </div>
                
                
                </form>
              }

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
