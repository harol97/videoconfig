import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SEND } from '@/store';
import { useDispatch, useSelector } from "react-redux";
import OTP from './otp'
import TextField from '@mui/material/TextField';
// 
export default function SignUpForm() {

  const { registerLoading, _otp, registerValues } = useSelector((state) => state.models);
  const dispatch = useDispatch();
  const { control, handleSubmit, reset, register, getValues, formState: { errors } } = useForm({});

  const onSubmit = async (d) => {
    try {
      const { password, confirm } = d;
      if (confirm != password) {
        return toast.warn('The password and confirmation password do not match. Please ensure both fields are identical!', {
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
      dispatch.models.SET({
        registerLoading: true,
        registerValues: {
          ...d
        }
      })
      SEND('auth/registercode', {
        email: getValues('email'),
        fullName: getValues('fullName'),
      })
    } catch (error) {
      console.log(error)
    }
  }
  // 
  useEffect(() => {
    if (!_otp) return;
    dispatch.models.SET({
      M: {
        t: 'Please Provide OTP',
        c: <OTP
          otp={
            <div>
              <TextField 
                required 
                type="text" 
                size="small" 
                fullWidth 
                placeholder="Enter OTP" 
                {...register('otp')} 
              />
            </div>
          }
          onSend={() => SEND('auth/registercode', {
            email: getValues('email'),
            fullName: getValues('fullName')
          })}
        />,
        b: () => SEND('auth/register', { ...registerValues, otp: getValues('otp'), _otp })
      }
    })
  }, [_otp]);
  // 
  return (
    <div className="form-page__content lg:py-50">
      <div className="container">
        <div className="row justify-center items-center">
          <div className="col-xl-8 col-lg-9">
            <div className="px-50 py-50 md:px-25 md:py-25 bg-white shadow-1 rounded-16">
              <h3 className="text-30 lh-13">Sign Up</h3>
              <p className="mt-10">
                Already have an account?
                <Link to="/login" className="text-purple-1">
                  Log in
                </Link>
              </p>

              <form
                className="contact-form respondForm__form row y-gap-20 pt-30"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="col-lg-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Email address *
                  </label>
                  <input type="text" placeholder="Name" {...register('email')} required />
                </div>
                <div className="col-lg-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Full Name *
                  </label>
                  <input required type="text" placeholder="Name" {...register('fullName')} />
                </div>
                <div className="col-lg-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Password *
                  </label>
                  <input type="password" placeholder="Password" {...register('password')} required />
                </div>
                <div className="col-lg-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Confirm Password *
                  </label>
                  <input type="password" placeholder="Confirm Password" {...register('confirm')} required />
                </div>
                <div className="col-12">
                  <button
                    disabled={registerLoading}
                    type="submit"
                    name="submit"
                    id="submit"
                    className="button -md -green-1 text-dark-1 fw-500 w-1/1"
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
