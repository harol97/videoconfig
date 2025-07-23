import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { SEND } from '@/store';
import { useDispatch, useSelector } from "react-redux";
import Terms from './terms';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// 
export default function Earning({ activeTab }) {
  const { stripeURL, Countries, onboardLoading, stripeStatusMessage } = useSelector((state) => state.models);
  const userData = useSelector((state) => state.auths);
  const { control, handleSubmit, reset, register, watch, formState: { errors } } = useForm({});
  const [country, setCountry] = useState('');
  const dispatch = useDispatch();
  // 
  const handleChange = (event) => {
    setCountry(event.target.value);
  };
  // 
  // useEffect(() => {
  //   if (!stripeURL) return;
  //   window.location.href = stripeURL;
  //   dispatch.models.SET({
  //     stripeURL: ""
  //   })
  // }, [stripeURL])
  // // 
  // useEffect(() => {
  //   if (userData?.stripeAccountId) return;
  //   SEND('stripe/countries');
  // }, [userData])
  // // 
  // useEffect(() => {
  //   SEND('stripe/info');
  // }, [])
  // 
  const openTerms = () => {
    dispatch.models.SET({
      M: {
        t: 'Confirm Terms & Policy Stripe',
        c: <Terms />,
        // b: () => { SEND('stripe/connect', { country }); dispatch.models.SET({ onboardLoading: true }) },
        bc: 'I Disagree',
        bt: 'I Agree'
      }
    })
  }
  // 
  return (
    <div className={`tabs__pane -tab-item-2 ${activeTab == 2 ? "is-active" : ""} `}>
      {!userData?.stripeAccountId ?
        <div className="d-flex flex-column" style={{ rowGap: 10 }}>
          <div>
            <h2>Connect Your Stripe Account</h2>
            <p>To start earning through our platform, you'll need to connect your Stripe account. Stripe securely handles your payouts.</p>
            <p>Before proceeding, please select your country of residence. This helps us set up the correct payment process for you.</p>
            <p>Let’s get you onboarded!</p>
          </div>
          <div>
            <FormControl sx={{ width: '30%' }}>
              <InputLabel id="demo-simple-select-label">Country</InputLabel>
              <Select
                value={country}
                label="Country"
                onChange={handleChange}
              >
                {Countries.map((v, k) => (
                  <MenuItem
                    key={k}
                    value={v.code}
                  >
                    {v.name}
                  </MenuItem>
                ))}
              </Select>

            </FormControl>
          </div>

          {country && <div className="col-12">
            <button disabled={onboardLoading} type="button" className="button -md -purple-1 text-white" onClick={openTerms}>
              Connect To Stripe
            </button>
          </div>}
        </div>
        : <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <b>Connected with Stripe</b>
          <span style={{ fontWeight: 'bold', marginTop: 20 }}><a href={userData.expressLink}>Stripe Dashboard Link: {userData.expressLink}</a></span>
          <p>{stripeStatusMessage}</p>
        </div>
      }
      <div>
      </div>
    </div>
  );
}
