import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { SEND } from '@/store';
import { useDispatch, useSelector } from "react-redux";
import { fileToBase64 } from '@/utils/tool';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function EditProfile({ activeTab }) {
  const { userDetailsLoading, checkedShowProfile } = useSelector((state) => state.models);
  const userData = useSelector((state) => state.auths);
  const { control, handleSubmit, reset, register, watch, formState: { errors } } = useForm({});
  // 
  const dispatch = useDispatch();
  // 
  const onSubmit = async (d) => {
    try {
      const { image } = d;
      // 
      dispatch.models.SET({
        userUpdateLoading: true
      });
      // 
      // 
      let params = {
        ...d,
        image: image && await fileToBase64(image[0]),
        role: 'student'
      };
      return SEND('user/update', params);
    } catch (error) {
      console.log(error)
    }
  }
  // 
  useEffect(() => {
    if (userData.activeRole == 'student') return;
    dispatch.auths.SWITCH();
    SEND('user/switch_role', { role: 'student' })
  }, []);
  // 
  useEffect(() => {
    reset({
      email: userData?.email,
      fullName: userData?.fullName,
      // portfolio: userData?.socials?.portfolio,
      description: userData?.description,
      headline: userData?.headline,
      showEnrolledCourses: userData?.showEnrolledCourses,
      showProfile: userData?.showProfile
    })
  }, [])
  // 
  const imageFile = watch('image')?.[0];
  const imagePreview = imageFile ? URL.createObjectURL(imageFile) : null;
  // 
  return (
    <div
      className={`tabs__pane -tab-item-1 ${activeTab == 1 ? "is-active" : ""} `}
    >
      <div className="row y-gap-20 x-gap-20 items-center">
        <label
          className="col-auto"
          htmlFor="imageUpload"
          style={
            imagePreview
              ? {}
              : { width: 125, height: 125 }
          }
        >

          {imagePreview ? (
            <img src={imagePreview} alt="Profile Photo" className="size-100" />
          ) : (
            <img src={userData.profileImage || imagePreview || 'https://avatar.iran.liara.run/public/boy?username=Ash'} alt={imagePreview ? "image" : ""} style={{ borderRadius: '50%', objectFit: 'fill' }} />
          )}
        </label>

        <div className="col-auto">
          <div className="text-16 fw-500 text-dark-1">Your avatar</div>
          <div className="text-14 lh-1 mt-10">
            PNG or JPG no bigger than 800px wide and tall.
          </div>

          <div className="d-flex x-gap-10 y-gap-10 flex-wrap pt-15">
            <div>
              <div className="d-flex justify-center items-center size-40 rounded-8 bg-light-3">
                <label
                  style={{ cursor: "pointer" }}
                  htmlFor="imageUpload1"
                  className="icon-cloud text-16"
                ></label>
                <input
                  required
                  id="imageUpload1"
                  type="file"
                  accept="image/*"
                  // onChange={handleImageChange}
                  style={{ display: "none" }}
                  {...register('image')}
                />
              </div>
            </div>
            <div>
              {/* <div
                style={{ cursor: "pointer" }}
                // onClick={() => {
                //   document.getElementById("imageUpload1").value = "";
                //   setPreviewImage("");
                // }}
                className="d-flex justify-center items-center size-40 rounded-8 bg-light-3"
              >
                <div className="icon-bin text-16"></div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="border-top-light pt-30 mt-30">
        <form onSubmit={handleSubmit(onSubmit)} className="contact-form row y-gap-30">
          <div className="col-md-6">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
              Full Name
            </label>

            <input required type="text" placeholder="Full Name" {...register('fullName')} />
          </div>

          <div className="col-md-6">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
              Email
            </label>

            <input required type="text" placeholder="Email" {...register('email')} />
          </div>


          <div className="col-md-12">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10" >
              Headline
            </label>

            <input type="text" placeholder="Headline" {...register('headline')} />
          </div>

          {/* <div className="col-md-6">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
              Birthday
            </label>

            <input required type="text" placeholder="Birthday" />
          </div> */}

          {/* <div className="col-md-6">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
              Address Line 1
            </label>

            <input required type="text" placeholder="Address Line 1" />
          </div> */}

          {/* <div className="col-md-6">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
              Address Line 2
            </label>

            <input required type="text" placeholder="Address Line 2" />
          </div> */}

          {/* <div className="col-md-6">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
              State
            </label>

            <input required type="text" placeholder="State" />
          </div> */}

          {/* <div className="col-md-6">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
              Country
            </label>

            <input required type="text" placeholder="Country" />
          </div> */}

          <div className="col-12">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
              Biography
            </label>

            <textarea placeholder="Biography" rows="7" {...register('description')}></textarea>
          </div>

          <div className="col-3">
            <FormControlLabel
              control={
                <Controller
                  name='showProfile'
                  render={({ field: { onChange, value } }) => {
                    return (
                      <Checkbox checked={value || false} onChange={onChange} />
                    );
                  }}
                  control={control}
                />
              }
              label='Show Public Profile'
            />
          </div>

          <div className="col-3">
            <FormControlLabel
              control={
                <Controller
                  name='showEnrolledCourses'
                  render={({ field: { onChange, value } }) => {
                    return (
                      <Checkbox checked={value || false} onChange={onChange} />
                    );
                  }}
                  control={control}
                />
              }
              label='Show Public Courses'
            />
          </div>

          
          

          <div className="col-12">
            <button className="button -md -purple-1 text-white">
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
