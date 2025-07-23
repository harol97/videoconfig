import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { SEND } from '@/store';
import { useNavigate } from "react-router-dom";

export default function CloseAccount({ activeTab }) 
{
  const { closeAccount, closeAccountLoading } = useSelector((state) => state.models);
  const userData = useSelector((state) => state.auths);
  const { control, handleSubmit, reset, register, watch, formState: { errors } } = useForm({});
  // 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // 
  const onSubmit = async(d) => {
    try {
      // 
      dispatch.models.SET({
        closeAccountLoading: true
      });
      // 
      return SEND('user/close_account', d);
    } catch (error) {
      console.log(error)
    }
  };
  // 
  useEffect(() => {
    if (!closeAccount) return;
    dispatch.auths.DEL();
    navigate("/home");
    dispatch.models.SET({
      closeAccount: ""
    })
    // 
  }, [closeAccount]);
  // 
  return (
    <div
      className={`tabs__pane -tab-item-4 ${activeTab == 4 ? "is-active" : ""} `}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="contact-form row y-gap-30">
        <div className="col-12">
          <div className="text-16 fw-500 text-dark-1">Close account</div>
          <p className="mt-10">
            Warning: If you close your account, you will lose access forever.
          </p>
        </div>

        <div className="col-md-7">
          <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
            Enter Password
          </label>

          <input required type="text" placeholder="Enter Password" {...register('password')}  />
        </div>

        <div className="col-12">
          <button type='submit' className="button -md -purple-1 text-white" disabled={closeAccountLoading}>
            Close Account
          </button>
        </div>
      </form>
    </div>
  );
}
