import React from "react";
import { useForm } from "react-hook-form";
import { SEND } from '@/store';
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';

export default function Password({ activeTab }) 
{
  const { userDetailsLoading, checkedShowProfile } = useSelector((state) => state.models);
  const userData = useSelector((state) => state.auths);
    const role = import.meta.env.VITE_ACTIVE_ROLE || "teacher";

  const { control, handleSubmit, reset, register, watch, formState: { errors } } = useForm({});
  // 
  const dispatch = useDispatch();
  // 
  const onSubmit = async (d) => {
    try {
      const { old_password, new_password, confirm_password } = d;
      // 
      if(confirm_password!=new_password){
        return toast.error('The new password and confirmation password do not match. Please make sure both fields are identical and try again.', {
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
      // 
      dispatch.models.SET({
        userUpdateLoading: true
      });
      //
      // 
      return SEND('user/change_password', d);
    } catch (error) {
      console.log(error)
    }
  }


  const hello = (role) => 
  role === "admin" ? 2 : 
  role === "student" ? 3 : 
  3;
  return (
    <div
      className={`tabs__pane -tab-item-${hello(role)} ${activeTab == hello(role) ? "is-active" : ""} `}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="contact-form row y-gap-30">
        <div className="col-md-7">
          <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
            Current password
          </label>

          <input required type="password" placeholder="Current password" {...register('old_password')} />
        </div>

        <div className="col-md-7">
          <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
            New password
          </label>

          <input required type="password" placeholder="New password" {...register('new_password')} />
        </div>

        <div className="col-md-7">
          <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
            Confirm New Password
          </label>

          <input required type="password" placeholder="Confirm New Password" {...register('confirm_password')} />
        </div>

        <div className="col-12">
          <button type='submit' className="button -md -purple-1 text-white">
            Save Password
          </button>
        </div>
      </form>
    </div>
  );
}
